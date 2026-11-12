import type { VulcanSymbol } from '@/content/vulcan-types'

export function VulcanIcon({ name, className }: { name: VulcanSymbol; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'access' ? (
        <>
          <path d="M12 3 20 6v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-3Z" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </>
      ) : name === 'person' ? (
        <>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21v-3a7 7 0 0 1 14 0v3" />
        </>
      ) : name === 'context' ? (
        <>
          <circle cx="5" cy="6" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="12" cy="19" r="2" />
          <path d="M7 6h10M6 8l5 9M18 8l-5 9" />
        </>
      ) : name === 'events' ? (
        <>
          <path d="M3 12h4l3-8 4 16 3-8h4" />
        </>
      ) : name === 'report' ? (
        <>
          <path d="M5 3h10l4 4v14H5V3Z" />
          <path d="M14 3v5h5M8 12h8M8 16h6" />
        </>
      ) : (
        <>
          <path d="M4 3v18h17M8 16v-4M13 16V8M18 16V5" />
        </>
      )}
    </svg>
  )
}
