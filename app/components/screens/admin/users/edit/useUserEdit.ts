import { useMutation, useQuery } from '@tanstack/react-query'
import { getAdminUrl } from 'config/url.config'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

import { IUserEditInput } from './user-edit.interface'

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { query, push } = useRouter()

	const userId = String(query.id)

	const { isLoading } = useQuery(
		['user', userId],
		() => UserService.getUser(userId),
		{
			onSuccess({ data }) {
				setValue('email', data.email)
				setValue('isAdmin', data.isAdmin)
			},
			onError(error) {
				toastrError(error, 'Get user')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		['update', 'user'],
		(data: IUserEditInput) => UserService.updateUser(userId, data),
		{
			onError(error) {
				toastrError(error, 'Update user')
			},
			onSuccess() {
				toastr.success('Update user', 'update was successful')
				push(getAdminUrl('users'))
			},
		}
	)

	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
