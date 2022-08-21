import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import { FC } from 'react'

import SkeletonLoader from '@/ui/skeleton/SkeletonLoader'

import { AdminService } from '@/services/admin.service'

import s from '../Admin.module.scss'

const CountUsers: FC = () => {
	const { isLoading, data: response } = useQuery(['count', 'users'], () =>
		AdminService.getCountUsers()
	)
	return (
		<div className={cn(s.block, s.countUsers)}>
			<div>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<div className={s.number}>{response?.data}</div>
				)}
				<div className={s.description}>users</div>
			</div>
		</div>
	)
}

export default CountUsers
