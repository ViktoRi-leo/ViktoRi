'use client'

import { FirmwareDropdown } from './firmware-dropdown'
import firmware from '../../public/downloads/loger/loger-viktori-firmware.json'

export function LogerViktoriDownload() {
  return (
    <FirmwareDropdown
      version={firmware.version}
      file={firmware.file}
      downloads={firmware.downloads}
      label="Скачать Loger ViktoRi"
    />
  )
}
