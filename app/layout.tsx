'use client'
import './globals.less'
import { ConfigProvider } from 'antd';
import { Inter } from 'next/font/google'
import Menu from './Components/Menu';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff0066',
        },
        components: {
          Button: {
            borderRadius: 30,
          },
        }
      }}>
        <body className={inter.className}>
          <Menu />
          <div>
            {children}
          </div>
        </body>
      </ConfigProvider>
    </html>
  )
}
