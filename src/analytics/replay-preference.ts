export const replayPreferenceKey = 'wilsonle.replay.v1'

export function hasReplayPermission() {
  try {
    return localStorage.getItem(replayPreferenceKey) === 'allowed'
  } catch {
    return false
  }
}

export function saveReplayPermission(allowed: boolean) {
  try {
    if (allowed) localStorage.setItem(replayPreferenceKey, 'allowed')
    else localStorage.removeItem(replayPreferenceKey)
    return true
  } catch {
    return false
  }
}
