import { useMutation, useQuery } from '@tanstack/react-query'
import { errorCatch } from 'api/api.helpers'
import { getAdminUrl } from 'config/url.config'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { MovieService } from '@/services/movie.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastrError } from '@/utils/toastr-error'

import { IMovieEditInput } from './movie-edit.interface'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { query, push } = useRouter()

	const moviesId = String(query.id)

	const { isLoading } = useQuery(
		['movies', moviesId],
		() => MovieService.getById(moviesId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				toastrError(error, 'Get movies')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		['movies', 'update'],
		(data: IMovieEditInput) => MovieService.update(moviesId, data),
		{
			onError(error) {
				toastrError(error, 'Update movies')
			},
			onSuccess() {
				toastr.success('Update movies', 'update was successful')
				push(getAdminUrl('movies'))
			},
		}
	)
	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
