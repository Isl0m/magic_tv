import { FC } from 'react'

import Menu from '@/components/layout/Navigation/MenuContainer/Menu'
import {
	firstMenu,
	userMenu,
} from '@/components/layout/Navigation/MenuContainer/menu.data'

import GenreMenu from './genres/GenreMenu'

const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
			<GenreMenu />
			<Menu menu={userMenu} />
		</div>
	)
}

export default MenuContainer
