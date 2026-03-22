import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import type { MDXComponents } from 'mdx/types'
import { FirmwareVersion } from './src/app/firmware-version'
import { FirmwareDownload } from './src/app/firmware-download'
import { ImageGallery } from './src/app/image-gallery'
import { LoggerFirmwareDownload } from './src/app/logger-firmware-download'
import { LogerViktoriDownload } from './src/app/loger-viktori-download'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...docsComponents,
    FirmwareVersion,
    FirmwareDownload,
    ImageGallery,
    LoggerFirmwareDownload,
    LogerViktoriDownload,
    ...components,
  }
}
