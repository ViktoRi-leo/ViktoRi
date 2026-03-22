import { Layout, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { SearchRu } from './search-ru'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import 'nextra-theme-docs/style.css'

export const metadata: Metadata = {
  title: {
    template: '%s — ViktoRi',
    default: 'ViktoRi — Документация зарядного устройства',
  },
  description: 'Подробная документация зарядного устройства ViktoRi на базе Arduino',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const repo = process.env.GITHUB_REPOSITORY || 'a-gallyamov/viktori'
  const docsRepoBase = `https://github.com/${repo}/tree/main`

  const navbar = (
    <Navbar
      logo={<b>ViktoRi</b>}
    >
      <ThemeSwitch lite className="theme-switch" />
    </Navbar>
  )
  const pageMap = await getPageMap()
  return (
    <html lang="ru" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={null}
          sidebar={{ defaultMenuCollapseLevel: 2 }}
          pageMap={pageMap}
          docsRepositoryBase={docsRepoBase}
          editLink="Редактировать страницу"
          feedback={{ content: null }}
          themeSwitch={{ dark: 'Тёмная', light: 'Светлая', system: 'Системная' }}
          toc={{ title: 'Содержание', backToTop: 'Наверх' }}
          search={<SearchRu />}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
