import { getChargerRelease } from './charger-release'

export async function FirmwareVersion() {
  const release = await getChargerRelease()
  return <>{release.version}</>
}
