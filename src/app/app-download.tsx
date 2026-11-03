import styles from './app-download.module.css'
import { AppDropdown } from './app-dropdown'
import { getAppRelease, APP_RELEASES_URL } from './app-release'

export async function AppDownload() {
  const release = await getAppRelease()
  return (
    <div className={styles.wrapper}>
      {release.version && (
        <div className={styles.version}>
          Версия приложения: <strong>{release.version}</strong>
        </div>
      )}
      <AppDropdown release={release} releasesUrl={APP_RELEASES_URL} />
    </div>
  )
}

export async function AppVersion() {
  const release = await getAppRelease()
  return <>{release.version ?? 'последняя'}</>
}
