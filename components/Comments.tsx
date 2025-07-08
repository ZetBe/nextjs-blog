'use client'
import siteMetadata from '@/data/siteMetadata'
import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Comments({ slug }: { slug: string }) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 클라이언트 사이드에서만 렌더링되도록 보장
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!siteMetadata.comments || siteMetadata.comments.provider !== 'giscus') {
    return null
  }

  const giscus = siteMetadata.comments.giscusConfig

  // 실제 테마 값 결정
  const getTheme = () => {
    if (theme === 'system') {
      return systemTheme === 'dark' ? 'dark' : 'light'
    }
    return theme === 'dark' ? 'dark' : 'light'
  }

  const giscusTheme = getTheme()

  return (
    <Giscus
      key={`${theme}-${systemTheme}`} // 테마와 시스템 테마 모두 변경시 재마운트
      repo={giscus.repo as `${string}/${string}`}
      repoId={giscus.repositoryId}
      category={giscus.category}
      categoryId={giscus.categoryId}
      mapping={giscus.mapping}
      reactionsEnabled={giscus.reactions}
      emitMetadata={giscus.metadata}
      theme={giscusTheme}
      lang={giscus.lang}
    />
  )
}
