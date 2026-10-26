import { cache } from 'react'
import firmware from '../../public/downloads/charger/firmware.json'

const REPO = 'ViktoRi_leo/Charger_ViktoRi'
const API = `https://gitverse.ru/api/repos/${REPO}`

export const RELEASES_URL = `https://gitverse.ru/${REPO}/releases`

export type ChargerRelease = {
  version: string
  // Ссылка на zip-архив релиза в Gitverse (null — если API недоступен при сборке)
  archiveUrl: string | null
  // Локальный файл из public/downloads — запасной вариант
  file?: string
}

type GitverseRelease = {
  tagName: string
  isDraft: boolean
  isPrerelease: boolean
}

// Запрашивается один раз за сборку: сайт статический, версия обновляется пересборкой
export const getChargerRelease = cache(async (): Promise<ChargerRelease> => {
  try {
    const res = await fetch(`${API}/releases?per_page=10`, {
      headers: { Accept: 'application/vnd.gitverse.object+json;version=1' },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const { data } = (await res.json()) as { data: GitverseRelease[] }
    const latest = data.find((r) => !r.isDraft && !r.isPrerelease)
    if (!latest) throw new Error('нет опубликованных релизов')

    return {
      version: latest.tagName.replace(/^v/, ''),
      archiveUrl: `${API}/archive/${encodeURIComponent(latest.tagName)}.zip`,
    }
  } catch (e) {
    console.warn(`[charger-release] Gitverse недоступен, берём firmware.json: ${e}`)
    return { version: firmware.version, archiveUrl: null, file: firmware.file }
  }
})

export const chargerDownloads = [
  { label: 'Релизы на Gitverse', url: RELEASES_URL },
  ...firmware.downloads,
]
