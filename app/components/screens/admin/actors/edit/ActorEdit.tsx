import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import AdminNavigatoin from '@/ui/admin-navigation/AdminNav'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import SlugField from '@/ui/form-elements/SlugField/SlugField'
import UploadField from '@/ui/form-elements/UploadField/UploadField'
import Heading from '@/ui/heading/Heading'
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader'

import s from '@/shared/admin/adminForm.module.scss'

import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

import { IActorEditInput } from './actor-edit.interface'
import { useActorEdit } from './useActorEdit'

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	})
	const { isLoading, onSubmit } = useActorEdit(setValue)
	return (
		<Meta title="Edit actor">
			<AdminNavigatoin />
			<Heading title="Edit actor" />
			{isLoading ? (
				<SkeletonLoader count={3} />
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
					<div className={s.fields}>
						<Field
							{...register('name', {
								required: 'Name is required',
							})}
							placeholder="Name"
							error={errors.name}
						/>
						<SlugField
							generate={() => setValue('slug', generateSlug(getValues('name')))}
							register={register}
							error={errors.slug}
						/>

						<Controller
							name="photo"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder="Photo"
									error={error}
									folder="actors"
									file={value}
									onChange={onChange}
								/>
							)}
							rules={{
								required: 'Photo is required!',
							}}
						/>
					</div>
					<Button>Update</Button>
				</form>
			)}
		</Meta>
	)
}
export default ActorEdit
