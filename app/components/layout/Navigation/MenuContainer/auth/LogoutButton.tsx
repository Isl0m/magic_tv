import { FC, MouseEvent } from 'react'

import MaterialIcon from '@/ui/icons/MaterialIcon'

import { useActoins } from '@/hooks/useActions'

const LogoutButton: FC = () => {
	const { logout } = useActoins()

	const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		logout()
	}

	return (
		<li>
			<a onClick={handleLogout}>
				<MaterialIcon name="MdLogout" />
				<span> Logout </span>
			</a>
		</li>
	)
}

export default LogoutButton
