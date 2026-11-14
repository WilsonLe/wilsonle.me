export const PLAYER_WIDTH = 28
export const PLAYER_HEIGHT = 44

export type Direction = -1 | 1
export type SoundEvent = 'jump' | 'jetpack'
export type Platform = { x: number; y: number; width: number }
export type Billboard = { id: string; x: number; y: number; width: number; height: number }
export type Zone = 'skyline' | 'streets' | 'transit' | 'sewers' | 'reactor'

export type CityLayout = {
  height: number
  ceiling: number
  roof: number
  streets: number
  transit: number
  sewers: number
  reactor: number
  workAwning?: Platform
  contactLedge?: Platform
  billboards: Billboard[]
}

export type Controls = {
  left: boolean
  right: boolean
  up: boolean
  jump: boolean
  boost: boolean
  drop: boolean
}

export type GameState = {
  width: number
  layout: CityLayout
  platforms: Platform[]
  started: boolean
  time: number
  camera: number
  player: {
    x: number
    y: number
    vx: number
    vy: number
    facing: Direction
    grounded: boolean
    dropUntil: number
    jetpack: boolean
    exhaustUntil: number
  }
  events: SoundEvent[]
}

export const INITIAL_CITY: CityLayout = {
  height: 2400,
  ceiling: 96,
  roof: 570,
  streets: 660,
  transit: 1040,
  sewers: 1430,
  reactor: 1900,
  billboards: [],
}

export function floorY(layout: CityLayout) {
  return layout.height - 32
}

export function billboardLedgeY(board: Billboard) {
  return board.y + board.height + PLAYER_HEIGHT + 6
}

function cityPlatforms(width: number, layout: CityLayout): Platform[] {
  return [
    { x: width * 0.71, y: layout.roof, width: width * 0.2 },
    ...(width < 800
      ? []
      : [layout.streets, layout.transit, layout.sewers].map((y) => ({
          x: width * 0.74,
          y: y + 148,
          width: width * 0.18,
        }))),
    ...layout.billboards.map((board) => ({
      x: Math.max(12, board.x - 12),
      y: billboardLedgeY(board),
      width: board.width + 24,
    })),
    ...(layout.workAwning ? [layout.workAwning] : []),
    ...(layout.contactLedge ? [layout.contactLedge] : []),
    { x: 0, y: floorY(layout), width },
  ].sort((first, second) => first.y - second.y)
}

export function landPlayer(state: GameState, center: number, feet: number) {
  Object.assign(state.player, {
    x: center - PLAYER_WIDTH / 2,
    y: feet - PLAYER_HEIGHT,
    vx: 0,
    vy: 0,
    grounded: true,
    dropUntil: 0,
    jetpack: false,
    exhaustUntil: 0,
  })
}

export function createGame(width: number, layout: CityLayout = INITIAL_CITY): GameState {
  return {
    width,
    layout,
    platforms: cityPlatforms(width, layout),
    started: false,
    time: 0,
    camera: 0,
    player: {
      x: width * 0.81 - PLAYER_WIDTH / 2,
      y: layout.roof - PLAYER_HEIGHT,
      vx: 0,
      vy: 0,
      facing: 1,
      grounded: true,
      dropUntil: 0,
      jetpack: false,
      exhaustUntil: 0,
    },
    events: [],
  }
}

export function fitCity(state: GameState, width: number, layout: CityLayout) {
  if (!state.started) {
    Object.assign(state, createGame(width, layout))
    return
  }
  state.player.x = Math.max(
    12,
    Math.min(width - PLAYER_WIDTH - 12, (state.player.x / state.width) * width),
  )
  state.player.y = Math.max(
    layout.ceiling,
    Math.min(floorY(layout) - PLAYER_HEIGHT, state.player.y),
  )
  state.width = width
  state.layout = layout
  state.platforms = cityPlatforms(width, layout)
}

export function zoneAt(layout: CityLayout, y: number): Zone {
  if (y >= layout.reactor) return 'reactor'
  if (y >= layout.sewers) return 'sewers'
  if (y >= layout.transit) return 'transit'
  if (y >= layout.streets) return 'streets'
  return 'skyline'
}

export function nearbyBillboard(state: GameState): string | undefined {
  const x = state.player.x + PLAYER_WIDTH / 2
  const y = state.player.y + PLAYER_HEIGHT / 2
  let nearest: string | undefined
  let closest = 64 ** 2
  for (const board of state.layout.billboards) {
    const dx = Math.max(board.x - x, 0, x - board.x - board.width)
    const dy = Math.max(board.y - y, 0, y - board.y - board.height)
    const distance = dx ** 2 + dy ** 2
    if (distance < closest) {
      closest = distance
      nearest = board.id
    }
  }
  return nearest
}

export function followCamera(state: GameState, viewHeight: number, blend = 1) {
  const target = Math.max(
    0,
    Math.min(state.layout.height - viewHeight, state.player.y - viewHeight * 0.57),
  )
  state.camera += (target - state.camera) * blend
}

export function stepGame(state: GameState, input: Controls, dt: number, viewHeight: number) {
  if (!state.started) return
  state.time += dt
  const p = state.player
  const previousFeet = p.y + PLAYER_HEIGHT
  const move = Number(input.right) - Number(input.left)
  const speed = state.width < 800 ? 205 : 310

  if (input.drop && p.grounded) {
    p.dropUntil = state.time + 0.23
    p.grounded = false
  }
  if (input.jump && p.grounded) {
    p.vy = -440
    p.grounded = false
    state.events.push('jump')
  }
  p.jetpack = input.boost || (p.jetpack && input.up)
  if (input.boost) {
    p.vy = Math.min(p.vy, -255)
    p.exhaustUntil = state.time + 0.18
    state.events.push('jetpack')
  }
  if (move) p.facing = move < 0 ? -1 : 1
  p.vx += (move * speed - p.vx) * (1 - Math.exp(-dt * 16))

  p.vy = p.jetpack ? Math.max(-380, p.vy - 560 * dt) : Math.min(670, p.vy + 1160 * dt)
  p.x = Math.max(12, Math.min(state.width - PLAYER_WIDTH - 12, p.x + p.vx * dt))
  p.y += p.vy * dt
  p.grounded = false

  if (p.y < state.layout.ceiling) {
    p.y = state.layout.ceiling
    p.vy = 0
  }
  if (p.vy >= 0 && state.time >= p.dropUntil) {
    for (const platform of state.platforms) {
      if (
        previousFeet <= platform.y + 3 &&
        p.y + PLAYER_HEIGHT >= platform.y &&
        p.x + PLAYER_WIDTH - 3 > platform.x &&
        p.x + 3 < platform.x + platform.width
      ) {
        p.y = platform.y - PLAYER_HEIGHT
        p.vy = 0
        p.grounded = true
        break
      }
    }
  }
  const floor = floorY(state.layout) - PLAYER_HEIGHT
  if (p.y >= floor && p.vy >= 0) {
    p.y = floor
    p.vy = 0
    p.grounded = true
  }
  followCamera(state, viewHeight, 1 - Math.exp(-dt * 6))
}
