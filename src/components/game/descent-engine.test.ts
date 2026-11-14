import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import {
  billboardLedgeY,
  createGame,
  fitCity,
  floorY,
  INITIAL_CITY,
  nearbyBillboard,
  PLAYER_HEIGHT,
  stepGame,
  zoneAt,
  type Controls,
} from '@/components/game/descent-engine'
import { createControls, moveKey } from '@/components/game/descent-input'

const idle: Controls = {
  left: false,
  right: false,
  up: false,
  jump: false,
  boost: false,
  drop: false,
}
const frame = 1 / 120
const tick = (state: ReturnType<typeof createGame>, change: Partial<Controls> = {}, frames = 1) => {
  for (let i = 0; i < frames; i++) stepGame(state, { ...idle, ...change }, frame, 800)
}

test('the city starts at rest and a first Space press can jump', () => {
  const state = createGame(1200)
  const before = state.player.y
  const controls = createControls()
  const direction = moveKey('Space')
  assert.equal(direction, 'up')
  controls.press('Space', direction, 0)
  const input = controls.next(0)

  tick(state, input, 10)
  assert.equal(state.player.y, before)
  state.started = true
  tick(state, input)
  assert.ok(state.player.y < before)
  assert.deepEqual(state.events, ['jump'])
})

test('the second up tap fires the jetpack and holding it climbs back up from underground', () => {
  const state = createGame(1200)
  state.started = true
  state.player.y = state.layout.reactor + 50
  state.player.grounded = false
  const controls = createControls()
  controls.press('KeyW', 'up', 100)
  tick(state, controls.next())
  controls.release('KeyW')
  controls.press('ArrowUp', 'up', 270)
  tick(state, controls.next())
  assert.equal(state.player.jetpack, true)
  assert.ok(state.events.includes('jetpack'))
  tick(state, controls.next(), 120)
  assert.ok(state.player.y < state.layout.reactor)
  assert.ok(state.player.y > state.layout.reactor - 380)
  tick(state, controls.next(), 570)
  assert.equal(state.player.y, state.layout.ceiling)
  controls.release('ArrowUp')
  tick(state, controls.next())
  assert.equal(state.player.jetpack, false)
  assert.ok(state.player.vy > 0)
})

test('a long fall reaches the reactor floor safely and permits takeoff again', () => {
  for (const width of [600, 1200]) {
    const state = createGame(width)
    state.started = true
    state.player.x = width * 0.23
    tick(state, {}, 900)
    assert.equal(state.player.y, floorY(state.layout) - PLAYER_HEIGHT)
    assert.equal(state.player.grounded, true)
    tick(state, { boost: true, up: true })
    assert.ok(state.player.y < floorY(state.layout) - PLAYER_HEIGHT)
  }
})

test('quick horizontal taps use ordinary movement speed', () => {
  const input = createControls()
  assert.equal(moveKey('KeyP'), undefined)
  assert.equal(moveKey('ShiftLeft'), undefined)
  assert.equal(moveKey('KeyD'), 'right')
  const state = createGame(1200)
  state.started = true
  for (const [code, direction] of [
    ['KeyD', 'right'],
    ['ArrowLeft', 'left'],
  ] as const) {
    const before = state.player.x
    input.press(code, direction, 0)
    tick(state, input.next())
    input.release(code)
    input.press(code, direction, 200)
    const move = input.next()
    assert.equal(move[direction], true)
    tick(state, move, 20)
    assert.ok(Math.abs(state.player.vx) <= 310)
    assert.ok(Math.abs(state.player.x - before) <= 310 * frame * 21)
    assert.equal(state.player.facing, direction === 'right' ? 1 : -1)
    assert.deepEqual(state.events, [])
    input.release(code)
  }
})

test('slow presses, held aliases and cleared focus do not trigger a double press', () => {
  const input = createControls()
  input.press('KeyW', 'up', 10)
  input.next()
  input.press('ArrowUp', 'up', 90)
  assert.equal(input.next().boost, false)
  input.release('KeyW')
  assert.equal(input.next().up, true)
  input.release('ArrowUp')
  input.press('ArrowUp', 'up', 600)
  assert.equal(input.next().boost, false)
  input.reset()
  input.press('ArrowUp', 'up', 700)
  assert.equal(input.next().boost, false)
  assert.equal(input.next().up, true)
})

test('a short directional tap still moves once if released before the next frame', () => {
  const input = createControls()
  input.press('tap', 'left', 100)
  input.release('tap')
  assert.equal(input.next().left, true)
  assert.equal(input.next().left, false)
})

test('a touch tap moves for a short step and releases without sticking', () => {
  const input = createControls()
  input.press('pointer:1', 'right', 100, true)
  input.release('pointer:1')
  assert.equal(input.next(128).right, true)
  assert.equal(input.next(190).right, true)
  assert.equal(input.next(220).right, false)
  input.press('pointer:2', 'left', 230, true)
  input.reset()
  assert.equal(input.next(240).left, false)
})

test('a billboard ledge is safe to stand on and selects the nearest project', () => {
  const layout = {
    ...INITIAL_CITY,
    billboards: [
      { id: 'first', x: 60, y: 850, width: 210, height: 160 },
      { id: 'second', x: 300, y: 850, width: 210, height: 160 },
    ],
  }
  const state = createGame(600, layout)
  assert.equal(nearbyBillboard(state), undefined)
  state.started = true
  state.player.x = 324
  tick(state, {}, 200)
  assert.equal(state.player.y, billboardLedgeY(layout.billboards[1]) - PLAYER_HEIGHT)
  assert.equal(nearbyBillboard(state), 'second')
  tick(state, { drop: true })
  tick(state, {}, 500)
  assert.equal(state.player.y, floorY(layout) - PLAYER_HEIGHT)
  assert.equal(nearbyBillboard(state), undefined)
})

test('all five districts follow the measured layout after a viewport change', () => {
  const state = createGame(1200)
  const layout = {
    ...INITIAL_CITY,
    roof: 650,
    streets: 780,
    transit: 1120,
    sewers: 1480,
    reactor: 1900,
  }
  fitCity(state, 600, layout)
  assert.equal(state.player.y, 650 - PLAYER_HEIGHT)
  assert.deepEqual(
    [200, 800, 1150, 1490, 2000].map((y) => zoneAt(layout, y)),
    ['skyline', 'streets', 'transit', 'sewers', 'reactor'],
  )
})
