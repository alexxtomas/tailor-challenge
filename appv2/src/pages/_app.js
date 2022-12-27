import { Inter } from '@next/font/google'
import GlobalLayout from '../components/layouts/GlobalLayout'
import AuthProvider from '../context/authContext'
import RestaurantsProvider from '../context/restaurantsContext'
import GlobalStyles from '../styles/GobalStyles'
import Theme from '../styles/Theme'

const inter = Inter({
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <Theme>
      <GlobalStyles />
      <GlobalLayout classname={inter.className}>
        <AuthProvider>
          <RestaurantsProvider>
            <Component {...pageProps} />
          </RestaurantsProvider>
        </AuthProvider>
      </GlobalLayout>
    </Theme>
  )
}
