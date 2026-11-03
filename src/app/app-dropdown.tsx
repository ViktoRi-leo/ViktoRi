'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './app-download.module.css'
import type { AppRelease } from './app-release'

export function AppDropdown({
  release,
  releasesUrl,
  centered,
  moreHref,
}: {
  release: AppRelease
  releasesUrl: string
  centered?: boolean
  // Ссылка на страницу документации приложения, на самой этой странице не нужна
  moreHref?: string
}) {
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
    <div className={styles.dropdownWrapper} ref={ref}>
      <button className={styles.btn} onClick={() => setOpen(!open)}>
        Скачать приложение{release.version && ` v${release.version}`}
        <span className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`}>&#9662;</span>
      </button>
      {open && (
        <div className={`${styles.dropdown} ${centered ? styles.dropdownCentered : ''}`}>
          {release.downloads.map((d) => (
            <a
              key={d.url}
              href={d.url}
              className={styles.item}
              onClick={() => setOpen(false)}
            >
              {d.label}
              <span className={styles.hint}>{d.hint}</span>
            </a>
          ))}
          {/* Запасной пункт, только если при сборке не удалось получить файлы релиза */}
          {release.downloads.length === 0 && (
            <a
              href={releasesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
              onClick={() => setOpen(false)}
            >
              Скачать с GitHub
            </a>
          )}
          {moreHref && (
            <>
              <div className={styles.divider} />
              <Link href={moreHref} className={styles.item} onClick={() => setOpen(false)}>
                Подробнее о приложении
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
