import { chromium } from 'playwright'
import path from 'node:path'
import { education, experiences } from '@/content/en/resume'
import { siteSettings } from '@/content/en/site'

// Reuse the site's approved facts and installed print renderer; no runtime PDF service.
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[character]
  })

const date = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

const contact = [siteSettings.location, siteSettings.email, siteSettings.phone]
  .filter((value): value is string => Boolean(value))
  .map(escapeHtml)
  .join(' · ')

const profiles = [
  { url: siteSettings.social?.github, label: siteSettings.socialLabels.github },
  { url: siteSettings.social?.linkedin, label: siteSettings.socialLabels.linkedin },
]
  .filter((profile): profile is { url: string; label: string } => Boolean(profile.url))
  .map((profile) => `<a href="${escapeHtml(profile.url)}">${escapeHtml(profile.label)}</a>`)
  .join(' · ')

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(siteSettings.name)} - Resume</title>
  <style>
    @page { size: A4; margin: 17mm 18mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #080b0c; font: 10pt/1.45 Arial, sans-serif; }
    h1, h2, h3, p { margin: 0; }
    h1 { font: 34pt/1.1 Georgia, serif; letter-spacing: -1pt; }
    .title { margin-top: 7pt; font-size: 12pt; }
    .contact { margin-top: 11pt; font-size: 9pt; }
    .profiles { margin-top: 4pt; font-size: 9pt; }
    a { color: #156675; text-underline-offset: 2pt; }
    section { margin-top: 22pt; }
    h2 { border-bottom: 1pt solid #156675; padding-bottom: 5pt; font-size: 10pt; letter-spacing: 1pt; text-transform: uppercase; }
    article { break-inside: avoid; margin-top: 13pt; }
    .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }
    h3 { font-size: 11pt; }
    .date { white-space: nowrap; color: #3e5b5f; font-size: 9pt; }
    .meta { margin-top: 2pt; }
    .detail { margin-top: 3pt; color: #3e5b5f; font-size: 9pt; }
    .summary { margin-top: 3pt; }
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(siteSettings.name)}</h1>
    <p class="title">${escapeHtml(siteSettings.title)}</p>
    <p class="contact">${contact}</p>
    <p class="profiles">${profiles}</p>
  </header>
  <section>
    <h2>Experience</h2>
    ${experiences
      .map(
        (experience) => `<article>
      <div class="row">
        <h3>${escapeHtml(experience.title)}</h3>
        <p class="date">${date(experience.startDate)} - ${experience.current ? 'Present' : experience.endDate ? date(experience.endDate) : ''}</p>
      </div>
      <p class="meta">${escapeHtml(experience.company)} · ${escapeHtml(experience.employmentType)}</p>
      ${experience.location ? `<p class="detail">${escapeHtml(experience.location)}</p>` : ''}
      ${experience.summary ? `<p class="summary">${escapeHtml(experience.summary)}</p>` : ''}
    </article>`,
      )
      .join('')}
  </section>
  <section>
    <h2>Education</h2>
    ${education
      .map(
        (entry) => `<article>
      <div class="row">
        <h3>${escapeHtml(entry.institution)}</h3>
        <p class="date">${new Date(entry.graduationDate) > new Date() ? 'Expected ' : ''}${date(entry.graduationDate)}</p>
      </div>
      <p class="meta">${escapeHtml(entry.degree)}</p>
      ${entry.location ? `<p class="detail">${escapeHtml(entry.location)}</p>` : ''}
      ${entry.gpa ? `<p class="detail">GPA: ${escapeHtml(entry.gpa)}</p>` : ''}
      ${entry.coursework?.length ? `<p class="detail">Relevant Coursework: ${entry.coursework.map(escapeHtml).join(', ')}</p>` : ''}
    </article>`,
      )
      .join('')}
  </section>
</body>
</html>`

const browser = await chromium.launch({ headless: true })
try {
  const page = await browser.newPage()
  await page.setContent(html)
  await page.pdf({
    path: path.join(process.cwd(), 'public', siteSettings.resumeUrl),
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
  })
} finally {
  await browser.close()
}
