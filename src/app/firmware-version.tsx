import firmware from '../../public/downloads/charger/firmware.json'

export function FirmwareVersion() {
  return <>{firmware.version}</>
}
