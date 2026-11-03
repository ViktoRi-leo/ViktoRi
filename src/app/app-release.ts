import { cache } from 'react'

const REPO = 'a-gallyamov/viktori-configurator-releases'
const API = `https://api.github.com/repos/${REPO}`

export const APP_RELEASES_URL = `https://github.com/${REPO}/releases`

export type AppDownload = {
  label: string
  hint: string
  url: string
}

export type AppRelease = {
  // null — если GitHub недоступен при сборке, тогда остаётся только ссылка на релизы
  version: string | null
  downloads: AppDownload[]
}

type GithubRelease = {
  tag_name: string
  assets: { name: string; browser_download_url: string }[]
}

// Порядок здесь задаёт порядок пунктов в выпадающем списке
const PLATFORMS = [
  { test: /windows-x64-Setup\.exe$/i, label: 'Windows 10/11 (x64)', hint: 'установщик .exe' },
  { test: /arm64\.dmg$/i, label: 'macOS (Apple Silicon)', hint: 'образ .dmg' },
  { test: /\.AppImage$/i, label: 'Linux (x64)', hint: 'AppImage' },
  { test: /linux-x64\.tar\.xz$/i, label: 'Linux (x64)', hint: 'архив .tar.xz' },
]

// Запрашивается один раз за сборку: сайт статический, версия обновляется пересборкой
export const getAppRelease = cache(async (): Promise<AppRelease> => {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
    // В GitHub Actions токен снимает лимит анонимных запросов к API
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

    const res = await fetch(`${API}/releases/latest`, {
      headers,
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const release = (await res.json()) as GithubRelease

    const downloads = PLATFORMS.flatMap(({ test, label, hint }) => {
      const asset = release.assets.find((a) => test.test(a.name))
      return asset ? [{ label, hint, url: asset.browser_download_url }] : []
    })
    if (downloads.length === 0) throw new Error('в релизе нет установщиков')

    return { version: release.tag_name.replace(/^v/, ''), downloads }
  } catch (e) {
    console.warn(`[app-release] GitHub недоступен, остаётся ссылка на релизы: ${e}`)
    return { version: null, downloads: [] }
  }
})
