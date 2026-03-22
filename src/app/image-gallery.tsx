'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import styles from './image-gallery.module.css'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

type Image = {
  src: string
  alt: string
}

export function ImageGallery({ images }: { images: Image[] }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const slides = images.map((img) => ({
    src: basePath + img.src,
    alt: img.alt,
    description: img.alt,
  }))

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <>
      <div className={styles.preview}>
        <button className={`${styles.btn} ${styles.btnPrev}`} onClick={prev} aria-label="Назад">&#8249;</button>
        <img
          src={basePath + images[index].src}
          alt={images[index].alt}
          className={styles.previewImg}
          onClick={() => setOpen(true)}
        />
        <button className={`${styles.btn} ${styles.btnNext}`} onClick={next} aria-label="Вперёд">&#8250;</button>
      </div>
      <div className={styles.dots}>
        {images.map((img, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => setIndex(i)}
            aria-label={img.alt}
          />
        ))}
      </div>
      <p className={styles.caption}>{images[index].alt}</p>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Captions, Counter]}
        captions={{ descriptionTextAlign: 'center' }}
        counter={{ container: { style: { top: 0, bottom: 'unset' } } }}
      />
    </>
  )
}
