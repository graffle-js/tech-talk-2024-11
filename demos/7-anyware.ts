import { Graffle } from './assets/graffle/__.js'
import { url } from './assets/lib/serveSchema.js'

const graffle = Graffle
  .create({ schema: url })
  //
  // -----------------------
  //
  .anyware(async ({ encode }) => {
    const { pack } = await encode()
    const { exchange } = await pack()
    const { unpack } = await exchange({
      using: {
        fetch: (request: Request) => {
          console.log(`1: Intercepted fetch and saw custom header:`, request.headers.get(`x-custom-header`))
          return new Response(JSON.stringify({ data: { pokemons: [{ name: `Mocked` }] } }))
        },
      },
    })
    const { decode } = await unpack()
    const result = await decode()
    return result
  })
  //
  // -----------------------
  //
  .anyware(async ({ encode }) => {
    console.log('2: Hello! I read from the pack input.')
    const { pack } = await encode()
    console.log('2:', pack.input.transportType)
    return pack()
  })
  //
  // -----------------------
  //
  .anyware(async ({ unpack }) => {
    console.log('3: Hello! I sniff some of the decode input.')
    if (unpack.input.transportType === 'http') {
      console.log('3:', new URL(unpack.input.url).href)
    }
    return await unpack()
  })
  //
  // -----------------------
  //
  .anyware(async ({ decode }) => {
    console.log('4: Hello! I sniff the result.')
    const result = await decode()
    console.log('4: Which is:', result.data)
    return result
  })
  //
  // -----------------------
  //
  .anyware(async ({ exchange }) => {
    console.log('5: Hello! I augment the request headers.')
    if (exchange.input.transportType !== `http`) return exchange()

    const headers = new Headers(exchange.input.request.headers)
    headers.append('x-custom-header', '123')

    return exchange({
      input: {
        ...exchange.input,
        request: {
          ...exchange.input.request,
          headers,
        },
      },
    })
  })

const pokemons = await graffle.query.pokemons({ name: true })

console.log(pokemons)
