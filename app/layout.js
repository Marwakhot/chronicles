import './globals.css'

export const metadata = {
  title: 'Chronicles: Rewritten',
  description: 'Walk the roads history forgotten.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
