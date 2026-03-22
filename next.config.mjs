import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/docs',
  search: {
    codeblocks: false
  }
})

const basePath = process.env.PAGES_BASE_PATH || ''

export default withNextra({
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  ...(basePath && { basePath })
})
