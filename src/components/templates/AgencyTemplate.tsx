import type { templatePreviews } from '@/content/en/template-previews'

export function AgencyTemplate({ content: c }: { content: typeof templatePreviews.agency }) {
  return (
    <div className="bg-[#0c0b26] font-sans text-white">
      <header className="border-b border-white/10 bg-white/5">
        <nav
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5"
          aria-label={c.title}
        >
          <a
            href="#home"
            className="rounded-lg bg-white px-4 py-1.5 text-xl font-black tracking-tight text-[#4e4aff]"
          >
            {c.name}
          </a>
          <div className="flex flex-wrap gap-5 text-sm text-white/80">
            {c.nav.map((label, i) => (
              <a
                key={label}
                href={['#services', '#approach', '#faq'][i]}
                className="hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </header>
      <main id="home">
        <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#23255e_0%,transparent_65%),radial-gradient(ellipse_at_bottom_right,#542b29_0%,transparent_40%)] px-6 pb-16 pt-20 text-center sm:pt-24">
          <div className="relative mx-auto max-w-6xl">
            <p className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.65rem] font-bold tracking-[0.15em] text-[#d1d2ff]">
              {c.eyebrow}
            </p>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              {c.heading}
              <span className="mt-2 block bg-linear-to-r from-[#9e9aff] via-[#c3a0ed] to-[#ff986a] bg-clip-text text-transparent">
                {c.highlight}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#c2c1d3]">
              {c.introduction}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-bold">
              <a
                href="#approach"
                className="rounded-full bg-[#ff8b38] px-6 py-3.5 text-[#211307] hover:bg-[#ffa967]"
              >
                {c.primary} ↗
              </a>
              <a
                href="#services"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3.5"
              >
                {c.secondary} →
              </a>
            </div>
            <div className="mt-14 grid overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left md:grid-cols-[1.2fr_2fr]">
              <div className="bg-white/5 p-7">
                <p className="text-xs font-bold tracking-widest text-[#ffad6e]">{c.signal}</p>
                <h2 className="mt-4 text-2xl font-bold leading-tight">{c.hook}</h2>
              </div>
              <div className="grid grid-cols-3">
                {c.services.map((service, i) => (
                  <div key={service.name} className="border-l border-white/10 px-3 py-7 sm:px-6">
                    <span className="text-xs text-[#b1adc9]">0{i + 1}</span>
                    <h3 className="mt-5 text-2xl font-extrabold sm:text-4xl">{service.name}</h3>
                    <p className="mt-5 text-xs leading-5 text-[#c2c1d3]">{service.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 bg-white px-6 py-6 text-xs font-semibold text-[#38374d]">
          {c.strip.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <section id="approach" className="bg-[#f5f7ff] px-6 py-20 text-[#262638]">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#5046cf]">
                {c.approachEyebrow}
              </p>
              <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight">
                {c.approachHeading}
              </h2>
              <p className="mt-6 leading-7 text-[#5c5b6b]">{c.approachText}</p>
            </div>
            <div className="space-y-5">
              {c.steps.map((step, i) => (
                <article
                  key={step.title}
                  className={`rounded-3xl p-8 text-white shadow-xl ${i === 0 ? 'bg-[#11102d]' : 'bg-linear-to-br from-[#315bff] to-[#7145eb]'}`}
                >
                  <p className="text-xs text-white/70">0{i + 1}</p>
                  <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/85">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="services" className="bg-white px-6 py-20 text-[#262638]">
          <h2 className="mx-auto max-w-2xl text-center text-4xl font-extrabold tracking-tight">
            {c.servicesHeading}
          </h2>
          <article className="mx-auto mt-10 max-w-2xl rounded-3xl border border-[#e1e5f2] bg-[#f8faff] p-8 shadow-xl sm:p-12">
            <h3 className="text-3xl font-bold">{c.serviceCardHeading}</h3>
            <p className="mt-4 text-[#5c5b6b]">{c.serviceCardText}</p>
            <ul className="mt-8 space-y-6">
              {c.services.map((service) => (
                <li key={service.name}>
                  <p className="font-bold text-[#4940c3]">{service.name}</p>
                  <p className="mt-1 text-sm leading-6 text-[#5c5b6b]">{service.detail}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>
        <section className="px-6 py-20">
          <h2 className="text-center text-4xl font-extrabold tracking-tight">
            {c.principlesHeading}
          </h2>
          <div className="mx-auto mt-10 grid max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {c.principles.map((item, i) => (
              <article key={item.title} className="border border-white/5 p-7">
                <p className="text-xs text-[#c2b8ed]">0{i + 1}</p>
                <h3 className="mt-6 font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#c2c1d3]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="faq" className="bg-[#f5f7ff] px-6 py-20 text-[#262638]">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.5fr]">
            <h2 className="text-4xl font-extrabold tracking-tight">{c.faqHeading}</h2>
            <div>
              {c.faqs.map((faq, i) => (
                <details
                  key={faq.question}
                  open={i === 0}
                  className="border-b border-[#dce0ed] py-5"
                >
                  <summary className="cursor-pointer font-bold">{faq.question}</summary>
                  <p className="mt-4 text-sm leading-7 text-[#5c5b6b]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[radial-gradient(ellipse_at_top,#23255e,transparent_70%)] px-6 py-20 text-center">
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            {c.closingHeading}
          </h2>
          <a
            href="#services"
            className="mt-8 inline-block rounded-full bg-[#ff8b38] px-6 py-3.5 font-bold text-[#211307]"
          >
            {c.closingLink} →
          </a>
        </section>
      </main>
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-xl font-black">{c.name}</p>
          <p className="text-sm text-[#c2c1d3]">{c.footer}</p>
        </div>
      </footer>
    </div>
  )
}
