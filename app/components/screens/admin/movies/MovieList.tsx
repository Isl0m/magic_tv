import { FC } from 'react'

import AdminNav from '@/ui/admin-navigation/AdminNav'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useMovies } from './useMovies'

const MovieList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		createAsync,
		deleteAsync,
	} = useMovies()
	return (
		<Meta title="Movies">
			<AdminNav />
			<Heading title="Movies" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				tableItems={data || []}
				headerItems={['Title', 'Genres', 'Rating']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default MovieList
