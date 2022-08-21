import Image from 'next/image'
import Link from 'next/link'
import { FC, memo } from 'react'

import MaterialIcon from '@/ui/icons/MaterialIcon'

import s from './Logo.module.scss'

const Logo: FC = () => {
	return (
		<div className={s.logo}>
			<MaterialIcon name="MdMovieFilter" />
			<div className={s.title}>Magic TV</div>
		</div>
	)
}

export default memo(Logo)
