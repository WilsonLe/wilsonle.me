import Image from 'next/image'
import type { About } from '@/content/types'

interface AboutSectionProps {
  about: About
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">{about.heading || 'About Me'}</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image - Left on desktop, top on mobile */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden glass">
                <Image
                  src="https://avatars.githubusercontent.com/u/43991506"
                  alt="Profile portrait"
                  width={256}
                  height={256}
                  sizes="(min-width: 768px) 16rem, 12rem"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1 left-1 w-48 h-48 md:w-64 md:h-64 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full -z-10" />
            </div>
          </div>

          {/* Content - Right on desktop, bottom on mobile */}
          <div className="order-2">
            {about.content && (
              <div className="prose prose-invert prose-lg max-w-none space-y-4">
                {about.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
