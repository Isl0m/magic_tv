import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import 'swiper/css/bundle'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import '@/assets/styles/globals.scss'

type TypeAppProps = AppProps & TypeComponentAuthFields

const MainProvider = dynamic(() => import('providers/MainProvider'), {
	ssr: false,
})

function MyApp({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	)
}

export default MyApp
