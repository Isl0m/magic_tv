import { useMutation, useQuery } from '@tanstack/react-query'
import { getAdminUrl } from 'config/url.config'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { ActorService } from '@/services/actor.service'

import { toastrError } from '@/utils/toastr-error'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['actor', 'list', debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actors/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError(error) {
				toastrError(error, 'Actor list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		['create', 'actor'],
		() => ActorService.create(),
		{
			onError(error) {
				toastrError(error, 'Create actor')
			},
			onSuccess({ data: _id }) {
				toastr.success('Create actor', 'create was successful')
				push(getAdminUrl(`actors/edit/${_id}`))
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		['delete', 'actor'],
		(actorId: string) => ActorService.delete(actorId),
		{
			onError(error) {
				toastrError(error, 'Delete Actor')
			},
			onSuccess() {
				toastr.success('Delete Actor', 'delete was successful')
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
