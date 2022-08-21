import { FC } from 'react'

import AdminNav from '@/ui/admin-navigation/AdminNav'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useActors } from './useActors'

const ActorList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		createAsync,
		deleteAsync,
	} = useActors()
	return (
		<Meta title="Actors">
			<AdminNav />
			<Heading title="Actors" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				tableItems={data || []}
				headerItems={['Name', 'Count movies']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default ActorList
