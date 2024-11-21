import { Sushi } from './node-modules/sushi.js'

const sushi = Sushi.create()

sushi.context // Initial state is empty (NOT generic)

const sushi2 = sushi
  .tuna('red', 2)
  .salmon('spicy')
  .tuna('blue', 1)

sushi2.context // State accumulates.
