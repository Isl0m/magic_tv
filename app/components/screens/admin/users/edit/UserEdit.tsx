import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import AuthFields from '@/screens/auth/AuthFields'

import AdminNavigation from '@/ui/admin-navigation/AdminNav'
import Button from '@/ui/form-elements/Button'
import Heading from '@/ui/heading/Heading'
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader'

import Meta from '@/utils/meta/Meta'

import { useUserEdit } from './useUserEdit'
import { IUserEditInput } from './user-edit.interface'

const UserEdit: FC = () => {
	const { handleSubmit, register, formState, setValue, control } =
		useForm<IUserEditInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useUserEdit(setValue)

	return (
		<Meta title="Edit user">
			<AdminNavigation />
			<Heading title="Edit user" />
			<form onSubmit={handleSubmit(onSubmit)} className="admin-form">
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<AuthFields
							register={register}
							//@ts-ignore
							formState={formState}
						/>
						<Controller
							name="isAdmin"
							control={control}
							render={({ field }) => (
								<button
									onClick={(e) => {
										e.preventDefault()
										field.onChange(!field.value)
									}}
									className="text-link block mb-7"
								>
									{field.value ? 'Make it regular user' : 'Make it admin'}
								</button>
							)}
						/>
					</>
				)}

				<Button>Update</Button>
			</form>
		</Meta>
	)
}

export default UserEdit
