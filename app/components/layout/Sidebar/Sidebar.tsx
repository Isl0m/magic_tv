import { FC, memo } from 'react'

import MoviesContainer from './MoviesContainer/MoviesContainer'
import Search from './Search/Search'
import s from './Sidebar.module.scss'

const Sidebar: FC = () => {
	return (
		<div className={s.sidebar}>
			<Search />
			<MoviesContainer />
		</div>
	)
}

export default Sidebar
