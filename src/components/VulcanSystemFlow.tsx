import { VulcanIcon } from '@/components/VulcanIcon'
import type { VulcanChapter } from '@/content/vulcan-types'

export function VulcanSystemFlow({ flow }: { flow: VulcanChapter['flow'] }) {
  return (
    <ol aria-label={flow.label} className="mt-8 grid grid-cols-3 gap-3 border-y border-ink/20 py-5">
      {flow.steps.map((step, index) => (
        <li key={step.label} className="relative min-w-0">
          <VulcanIcon name={step.icon} className="h-7 w-7 text-ink/75" />
          {index < flow.steps.length - 1 ? (
            <span aria-hidden="true" className="absolute right-1 top-0 text-lg text-ink/50">
              →
            </span>
          ) : null}
          <span className="font-label mt-3 block text-[0.65rem] font-semibold leading-5 text-ink/75">
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  )
}
