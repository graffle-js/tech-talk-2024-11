import { assertType } from '../lib/assert-equal.js'
import { Tuna } from './node-modules/sushi-tuna.js'
import { Sushi } from './node-modules/sushi.js'

const redSushi = Sushi.create({
  thingMode: 'red',
  blueThings: [],
  redThings: [],
})

const blueSushi = Sushi.create({
  thingMode: 'blue',
  blueThings: [],
  redThings: [],
})

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

const redSushiSpicyTuna = redSushi.use(spicyTuna)
redSushiSpicyTuna.config.redThings[0]

assertType<typeof redSushiSpicyTuna.config, {
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

const redSushiTuna = redSushi.use(tuna)
redSushiTuna.config.redThings[0]

assertType<typeof redSushiTuna.config, {
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

const blueSushiSpicyTuna = blueSushi.use(spicyTuna)
blueSushiSpicyTuna.config.blueThings[0]

assertType<typeof blueSushiSpicyTuna.config, {
  thingMode: 'blue'
  blueThings: ['TunaSpicy']
  redThings: []
}>()
