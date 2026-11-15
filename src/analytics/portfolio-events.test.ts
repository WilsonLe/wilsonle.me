import assert from 'node:assert/strict'
import { test } from 'node:test'
import { hasAnalyticsOptOut, portfolioEventProperties } from './portfolio-events'

const environment = {
  url: new URL(
    'https://wilsonle.me/vi?utm_source=GitHub&utm_medium=visitor%40example.test&utm_campaign=private#secret',
  ),
  referrer: 'https://github.com/private-repository?token=private#hidden',
  viewportWidth: 390,
  coarsePointer: true,
  reducedMotion: true,
}
const sdk = {
  token: 'example-project-token',
  distinct_id: 'in-memory-visitor',
  $session_id: 'in-memory-session',
  $browser_version: 141.37,
  $current_url: 'https://wilsonle.me/vi?secret=private',
  $initial_current_url: 'https://wilsonle.me/?token=private',
  $set: { email: 'visitor@example.test' },
  $elements: [{ attr__href: 'mailto:visitor@example.test' }],
}

test('retains routing and attribution without sending arbitrary URL or SDK values', () => {
  const result = portfolioEventProperties('$pageview', sdk, environment)
  assert.ok(result)
  assert.equal(result.token, sdk.token)
  assert.equal(result.$session_id, sdk.$session_id)
  assert.equal(result.$current_url, 'https://wilsonle.me/vi')
  assert.equal(result.$referrer, 'https://github.com')
  assert.equal(result.utm_source, 'github')
  assert.equal(result.utm_medium, 'other')
  assert.equal(result.campaign_tagged, true)
  assert.equal(result.locale, 'vi')
  assert.equal(result.viewport, 'compact')
  assert.equal(result.$browser_version, 141)
  assert.equal(result.$process_person_profile, false)
  assert.doesNotMatch(JSON.stringify(result), /private|visitor@|\$elements|\$set|#secret/)
})

test('accepts named interactions and rejects raw text dimensions', () => {
  const result = portfolioEventProperties(
    'portfolio_interaction',
    {
      ...sdk,
      action: 'screenshot_clicked',
      target: 'sentence-builder',
      project_id: 'pangea-chat',
      surface: 'visitor@example.test',
      text: 'private comment',
    },
    environment,
  )
  assert.equal(result?.target, 'sentence-builder')
  assert.equal(result?.project_id, 'pangea-chat')
  assert.doesNotMatch(JSON.stringify(result), /visitor@|private/)
  assert.equal(
    portfolioEventProperties('portfolio_interaction', { action: 'unknown' }, environment),
    null,
  )
})

test('preserves numeric Web Vitals while dropping nested attribution', () => {
  const result = portfolioEventProperties(
    '$web_vitals',
    {
      ...sdk,
      $current_url: 'https://wilsonle.me/en?key=private#hidden',
      $web_vitals_LCP_value: 1542,
      $web_vitals_LCP_event: { rating: 'good', url: 'https://example.test/?secret=private' },
    },
    environment,
  )
  assert.equal(result?.$web_vitals_LCP_value, 1542)
  assert.equal(result?.$pathname, '/en')
  assert.equal(result?.locale, 'en')
  assert.deepEqual(result?.$web_vitals_LCP_event, {
    name: 'LCP',
    value: 1542,
    rating: 'good',
    delta: undefined,
  })
  assert.doesNotMatch(JSON.stringify(result), /private/)
})

test('filters other hosts, internal routes, and unsupported event families', () => {
  for (const url of [
    'https://wilsonle.me/admin',
    'https://wilsonle.me/api/users',
    'https://preview.vercel.app/',
  ]) {
    assert.equal(
      portfolioEventProperties('$pageview', sdk, { ...environment, url: new URL(url) }),
      null,
    )
  }
  for (const event of ['$snapshot', '$autocapture', '$identify', '$exception']) {
    assert.equal(portfolioEventProperties(event, sdk, environment), null)
  }
  assert.equal(hasAnalyticsOptOut({ doNotTrack: '1' } as Navigator), true)
  assert.equal(hasAnalyticsOptOut({ globalPrivacyControl: true } as unknown as Navigator), true)
  assert.equal(hasAnalyticsOptOut({ doNotTrack: '0' } as Navigator), false)
})
