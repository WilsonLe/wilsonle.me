export function WirelessStepIcon({ kind }: { kind: 'dashboard' | 'wireless' }) {
  return (
    <svg
      viewBox="0 0 96 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-16 w-16 sm:h-24 sm:w-24"
      aria-hidden="true"
    >
      {kind === 'dashboard' ? (
        <>
          <rect x="10" y="12" width="76" height="49" rx="3" />
          <path d="M10 23h76M38 61v9m20-9v9M27 70h42M21 18h2m5 0h2m5 0h2M39 34l-9 8 9 8m18-16 9 8-9 8m-8-19-4 22" />
        </>
      ) : (
        <>
          <path
            d="M10 27c21-21 55-21 76 0M23 40c14-14 36-14 50 0M36 53c7-7 17-7 24 0"
            strokeLinecap="round"
          />
          <circle cx="48" cy="66" r="3" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  )
}
