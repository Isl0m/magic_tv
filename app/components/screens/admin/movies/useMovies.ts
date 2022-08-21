import { useMutation, useQuery } from '@tanstack/react-query'
import { getAdminUrl } from 'config/url.config'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'
import { toastrError } from '@/utils/toastr-error'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['movie', 'list', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movies/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),
			onError(error) {
				toastrError(error, 'movie list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		['create', 'movie'],
		() => MovieService.create(),
		{
			onError(error) {
				toastrError(error, 'Create movie')
			},
			onSuccess({ data: _id }) {
				toastr.success('Create movie', 'create was successful')
				push(getAdminUrl(`/movies/edit/${_id}`))
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		['delete', 'movie'],
		(movieId: string) => MovieService.delete(movieId),
		{
			onError(error) {
				toastrError(error, 'Delete movie')
			},
			onSuccess() {
				toastr.success('Delete movie', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			createAsync,
			deleteAsync,
		}),
		[queryData, searchTerm, createAsync, deleteAsync]
	)
}
