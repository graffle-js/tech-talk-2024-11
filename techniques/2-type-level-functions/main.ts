import { assertType } from '../lib/assert-equal.js'
import { Tuna } from './node-modules/sushi-tuna.js'
import { Sushi } from './node-modules/sushi.js'

const tuna = Tuna.create({
  spicy: false,
})

const spicyTuna = Tuna.create({
  spicy: true,
})

//
//
//
// --------------------------------------------------------
//
//
//

const redSushi = Sushi.create()
const redSpicyTunaSushi = redSushi.use(spicyTuna)

assertType<typeof redSpicyTunaSushi.config, {
  blueThings: []
  redThings: ['TunaSpicy']
  thingMode: 'red'
}>()

//
//
//
// --------------------------------------------------------
//
//
//

const redTunaSushi = redSushi.use(tuna)

assertType<typeof redTunaSushi.config, {
  blueThings: []
  redThings: ['Tuna']
  thingMode: 'red'
}>()

//
//
//
// --------------------------------------------------------
//
//
//

const blueSpicyTunaSushi = Sushi
  .create({
    thingMode: 'blue',
    blueThings: [],
    redThings: [],
  })
  .use(spicyTuna)

assertType<typeof blueSpicyTunaSushi.config, {
  thingMode: 'blue'
  blueThings: ['TunaSpicy']
  redThings: []
}>()
