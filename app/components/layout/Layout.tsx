import { FC, ReactNode } from 'react'

import s from './Layout.module.scss'
import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar'

interface IProps {
	children: ReactNode
}

const Layout: FC<IProps> = ({ children }) => {
	return (
		<div className={s.layout}>
			<Navigation />
			<div className={s.center}>{children}</div>
			<Sidebar />
		</div>
	)
}

export default Layout
