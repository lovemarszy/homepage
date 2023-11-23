import type { NextPage } from 'next'

import Main from './components/Main'
import Footer from './components/Footer'
import RootLayout from './layout'

const Home: NextPage = () => {
  return (
    <RootLayout>
      <Main />
      <Footer />
    </RootLayout>
  )
}

export default Home
