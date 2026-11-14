import type { Controls } from '@/components/game/descent-engine'

export type MoveKey = 'left' | 'right' | 'up' | 'down'

const movement: Record<string, MoveKey | undefined> = {
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
  ArrowUp: 'up',
  KeyW: 'up',
  ArrowDown: 'down',
  KeyS: 'down',
}

export function moveKey(code: string) {
  return movement[code]
}

const DOUBLE_PRESS_MS = 400
const TOUCH_STEP_MS = 110
const empty = (): Controls => ({
  left: false,
  right: false,
  up: false,
  jump: false,
  boost: false,
  drop: false,
})

export function createControls() {
  const held = new Map<string, MoveKey>()
  const stepUntil = { left: 0, right: 0 }
  let lastUpPress: number | undefined
  let pending = empty()
  const isHeld = (direction: MoveKey) => [...held.values()].includes(direction)

  return {
    press(source: string, direction: MoveKey, at: number, touch = false) {
      if (held.has(source)) return
      const alreadyHeld = isHeld(direction)
      held.set(source, direction)
      if (alreadyHeld) return

      if (direction === 'up') {
        if (lastUpPress !== undefined && at - lastUpPress <= DOUBLE_PRESS_MS) {
          pending.boost = true
          lastUpPress = undefined
        } else {
          pending.jump = true
          lastUpPress = at
        }
      }
      if (direction === 'down') pending.drop = true
      if (direction === 'left' || direction === 'right') {
        pending[direction] = true
        stepUntil[direction === 'left' ? 'right' : 'left'] = 0
        if (touch) stepUntil[direction] = at + TOUCH_STEP_MS
      }
    },
    release(source: string) {
      held.delete(source)
    },
    reset() {
      held.clear()
      stepUntil.left = 0
      stepUntil.right = 0
      lastUpPress = undefined
      pending = empty()
    },
    next(at = performance.now()): Controls {
      const frame = {
        ...pending,
        left: pending.left || at < stepUntil.left || isHeld('left'),
        right: pending.right || at < stepUntil.right || isHeld('right'),
        up: isHeld('up'),
      }
      pending = empty()
      return frame
    },
  }
}
