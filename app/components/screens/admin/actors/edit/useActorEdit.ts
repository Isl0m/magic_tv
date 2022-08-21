import { useMutation, useQuery } from '@tanstack/react-query'
import { errorCatch } from 'api/api.helpers'
import { getAdminUrl } from 'config/url.config'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { ActorService } from '@/services/actor.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastrError } from '@/utils/toastr-error'

import { IActorEditInput } from './actor-edit.interface'

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { query, push } = useRouter()

	const actorId = String(query.id)

	const { isLoading } = useQuery(
		['actor', actorId],
		() => ActorService.getById(actorId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).map((key) => setValue(key, data[key]))
			},
			onError: (error) => {
				toastrError(error, 'Get actor')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		['actor', 'update'],
		(data: IActorEditInput) => ActorService.update(actorId, data),
		{
			onError(error) {
				toastrError(error, 'Update actor')
			},
			onSuccess() {
				toastr.success('Update actor', 'update was successful')
				push(getAdminUrl('actors'))
			},
		}
	)
	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
