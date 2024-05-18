// app/layout.tsx
import { Providers } from './providers'

import { LayoutTemplate } from '@/components/Layout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <LayoutTemplate>{children}</LayoutTemplate>
        </Providers>
      </body>
    </html>
  )
}
