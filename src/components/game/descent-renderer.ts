import {
  billboardLedgeY,
  floorY,
  zoneAt,
  type CityLayout,
  type GameState,
  type Platform,
} from '@/components/game/descent-engine'

const CYAN = '#78e3f2'
const PAPER = '#f4eddd'
const noise = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return value - Math.floor(value)
}
const loop = (value: number, range: number) => ((value % range) + range) % range
type Canvas = CanvasRenderingContext2D

function block(ctx: Canvas, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h))
}

function gradient(ctx: Canvas, width: number, top: number, bottom: number, colors: string[]) {
  const fill = ctx.createLinearGradient(0, top, 0, bottom)
  colors.forEach((color, i) => fill.addColorStop(i / (colors.length - 1), color))
  ctx.fillStyle = fill
  ctx.fillRect(0, top, width, bottom - top)
}

function disk(ctx: Canvas, x: number, y: number, rx: number, ry: number, color: string) {
  for (let dy = -ry; dy < ry; dy += 4) {
    const dx = Math.floor((Math.sqrt(1 - (dy / ry) ** 2) * rx) / 4) * 4
    block(ctx, x - dx, y + dy, dx * 2, 4, color)
  }
}

function hovercar(
  ctx: Canvas,
  x: number,
  y: number,
  direction: number,
  size: number,
  body: string,
  glass: string,
) {
  ctx.save()
  ctx.translate(Math.round(x), Math.round(y))
  ctx.scale(direction * size, size)
  block(ctx, -22, 11, 41, 3, '#70ccd94d')
  block(ctx, -16, 8, 30, 2, '#59acbb')
  block(ctx, -23, 0, 42, 7, body)
  block(ctx, -26, 3, 47, 5, body)
  block(ctx, -17, -4, 25, 5, glass)
  block(ctx, -12, -7, 13, 3, glass)
  block(ctx, -10, -4, 12, 3, '#284151')
  block(ctx, 16, 3, 6, 2, '#c4e5dd')
  block(ctx, -26, 4, 4, 2, '#dc987f')
  ctx.restore()
}

// Find open space for ground-level scenery between the portfolio signs on narrow screens.
function billboardBottom(layout: CityLayout, top: number, end: number) {
  return layout.billboards.reduce(
    (bottom, board) =>
      board.y >= top && board.y < end ? Math.max(bottom, board.y + board.height) : bottom,
    top,
  )
}

function skyline(ctx: Canvas, width: number, depth: number, camera: number, time: number) {
  gradient(ctx, width, 0, depth, ['#080d18', '#122436', '#284858'])
  for (let i = 0; i < 105; i++) {
    const y = noise(i * 73 + 9) * depth * 0.82 + camera * 0.42
    const size = i % 14 === 0 ? 3 : 1
    block(ctx, noise(i * 19 + 3) * width, y, size, size, i % 9 === 0 ? '#c1dce7' : '#5d7e91')
  }
  const moonX = width * 0.82
  const moonY = depth * 0.26 + camera * 0.53
  disk(ctx, moonX, moonY, 69, 69, '#263f57')
  disk(ctx, moonX, moonY, 53, 53, '#526c85')
  disk(ctx, moonX - 9, moonY - 11, 45, 45, '#8aa1b6')
  for (let i = 0; i < 8; i++) {
    block(
      ctx,
      moonX - 37 + noise(i * 13) * 47,
      moonY - 28 + noise(i * 47) * 52,
      6 + (i % 3) * 5,
      4,
      '#688398',
    )
  }

  // The airliner is above the towers; its contrail and the hull wrap together offscreen.
  const planeX = loop(width * 0.57 + 105 + time * 48, width + 210) - 105
  const planeY = depth * (width < 800 ? 0.57 : 0.239) + camera * 0.43 - (planeX / width) * 7
  block(ctx, planeX - 88, planeY + 1, 27, 1, '#4c687c')
  block(ctx, planeX - 54, planeY + 1, 52, 2, '#6f8a9c')
  block(ctx, planeX, planeY - 7, 7, 9, '#7393aa')
  block(ctx, planeX + 2, planeY - 1, 49, 5, '#9db8c4')
  block(ctx, planeX + 48, planeY + 1, 7, 3, '#9db8c4')
  block(ctx, planeX + 24, planeY - 7, 13, 3, '#7393aa')
  block(ctx, planeX + 29, planeY - 4, 12, 4, '#7393aa')
  block(ctx, planeX + 24, planeY + 3, 17, 3, '#58768e')
  block(ctx, planeX + 18, planeY + 5, 13, 3, '#58768e')
  block(ctx, planeX + 41, planeY, 7, 2, '#d5e5e1')
  block(ctx, planeX + 1, planeY - 4, 3, 2, '#bb8172')

  for (let layer = 0; layer < 4; layer++) {
    const body = ['#284055', '#203849', '#162c3c', '#102432'][layer]
    const edge = ['#3a5870', '#2b495e', '#244456', '#315767'][layer]
    const shift = camera * (0.53 - layer * 0.13)
    const bottom = depth + 120 - layer * 16
    for (let x = -24, i = 0; x < width + 40; i++) {
      const seed = i * 29 + layer * 118
      const w = 39 + noise(seed + 3) * (66 + layer * 10)
      const h = 136 + noise(seed + 9) * (160 + layer * 32)
      const top = bottom - h + shift
      block(ctx, x + 9, top - 9, w - 18, 10, edge)
      block(ctx, x, top, w, h, body)
      block(ctx, x, top, w, 3, edge)
      block(ctx, x + w - 5, top, 3, h, edge)
      if (layer > 1 && i % 3 === 1) {
        block(ctx, x + w * 0.68, top - 30, 2, 30, edge)
        const beacon = loop(time + i * 0.71 + layer, 4) < 1 ? '#d59578' : '#7b5e60'
        block(ctx, x + w * 0.68 - 1, top - 34, 4, 4, beacon)
      }
      for (let y = bottom - h + 16; y < bottom - 4; y += 18 + layer * 2) {
        for (let xx = x + 9; xx < x + w - 8; xx += 13) {
          const light = noise(seed + xx * 2 + y)
          if (light < 0.57) continue
          // Each lit room dims occasionally at its own phase, independent of scrolling.
          let color = edge
          if (light > 0.88) {
            const dim = loop(time * (0.14 + light * 0.04) + light * 136, 1) < 0.2
            color = light > 0.94 ? (dim ? '#517884' : '#91c8d2') : dim ? '#796959' : '#c6a67d'
          }
          block(ctx, xx, y + shift, layer + 3, layer > 1 ? 7 : 3, color)
        }
      }
      x += w + 8 + layer * 3
    }
    for (let i = 0; i < (layer > 1 ? 2 : 1); i++) {
      const direction = (i + layer) % 2 ? -1 : 1
      const x =
        loop(
          width * (0.14 + i * 0.46 + layer * 0.13) + time * (26 + layer * 17) * direction,
          width + 72,
        ) - 36
      const y =
        depth * (0.49 + layer * 0.132) + shift + i * 23 + Math.sin(time * 1.4 + layer + i) * 3
      hovercar(
        ctx,
        x,
        y,
        direction,
        0.44 + layer * 0.15,
        layer > 1 && i ? '#a27e74' : '#527888',
        '#8caebc',
      )
    }
  }
}

function market(ctx: Canvas, width: number, top: number, end: number, time: number) {
  const span = end - top
  gradient(ctx, width, top, end, ['#1a151e', '#44302e', '#19171e'])
  const awning = top + span * 0.52
  for (let x = -20, i = 0; x < width; i++, x += 112) {
    const rise = 50 + noise(i * 14) * 112
    const sign = ['#b77b56', '#c2a37c', '#8da1ae', '#a26670'][i % 4]
    block(ctx, x, awning - rise, 104, rise + 103, i % 2 ? '#2a2026' : '#372829')
    block(ctx, x + 4, awning - rise + 8, 96, 4, '#6c4844')
    for (let j = 0; j < 4; j++) {
      block(ctx, x + 10 + j * 22, awning - 44, 12, 16, j === i % 4 ? '#a77758' : '#4a3434')
    }
    block(ctx, x + 8, awning + 14, 88, 69, '#1a161d')
    block(ctx, x + 12, awning - 17, 59, 11, '#231d25')
    const signGlow = loop(time * 0.32 + i * 0.39, 1) > 0.16 ? sign : '#654953'
    block(ctx, x + 16, awning - 13, 19, 3, signGlow)
    block(ctx, x + 39, awning - 13, 9, 3, signGlow)
    block(ctx, x + 52, awning - 13, 15, 3, signGlow)
    for (let j = 0; j < 7; j++) {
      block(ctx, x + 5 + j * 14, awning, 14, 14, j % 2 ? '#4d3739' : sign)
    }
    block(ctx, x + 14, awning + 25, 57, 3, sign)
    block(ctx, x + 14, awning + 37, 30, 31, '#63483c')
    block(ctx, x + 50, awning + 42, 24, 26, '#493333')
    block(ctx, x + 9, awning + 74, 86, 5, '#7e5d51')
  }
  const road = end - 64
  block(ctx, 0, road, width, 64, '#191820')
  block(ctx, 0, road, width, 4, '#765349')
  for (let x = 15; x < width; x += 73) block(ctx, x, road + 32, 30, 3, '#887061')
  const cars = width < 800 ? 2 : 3
  const laneLength = width + 80
  for (let lane = 0; lane < 2; lane++) {
    const direction = lane === 0 ? 1 : -1
    for (let i = 0; i < cars; i++) {
      const offset = ((i + 0.23 + lane * 0.48) * laneLength) / cars
      const x = loop(offset + time * (57 + lane * 25) * direction, laneLength) - 40
      const y = road + 15 + lane * 31 + Math.sin(time * 2.8 + i * 2) * 2
      hovercar(
        ctx,
        x,
        y,
        direction,
        lane === 0 ? 0.92 : 1.12,
        ['#8b8291', '#ab7f6b', '#975f70'][i],
        '#b5a9a2',
      )
    }
  }
}

function transit(
  ctx: Canvas,
  width: number,
  top: number,
  end: number,
  time: number,
  tracks: number,
) {
  gradient(ctx, width, top, end, ['#191929', '#352b46', '#171724'])
  const train = loop(time * 74 + width * 0.62 + 84, width + 560) - 520
  const nose = train + 428
  for (let x = 0; x < width + 150; x += 176) {
    disk(ctx, x, tracks - 78, 80, 105, '#51435e')
    disk(ctx, x, tracks - 76, 68, 91, '#211c30')
    block(ctx, x - 68, tracks - 76, 136, 78, '#211c30')
    block(ctx, x - 7, tracks - 149, 14, 23, '#2a2236')
    const occupied = nose >= x - 120 && train <= x
    block(ctx, x - 3, tracks - 145, 6, 6, occupied ? '#e0a38c' : '#63817e')
    block(ctx, x - 3, tracks - 135, 6, 6, occupied ? '#465a61' : '#98c0b2')
  }
  for (let i = 0; i < 3; i++) {
    block(ctx, 0, top + 22 + i * 11, width, 4, ['#76668e', '#584765', '#453b53'][i])
  }
  block(ctx, 0, tracks, width, 42, '#211c31')
  for (let x = 12; x < width; x += 34) block(ctx, x, tracks + 5, 12, 28, '#473a58')
  block(ctx, 0, tracks + 5, width, 3, '#8e7ea1')
  block(ctx, 0, tracks + 29, width, 3, '#675571')
  block(ctx, nose, tracks - 23, 88, 10, '#efcdae13')
  block(ctx, nose, tracks - 24, 61, 12, '#efcdae17')
  block(ctx, nose, tracks - 25, 34, 14, '#efcdae24')
  for (let i = 0; i < 3; i++) {
    const x = train + i * 145
    block(ctx, x + 5, tracks - 47, 127, 6, '#82779e')
    block(ctx, x, tracks - 41, 138, 39, '#55456c')
    block(ctx, x, tracks - 11, 138, 5, '#b691c1')
    for (let j = 0; j < 4; j++) {
      block(ctx, x + 9 + j * 31, tracks - 34, 24, 15, '#2d2440')
      block(ctx, x + 10 + j * 31, tracks - 33, 22, 4, '#dfbbb3')
    }
    if (i === 2) block(ctx, x + 132, tracks - 21, 6, 6, '#efd6b2')
  }
}

function sewers(ctx: Canvas, width: number, top: number, end: number, time: number, water: number) {
  gradient(ctx, width, top, end, ['#1d1b23', '#29272d', '#131d25'])
  for (let row = 0, y = top + 12; y < end - 31; y += 20, row++) {
    for (let x = row % 2 ? -29 : 0, i = 0; x < width; x += 58, i++) {
      block(ctx, x + 1, y, 55, 17, noise(row * 113 + i) > 0.64 ? '#3e3336' : '#302b30')
      if (i % 3 === 0) block(ctx, x + 4, y + 1, 39, 2, '#4f3c3f')
    }
  }
  const span = end - top
  const outlets = [width * 0.18, width * 0.77]
  const outlet = top + span * 0.43
  const radius = Math.min(62, (water - outlet) * 0.84)
  const fallTop = outlet + radius * 0.7
  const fall = water - fallTop
  for (const x of outlets) {
    disk(ctx, x, outlet, radius * 1.1, radius, '#70504a')
    disk(ctx, x, outlet, radius * 0.87, radius * 0.79, '#091822')
    for (let i = -3; i <= 3; i++) {
      block(ctx, x + i * radius * 0.21, outlet - radius * 0.56, 4, radius * 1.12, '#51404a')
    }
    block(ctx, x - radius * 0.48, fallTop, radius * 0.96, fall, '#206079')
    for (let i = 0; i < 5; i++) {
      const stream = x + (i - 2) * radius * 0.18
      block(ctx, stream, fallTop, 2, fall, '#367e95')
      const drop = loop(time * (72 + i * 17) + i * 28 + x, fall)
      block(ctx, stream, fallTop + drop, 2, Math.min(9 + i * 3, fall - drop), '#7bb4c1')
    }
  }
  block(ctx, 0, top + 23, width, 18, '#45313a')
  block(ctx, 0, top + 23, width, 3, '#966d60')
  for (let x = 24; x < width; x += 110) {
    block(ctx, x, top + 17, 9, 33, '#806157')
    block(ctx, x + 18, top + 55, 17, 4, '#d7a586')
  }
  gradient(ctx, width, water, end, ['#16445a', '#0b2739'])
  const waterDepth = end - water
  for (let i = 0; i < 38; i++) {
    const length = 13 + noise(i * 17) * 43
    const x = loop(noise(i * 7) * width + time * (8 + (i % 3) * 6), width + length) - length
    const y = water + noise(i * 21) * waterDepth
    block(ctx, x, y, length, 2, i % 5 ? '#2f6f86' : '#5694a8')
  }
  for (const x of outlets) {
    block(ctx, x - radius * 0.56, water, radius * 1.12, 2, '#73adbb')
    for (let i = 0; i < 6; i++) {
      const rise = loop(time * (0.27 + i * 0.025) + i * 0.29 + x * 0.013, 1)
      const bx = x + (noise(i * 19 + x) - 0.5) * 78 + Math.sin(rise * 7 + i) * 6
      const by = water + 4 + (1 - rise) * Math.min(waterDepth - 8, 36 + i * 11)
      if (rise < 0.87) {
        const size = i % 2 ? 5 : 3
        block(ctx, bx, by, size, size, '#4f91a4')
        block(ctx, bx + 1, by, size - 2, 1, '#92c1cb')
      } else {
        const ripple = (rise - 0.87) * 80
        block(ctx, bx - ripple - 6, water + 3, 6, 2, '#83b6c1')
        block(ctx, bx + ripple, water + 4, 5, 2, '#6099aa')
      }
    }
  }

  const debris = width < 800 ? 4 : 5
  for (let i = 0; i < debris; i++) {
    const x = loop(((i + 0.73) * (width + 72)) / debris + time * (21 + i * 4), width + 72) - 36
    const y = water + Math.min(waterDepth * 0.32, 20 + i * 5) + Math.sin(time * 2.4 + i * 1.8) * 2
    block(ctx, x - 26, y + 5, 17, 2, '#579bac')
    block(ctx, x - 15, y + 8, 12, 2, '#2e7089')
    if (i % 2 === 0) {
      block(ctx, x - 9, y - 3, 20, 8, '#9a8c67')
      block(ctx, x - 7, y - 5, 13, 3, '#b7ab86')
      block(ctx, x - 3, y - 2, 7, 6, '#65746b')
      block(ctx, x + 11, y - 1, 5, 4, '#c0ae8a')
    } else {
      block(ctx, x - 12, y, 27, 5, '#7e6256')
      block(ctx, x - 7, y - 4, 20, 6, '#a5836c')
      block(ctx, x - 3, y - 2, 8, 2, '#d0a687')
    }
  }

  // The service shelf sits above the current and has no collision geometry.
  const shelf = water - 9
  const left = width * 0.61
  const right = width - 40
  block(ctx, left - 8, shelf, right - left + 16, 10, '#282f38')
  block(ctx, left, shelf, right - left, 3, '#6e8587')
  for (let x = left + 10; x < right - 12; x += 47) {
    block(ctx, x, shelf + 6, 14, 2, '#4c5960')
  }
  const run = right - left - 44
  const stride = loop(time * 39 + run * 0.68, run * 2)
  const east = stride < run
  const ratX = left + 22 + (east ? stride : run * 2 - stride)
  const pace = Math.floor(time * 10) % 2
  ctx.save()
  ctx.translate(Math.round(ratX), Math.round(shelf - 2))
  ctx.scale(east ? 1 : -1, 1)
  block(ctx, -19, -4, 10, 2, '#b08476')
  block(ctx, -23, -6, 5, 2, '#b08476')
  block(ctx, -11, -10, 19, 8, '#927b79')
  block(ctx, -8, -12, 13, 3, '#af9990')
  block(ctx, 5, -13, 5, 5, '#bf9388')
  block(ctx, 7, -9, 7, 6, '#a58a80')
  block(ctx, 13, -6, 3, 2, '#bf9388')
  block(ctx, 10, -8, 2, 2, '#35282b')
  block(ctx, -9 + pace * 3, -2, 4, 2, '#b89488')
  block(ctx, 5 - pace * 3, -2, 4, 2, '#b89488')
  ctx.restore()
}

function reactor(ctx: Canvas, width: number, top: number, end: number, time: number) {
  gradient(ctx, width, top, end, ['#151621', '#35212e', '#16121b'])
  const span = end - top
  const x = width * 0.76
  const y = top + span * 0.64
  const radius = Math.min(width * 0.155, 171, span * 0.29)
  for (let col = 0; col < width; col += 72) {
    block(ctx, col, top, 2, span, '#4f333c')
    block(ctx, col + 5, top + 18, 18, 3, '#6a4a56')
  }
  for (const [i, px] of [width * 0.38, width * 0.54, width * 0.91].entries()) {
    block(ctx, px, top + 35, 28, span - 60, '#2c2333')
    block(ctx, px + 4, top + 35, 5, span - 60, '#644758')
    for (let yy = top + 62; yy < end - 25; yy += 73) {
      block(ctx, px - 4, yy, 36, 9, '#694752')
      block(ctx, px + 3, yy + 2, 21, 3, '#b47979')
    }
    const length = Math.max(1, span - 85)
    const surge = top + 35 + loop(length * (0.22 + i * 0.27) - time * (51 + i * 13), length)
    block(ctx, px + 12, surge, 12, 26, '#a45869')
    block(ctx, px + 15, surge, 6, 7, '#edaa90')
  }
  const glow = ctx.createRadialGradient(x, y, 10, x, y, radius * 1.62)
  glow.addColorStop(0, '#ea997a9c')
  glow.addColorStop(0.48, '#ba56655c')
  glow.addColorStop(1, '#733c6400')
  ctx.fillStyle = glow
  ctx.fillRect(x - radius * 1.7, y - radius * 1.7, radius * 3.4, radius * 3.4)
  disk(ctx, x, y, radius, radius, '#785566')
  disk(ctx, x, y, radius - 8, radius - 8, '#261e2b')
  disk(ctx, x, y, radius * 0.76, radius * 0.76, '#c57f7c')
  disk(ctx, x, y, radius * 0.72, radius * 0.72, '#562d40')
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6
    const sweep = loop(i + 3 - time * 1.8, 12)
    block(
      ctx,
      x + Math.cos(angle) * radius * 0.88 - 5,
      y + Math.sin(angle) * radius * 0.88 - 3,
      10,
      6,
      sweep < 1 ? '#f5d5a7' : sweep < 2 ? '#ecac90' : i % 3 ? '#8e6372' : '#b48688',
    )
  }
  const pulse = 0.04 * Math.sin(time * 1.7)
  disk(ctx, x, y, radius * (0.49 + pulse), radius * (0.49 + pulse), '#ac5466')
  disk(ctx, x, y, radius * 0.36, radius * 0.36, '#db897a')
  disk(ctx, x, y, radius * 0.21, radius * 0.21, '#f7d6b4')
  block(ctx, x - radius * 0.42, y - 3, radius * 0.84, 6, '#f0bd9b')
  block(ctx, x - 3, y - radius * 0.42, 6, radius * 0.84, '#f0bd9b')
}

const LEDGE_LIGHTS = {
  skyline: '#78c8db',
  streets: '#c9a077',
  transit: '#ad9ad0',
  sewers: '#88b5c0',
  reactor: '#d59383',
}

function platform(ctx: Canvas, p: Platform, light: string) {
  block(ctx, p.x + 4, p.y + 5, p.width - 8, 15, '#162c3a')
  block(ctx, p.x, p.y, p.width, 4, light)
  block(ctx, p.x, p.y + 4, p.width, 5, '#426574')
  for (let x = p.x + 11; x < p.x + p.width - 12; x += 23) {
    block(ctx, x, p.y + 11, 7, 2, '#0d1a24')
  }
  if (p.width < 600) {
    block(ctx, p.x + p.width - 27, p.y + 17, 4, 40, '#395565')
    block(ctx, p.x + p.width - 42, p.y + 54, 19, 4, '#395565')
  }
}

const SPRITE = [
  '....oooooo....',
  '...ohhhhhho...',
  '..ohhhhhhsho..',
  '..ohvvvvvvho..',
  '..ohvbbbbvho..',
  '..ohvbbvbvho..',
  '..ohvvvvvvho..',
  '...ohhhhho....',
  '..oooggggooo..',
  '.odoggggggodo.',
  '.odoggggggodo.',
  '.odogdggdgodo.',
  '.odooggggoodo.',
  '.ohoogggoooho.',
  '.ohooooooooho.',
  '..ooddddddoo..',
  '...oggooggo...',
  '...oggooggo...',
  '...odhoodho...',
  '...ooooooo....',
  '..oooo.oooo...',
  '..............',
]
const PALETTE: Record<string, string> = {
  o: '#0e191c',
  h: PAPER,
  s: '#a5b8bd',
  v: '#20373d',
  b: '#9aedf7',
  g: CYAN,
  d: '#46646b',
}

export function drawGame(ctx: Canvas, state: GameState, height: number, time: number) {
  const width = state.width
  const camera = Math.round(state.camera)
  const { streets, transit: rail, sewers: drains, reactor: core, roof } = state.layout
  const end = floorY(state.layout)
  block(ctx, 0, 0, width, height + 1, '#080e15')
  ctx.save()
  ctx.translate(0, -camera)
  const district = (top: number, bottom: number, paint: () => void) => {
    if (bottom <= camera || top >= camera + height || bottom <= top) return
    ctx.save()
    ctx.beginPath()
    ctx.rect(0, top, width, bottom - top)
    ctx.clip()
    paint()
    ctx.restore()
  }
  district(0, streets, () => skyline(ctx, width, streets, camera, time))
  district(streets, rail, () => market(ctx, width, streets, rail, time))
  district(rail, drains, () => {
    let tracks = rail + (drains - rail) * 0.73
    if (width < 800) {
      const boards = state.layout.billboards.filter((board) => board.y >= rail && board.y < drains)
      const [first] = boards
      const nextRow = first && boards.find((board) => board.y >= first.y + first.height)
      // A single-column grid leaves more room between rows than before the district seam.
      tracks = nextRow
        ? Math.min(billboardLedgeY(first), nextRow.y - 4)
        : Math.min(drains - 13, Math.max(tracks, billboardBottom(state.layout, rail, drains) + 49))
    }
    transit(ctx, width, rail, drains, time, tracks)
  })
  district(drains, core, () => {
    const waterline = drains + (core - drains) * 0.76
    const water =
      width < 800
        ? Math.max(waterline, Math.min(billboardBottom(state.layout, drains, core) + 30, core - 40))
        : waterline
    sewers(ctx, width, drains, core, time, water)
  })
  district(core, end, () => reactor(ctx, width, core, end, time))

  // Seams and a service riser join the five districts into one continuous shaft.
  for (const y of [streets, rail, drains, core]) {
    block(ctx, 0, y - 9, width, 12, '#253e4c')
    block(ctx, 0, y - 8, width, 2, LEDGE_LIGHTS[zoneAt(state.layout, y)] + '84')
    for (let x = 20; x < width; x += 60) block(ctx, x, y - 3, 25, 3, '#405e70')
  }
  block(ctx, width - 27, roof, 27, end - roof, '#182b38')
  block(ctx, width - 24, roof, 3, end - roof, '#577b91')
  for (let y = roof + 15; y < end; y += 88) {
    block(ctx, width - 28, y, 24, 5, '#455e71')
    block(ctx, width - 9, y + 17, 3, 12, '#7db3c2')
  }
  const rooftopX = width * 0.89
  block(ctx, rooftopX - 20, roof - 15, 23, 15, '#8b806f')
  block(ctx, rooftopX - 22, roof - 18, 27, 4, '#b7ac94')
  block(ctx, rooftopX - 11, roof - 38, 4, 22, '#638f9d')
  block(ctx, rooftopX - 19, roof - 31, 10, 5, '#8cb1b8')
  block(ctx, rooftopX - 8, roof - 40, 10, 6, '#8cb1b8')
  for (const p of state.platforms) {
    if (p.y > camera - 65 && p.y < camera + height + 40) {
      platform(ctx, p, LEDGE_LIGHTS[zoneAt(state.layout, p.y)])
    }
  }
  ctx.restore()
}

export function drawForeground(
  ctx: Canvas,
  state: GameState,
  height: number,
  clock: number,
  reducedMotion: boolean,
  visibility: number,
) {
  const time = reducedMotion ? 0 : clock
  const p = state.player
  ctx.clearRect(0, 0, state.width, height + 1)
  if (visibility === 0) return
  ctx.save()
  ctx.globalAlpha = visibility
  ctx.translate(Math.round(p.x + 14), Math.round(p.y - state.camera))
  ctx.scale(p.facing, 1)
  // Twin thruster nozzles and a stepped exhaust make the jetpack readable at sprite size.
  block(ctx, -20, 17, 9, 19, '#486b80')
  block(ctx, -22, 20, 4, 14, '#a0bec9')
  block(ctx, -20, 34, 7, 4, '#6c8b99')
  block(ctx, -19, 21, 3, 6, '#e8b887')
  if (p.jetpack || p.exhaustUntil > state.time) {
    const exhaust = 14 + Math.round((Math.sin(time * 39) + 1) * 5)
    block(ctx, -21, 37, 9, exhaust - 4, '#63b8ec')
    block(ctx, -19, 37, 5, exhaust - 8, '#b2eafa')
    block(ctx, -18, 37, 3, 8, '#f0eee0')
    block(ctx, -18, 38 + exhaust, 3, 3, '#73c9e7')
  }
  SPRITE.forEach((row, y) => {
    const stride =
      y > 16 && p.grounded && Math.abs(p.vx) > 35 ? Math.round(Math.sin(time * 17) * 2) : 0
    for (let x = 0; x < row.length; x++) {
      const color = PALETTE[row[x]]
      if (color) block(ctx, x * 2 - 14 + (x < 7 ? stride : -stride), y * 2, 2, 2, color)
    }
  })
  block(ctx, -10, 16, 18, 3, '#e09883')
  block(ctx, -22 - Math.sin(time * 6) * 2, 17, 11, 3, '#e09883')
  if (visibility < 1) {
    ctx.globalAlpha = Math.sin(visibility * Math.PI) * 0.8
    const spread = (1 - visibility) * 35
    for (let i = 0; i < 14; i++) {
      const x = (noise(i * 17) - 0.5) * (24 + spread * 2)
      const y = noise(i * 29 + 1) * 39 - spread
      block(ctx, x, y, i % 4 === 0 ? 4 : 2, 2, i % 3 ? CYAN : PAPER)
    }
  }
  ctx.restore()

  if (!state.started && visibility === 1) {
    const x = Math.round(p.x + 14)
    const y = Math.round(p.y - state.camera)
    block(ctx, x - 4, y - 17, 8, 2, CYAN)
    block(ctx, x - 2, y - 15, 4, 3, CYAN)
  }
}
