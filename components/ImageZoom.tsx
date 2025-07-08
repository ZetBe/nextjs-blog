'use client'

import NextImage, { ImageProps } from 'next/image'
import { useState } from 'react'

const basePath = process.env.BASE_PATH

interface ZoomableImageProps extends ImageProps {
  zoomable?: boolean
}

const ZoomableImage = ({ src, alt, zoomable = true, ...rest }: ZoomableImageProps) => {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleImageClick = () => {
    if (zoomable) {
      setIsZoomed(true)
    }
  }

  const handleCloseZoom = () => {
    setIsZoomed(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseZoom()
    }
  }

  return (
    <>
      {zoomable ? (
        <button
          onClick={handleImageClick}
          style={{ border: 'none', background: 'none', padding: 0, cursor: 'zoom-in' }}
          aria-label={`Zoom ${alt}`}
        >
          <NextImage src={`${basePath || ''}${src}`} alt={alt} {...rest} />
        </button>
      ) : (
        <NextImage src={`${basePath || ''}${src}`} alt={alt} {...rest} />
      )}

      {isZoomed && (
        <div
          className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed image"
        >
          <div className="relative h-full max-h-full w-full max-w-7xl">
            <button
              onClick={handleCloseZoom}
              onKeyDown={handleKeyDown}
              className="absolute -top-10 right-0 z-10 text-2xl font-bold text-white hover:text-gray-300"
              aria-label="Close zoom"
            >
              ×
            </button>
            <button
              onClick={handleCloseZoom}
              onKeyDown={handleKeyDown}
              style={{ border: 'none', background: 'none', padding: 0, cursor: 'zoom-out' }}
              aria-label="Close zoomed image"
              className="relative h-full w-full"
            >
              <NextImage
                src={`${basePath || ''}${src}`}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ZoomableImage
