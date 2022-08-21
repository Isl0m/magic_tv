import { useMutation, useQuery } from '@tanstack/react-query'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

import { IProfileInput } from './profile.interface'

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const { isLoading } = useQuery(
		['user', 'profile'],
		() => UserService.getProfile(),
		{
			onSuccess({ data }) {
				setValue('email', data.email)
			},
			onError(error) {
				toastrError(error, 'Get profile')
			},
		}
	)

	const { mutateAsync } = useMutation(
		['update', 'profile'],
		(data: IProfileInput) => UserService.updateProfile(data),
		{
			onError(error) {
				toastrError(error, 'Update profile')
			},
			onSuccess() {
				toastr.success('Update profile', 'update was successful')
			},
		}
	)

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
