'use client'

import { Search } from 'nextra/components'

export function SearchRu() {
  return (
    <Search
      placeholder="Поиск в документации..."
      emptyResult="Ничего не найдено."
      errorText="Не удалось загрузить поисковый индекс."
      loading="Загрузка…"
    />
  )
}
