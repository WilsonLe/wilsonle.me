import '@/app/(frontend)/globals.css'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'

const inter = Inter({ subsets: ['latin'] })

export default async function TemplatePreviewLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isSupportedLocale(locale)) notFound()
  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
