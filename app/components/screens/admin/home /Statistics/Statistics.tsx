import { FC } from 'react'

import s from '../Admin.module.scss'

import CountUsers from './CountUsers'
import PopularMovie from './PopularMovie'

const Statistics: FC = () => {
	return (
		<div className={s.statistics}>
			<CountUsers />
			<PopularMovie />
		</div>
	)
}

export default Statistics
