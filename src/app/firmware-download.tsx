import { FirmwareDropdown } from './firmware-dropdown'
import { getChargerRelease, chargerDownloads } from './charger-release'

export async function FirmwareDownload() {
  const release = await getChargerRelease()
  return (
    <FirmwareDropdown
      version={release.version}
      archiveUrl={release.archiveUrl}
      file={release.file}
      downloads={chargerDownloads}
    />
  )
}
