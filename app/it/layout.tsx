import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InstaCheck',
  description: 'InstaCheck',
  generator: 'InstaCheck',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/public/images/spy-icon.png" type="image/png" />
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
        ></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
