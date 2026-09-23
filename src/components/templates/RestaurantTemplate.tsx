import Image from 'next/image'
import type { templatePreviews } from '@/content/en/template-previews'

export function RestaurantTemplate({
  content: c,
}: {
  content: typeof templatePreviews.restaurant
}) {
  return (
    <div className="bg-[#fcf7ef] font-sans text-[#351511]">
      <header className="border-b border-[#eaddd0]">
        <nav
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5"
          aria-label={c.title}
        >
          <a href="#home" className="font-display text-2xl font-bold">
            {c.name}
            <span aria-hidden="true" className="text-[#b82d24]">
              {' '}
              ·
            </span>
          </a>
          <div className="flex flex-wrap items-center gap-5 text-sm font-semibold">
            {c.nav.map((label, i) => (
              <a
                href={['#story', '#menu', '#visit'][i]}
                key={label}
                className="hover:text-[#b82d24]"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </header>
      <main id="home">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-[#b82d24]">{c.eyebrow}</p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.06] tracking-[-0.045em] lg:text-7xl">
              {c.heading}
            </h1>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
              <a
                href="#menu"
                className="rounded-full bg-[#b82d24] px-5 py-3 text-white hover:bg-[#922219]"
              >
                {c.primary}
              </a>
              <a href="#visit" className="rounded-full border border-[#bb8b70] px-5 py-3">
                {c.secondary}
              </a>
            </div>
          </div>
          <Image
            src="/templates/restaurant/table.webp"
            alt={c.heroAlt}
            width={960}
            height={1200}
            sizes="(min-width: 1152px) 520px, (min-width: 768px) 48vw, 100vw"
            priority
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-xl"
          />
        </section>
        <section id="menu" className="bg-[#f4e8d8] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-bold tracking-[0.15em] text-[#b82d24]">{c.menuEyebrow}</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {c.menuHeading}
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-[#705347]">{c.menuText}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {c.dishes.map((dish) => (
                <article
                  key={dish.name}
                  className="overflow-hidden rounded-2xl bg-[#fffaf4] shadow-lg"
                >
                  <Image
                    src={`/templates/restaurant/${dish.image}`}
                    alt={dish.alt}
                    width={640}
                    height={480}
                    sizes="(min-width: 1152px) 360px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-6">
                    <p className="text-[0.65rem] font-bold tracking-widest text-[#b82d24]">
                      {dish.category}
                    </p>
                    <h3 className="mt-3 text-xl font-bold">{dish.name}</h3>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 border-l-4 border-[#b82d24] bg-[#fffaf4] p-5 text-sm leading-6 text-[#705347]">
              {c.menuNote}
            </p>
          </div>
        </section>
        <section className="bg-linear-to-r from-[#351511] to-[#471a14] px-6 py-20 text-[#fff7ed]">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            <article
              id="story"
              className="rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-10"
            >
              <p className="text-xs font-bold tracking-widest text-[#e7b5a0]">{c.storyEyebrow}</p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-tight">{c.storyHeading}</h2>
              <p className="mt-5 leading-7 text-[#e4cec5]">{c.storyText}</p>
            </article>
            <article
              id="visit"
              className="rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-10"
            >
              <p className="text-xs font-bold tracking-widest text-[#e7b5a0]">{c.visitEyebrow}</p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-tight">{c.visitHeading}</h2>
              <p className="mt-5 leading-7 text-[#e4cec5]">{c.visitText}</p>
              <a
                href="#menu"
                className="mt-6 inline-block rounded-full bg-[#fff7ed] px-5 py-3 text-sm font-bold text-[#351511]"
              >
                {c.visitLink}
              </a>
            </article>
          </div>
        </section>
      </main>
      <footer className="px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="font-display text-2xl font-bold">{c.name}</p>
          <p className="text-sm text-[#705347]">{c.footer}</p>
        </div>
      </footer>
    </div>
  )
}
