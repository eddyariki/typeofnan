import { ReactElement } from 'react'
import { Footer } from '../footer/footer'
import { Header } from '../header/header'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
