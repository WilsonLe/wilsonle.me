import type { VulcanFeature } from '@/content/vulcan-types'

export function VulcanIcon({ name, className }: { name: VulcanFeature; className?: string }) {
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
      {name === 'content' ? (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </>
      ) : name === 'access' ? (
        <>
          <path d="M12 3 20 6v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-3Z" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </>
      ) : (
        <path d="M3 12h4l3-8 4 16 3-8h4" />
      )}
    </svg>
  )
}
