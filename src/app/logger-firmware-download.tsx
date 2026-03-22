'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './logger-firmware-download.module.css'
import firmware from '../../public/downloads/logi/logi-firmware.json'

type FirmwareEntry = {
  label: string
  file: string
}

type ExternalLink = {
  label: string
  url: string
}

export function LoggerFirmwareDownload() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const firmwares = firmware.firmwares as FirmwareEntry[]
  const downloads = firmware.downloads as ExternalLink[]

  return (
    <div className={styles.wrapper}>
      <div className={styles.version}>Версия прошивки логгера: <strong>{firmware.version}</strong></div>
      <div className={styles.buttons} ref={ref}>
        <a
          href={`${basePath}/downloads/logi/${firmware.web}`}
          download
          className={styles.btn}
        >
          Скачать web.zip
        </a>
        <div className={styles.dropdownWrapper}>
          <button
            className={styles.btn}
            onClick={() => setOpen(!open)}
          >
            Скачать прошивку (.bin)
            <span className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`}>&#9662;</span>
          </button>
          {open && (
            <div className={styles.dropdown}>
              {firmwares.map((fw) => (
                <a
                  key={fw.file}
                  href={`${basePath}/downloads/logi/${fw.file}`}
                  download
                  className={styles.item}
                  onClick={() => setOpen(false)}
                >
                  {fw.label}
                </a>
              ))}
              {downloads.length > 0 && (
                <>
                  <div className={styles.divider} />
                  {downloads.map((d) => (
                    <a
                      key={d.label}
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.item}
                      onClick={() => setOpen(false)}
                    >
                      {d.label}
                    </a>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
