import { FC } from 'react'

import AuthButton from './AuthButton'
import s from './AuthPlaceholder.module.scss'

const AuthPlaceholder: FC<{ slug: string }> = ({ slug }) => {
	return (
		<div className={s.placeholder}>
			<div>
				<div>You must be logged in to start watching</div>
				<AuthButton slug={slug} />
			</div>
		</div>
	)
}
export default AuthPlaceholder
