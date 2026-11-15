import assert from 'node:assert/strict'
import { test } from 'node:test'
import { replayRecordingOptions } from '@/analytics/replay-config'

test('replay metadata keeps a portfolio path and drops private URL parts', (t) => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'window')
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { location: new URL('https://wilsonle.me/') },
  })
  t.after(() => {
    if (previous) Object.defineProperty(globalThis, 'window', previous)
    else Reflect.deleteProperty(globalThis, 'window')
  })

  const mask = replayRecordingOptions.maskCapturedNetworkRequestFn
  assert.ok(mask)
  type Request = Parameters<typeof mask>[0]
  assert.deepEqual(mask({ name: 'https://wilsonle.me/vi?email=private#secret' } as Request), {
    name: 'https://wilsonle.me/vi',
  })
  assert.equal(mask({ name: 'https://wilsonle.me/privacy' } as Request), null)
  assert.equal(mask({ name: 'https://example.test/?key=private' } as Request), null)
  assert.equal(
    mask({ name: 'https://wilsonle.me/en', entryType: 'resource', startTime: 1, duration: 2 }),
    null,
  )
})

test('replay removes link, accessibility text and custom attributes from the serialized layout', () => {
  const mask = replayRecordingOptions.maskAttributeFn
  assert.ok(mask)
  assert.equal(mask('class', 'descent-billboard'), 'descent-billboard')
  assert.equal(mask('href', 'https://example.test/?token=private'), '')
  assert.equal(mask('aria-label', 'private name'), '')
  assert.equal(mask('data-value', 'private input'), '')
})
