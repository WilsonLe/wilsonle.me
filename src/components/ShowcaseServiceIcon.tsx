import Image from 'next/image'
import type { ShowcaseService } from '@/content/types'

interface ShowcaseServiceIconProps {
  icon: ShowcaseService['icon']
}

export function ShowcaseServiceIcon({ icon }: ShowcaseServiceIconProps) {
  return (
    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white">
      <Image
        src={`/images/work/pangea-chat/services/${icon}.svg`}
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        className="size-8 object-contain"
      />
    </span>
  )
}
