import { FC } from 'react'

import s from './AdminNav.module.scss'
import AdminNavItem from './AdminNavItem'
import { navItems } from './admin-nav.data'

const AdminNav: FC = () => {
	return (
		<nav className={s.nav}>
			<ul>
				{navItems.map((item) => (
					<AdminNavItem key={item.link} item={item} />
				))}
			</ul>
		</nav>
	)
}

export default AdminNav
