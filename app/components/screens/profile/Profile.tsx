import { FC } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/ui/form-elements/Button'
import Heading from '@/ui/heading/Heading'
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader'

import Meta from '@/utils/meta/Meta'

import AuthFields from '../auth/AuthFields'

import s from './Profile.module.scss'
import { IProfileInput } from './profile.interface'
import { useProfile } from './useProfile'

const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({ mode: 'onChange' })
	const { isLoading, onSubmit } = useProfile(setValue)
	return (
		<Meta title="Profile">
			<Heading title="Profile" />
			<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					//@ts-ignore
					<AuthFields formState={formState} register={register} />
				)}
				<Button>Update</Button>
			</form>
		</Meta>
	)
}
export default Profile
