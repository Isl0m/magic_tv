import { useMutation, useQuery } from '@tanstack/react-query'
import { errorCatch } from 'api/api.helpers'
import { getAdminUrl } from 'config/url.config'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { GenreService } from '@/services/genre.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastrError } from '@/utils/toastr-error'

import { IGenreEditInput } from './genre-edit.interface'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { query, push } = useRouter()

	const genreId = String(query.id)

	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).map((key) => setValue(key, data[key]))
			},
			onError: (error) => {
				toastrError(error, 'Get genre')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		['genre', 'update'],
		(data: IGenreEditInput) => GenreService.update(genreId, data),
		{
			onError(error) {
				toastrError(error, 'Update genre')
			},
			onSuccess() {
				toastr.success('Update genre', 'update was successful')
				push(getAdminUrl('genres'))
			},
		}
	)
	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
