import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import {
  billboardFloorY,
  createGame,
  fitCity,
  floorY,
  INITIAL_CITY,
  landPlayer,
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

test('a billboard floor selects the nearest project and holds through repeated Down presses', () => {
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
  const second = layout.billboards[1]
  const landing = billboardFloorY(second.y + second.height) - PLAYER_HEIGHT
  assert.equal(state.player.y, landing)
  assert.equal(nearbyBillboard(state), 'second')
  for (let press = 0; press < 3; press++) {
    tick(state, { drop: true })
    tick(state, {}, 40)
    assert.equal(state.player.y, landing)
    assert.equal(state.player.grounded, true)
  }
})

test('a fall through an opening lands on the next billboard floor at the same x', () => {
  for (const width of [600, 1200]) {
    const layout = {
      ...INITIAL_CITY,
      skillsBillboard: { id: 'skills', x: 50, y: 620, width: 500, height: 130 },
      billboards: [
        { id: 'first', x: 60, y: 880, width: 210, height: 160 },
        { id: 'second', x: 300, y: 880, width: 210, height: 180 },
        { id: 'third', x: 60, y: 1330, width: 210, height: 160 },
      ],
    }
    const state = createGame(width, layout)
    state.started = true
    landPlayer(state, width * 0.96, layout.roof)
    tick(state, {}, 400)
    assert.equal(state.player.y, 756, 'the Skills floor catches a fall at the side')

    for (const [opening, landing] of [
      [0.2, 1066],
      [0.65, 1496],
      [0.2, floorY(layout) - PLAYER_HEIGHT],
    ]) {
      landPlayer(state, width * opening, state.player.y + PLAYER_HEIGHT)
      const x = state.player.x
      tick(state, {}, 400)
      assert.equal(state.player.x, x)
      assert.equal(state.player.y, landing)
      assert.equal(state.player.grounded, true)
    }
  }
})

test('resizing keeps a grounded player on their billboard floor when rows reflow', () => {
  const stacked = {
    ...INITIAL_CITY,
    skillsBillboard: { id: 'skills', x: 40, y: 600, width: 500, height: 200 },
    billboards: [
      { id: 'first', x: 40, y: 900, width: 500, height: 200 },
      { id: 'second', x: 40, y: 1200, width: 500, height: 200 },
    ],
  }
  const sideBySide = {
    ...INITIAL_CITY,
    skillsBillboard: { id: 'skills', x: 60, y: 490, width: 680, height: 150 },
    billboards: [
      { id: 'first', x: 60, y: 780, width: 300, height: 160 },
      { id: 'second', x: 390, y: 780, width: 300, height: 160 },
    ],
  }
  const state = createGame(600, stacked)
  state.started = true
  landPlayer(state, 500, 850)
  fitCity(state, 600, { ...stacked, skillsBillboard: { ...stacked.skillsBillboard, height: 120 } })
  tick(state, {}, 300)
  assert.equal(state.player.y, 726)

  landPlayer(state, 390, 1450)
  assert.equal(nearbyBillboard(state), 'second')
  fitCity(state, 1200, sideBySide)
  tick(state, {}, 300)
  assert.equal(state.player.y, 946, 'the new opening should not swallow the player')
  assert.equal(state.player.grounded, true)
  tick(state, { right: true }, 8)
  tick(state, {}, 300)
  assert.equal(state.player.y, floorY(sideBySide) - PLAYER_HEIGHT)

  landPlayer(state, 580, 990)
  fitCity(state, 600, stacked)
  tick(state, {}, 300)
  assert.equal(state.player.y, 1406)
  assert.equal(nearbyBillboard(state), 'second')
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
