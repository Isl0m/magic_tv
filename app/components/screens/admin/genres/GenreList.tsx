import { FC } from 'react'

import AdminNav from '@/ui/admin-navigation/AdminNav'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useGenres } from './useGenres'

const GenreList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		createAsync,
		deleteAsync,
	} = useGenres()
	return (
		<Meta title="Genres">
			<AdminNav />
			<Heading title="Genres" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				tableItems={data || []}
				headerItems={['Name', 'Slug']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default GenreList
