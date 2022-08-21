import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import s from './AdminNav.module.scss'
import { INavItem } from './admin-nav.interface'

const AdminNavItem: FC<{ item: INavItem }> = ({ item: { title, link } }) => {
	const { asPath } = useRouter()
	return (
		<li>
			<Link href={link}>
				<a
					className={cn({
						[s.active]: asPath === link,
					})}
				>
					{title}
				</a>
			</Link>
		</li>
	)
}

export default AdminNavItem
