import { useQuery } from '@tanstack/react-query'

import { IOption } from '@/ui/select/select.interface'

import { ActorService } from '@/services/actor.service'

import { toastrError } from '@/utils/toastr-error'

export const useAdminActors = () => {
	const queryData = useQuery(['list of actors'], () => ActorService.getAll(), {
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id,
				})
			),
		onError: (error) => {
			toastrError(error, 'Get actors list')
		},
	})
	return queryData
}
