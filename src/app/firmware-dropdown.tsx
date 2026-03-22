'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './firmware-dropdown.module.css'

type Download = {
  label: string
  url: string
}

export function FirmwareDropdown({
  version,
  file,
  downloads,
  label,
}: {
  version: string
  file?: string
  downloads: Download[]
  label?: string
}) {
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

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.btn}
        onClick={() => setOpen(!open)}
      >
        {label || 'Скачать прошивку'} v{version}
        <span className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`}>&#9662;</span>
      </button>
      {open && (
        <div className={styles.dropdown}>
          {file && (
            <a
              href={`${basePath}/downloads/${file}`}
              download
              className={styles.item}
              onClick={() => setOpen(false)}
            >
              Скачать с сайта
            </a>
          )}
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
        </div>
      )}
    </div>
  )
}
