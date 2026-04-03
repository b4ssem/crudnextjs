import './globals.css'
import 'boxicons/css/boxicons.min.css'  // pnpm add boxicons

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}