import { useQuery } from '@tanstack/react-query'

import { IOption } from '@/ui/select/select.interface'

import { GenreService } from '@/services/genre.service'

import { toastrError } from '@/utils/toastr-error'

export const useAdminGenres = () => {
	const queryData = useQuery(['list of genres'], () => GenreService.getAll(), {
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre._id,
				})
			),
		onError: (error) => {
			toastrError(error, 'Get genres list')
		},
	})
	return queryData
}
