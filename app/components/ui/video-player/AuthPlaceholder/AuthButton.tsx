import { getMovieUrl } from 'config/url.config'
import Link from 'next/link'
import { FC } from 'react'

import s from './AuthPlaceholder.module.scss'

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
	return (
		<Link href={`/auth?redirect=${getMovieUrl(slug)}`}>
			<a className={s.btn}>Sign in</a>
		</Link>
	)
}
export default AuthButton
