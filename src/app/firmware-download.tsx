'use client'

import { FirmwareDropdown } from './firmware-dropdown'
import firmware from '../../public/downloads/charger/firmware.json'

export function FirmwareDownload() {
  return (
    <FirmwareDropdown
      version={firmware.version}
      file={firmware.file}
      downloads={firmware.downloads}
    />
  )
}
