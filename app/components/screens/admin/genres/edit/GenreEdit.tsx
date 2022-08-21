import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import AdminNavigatoin from '@/ui/admin-navigation/AdminNav'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import SlugField from '@/ui/form-elements/SlugField/SlugField'
import Heading from '@/ui/heading/Heading'
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader'

import s from '@/shared/admin/adminForm.module.scss'

import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'

const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{
		ssr: false,
	}
)

const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	})
	const { isLoading, onSubmit } = useGenreEdit(setValue)
	return (
		<Meta title="Edit genre">
			<AdminNavigatoin />
			<Heading title="Edit genre" />
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
							style={{ width: '31%' }}
						/>
						<div style={{ width: '31%' }}>
							<SlugField
								generate={() =>
									setValue('slug', generateSlug(getValues('name')))
								}
								register={register}
								error={errors.slug}
							/>
						</div>
						<Field
							{...register('icon', {
								required: 'Icon is required',
							})}
							placeholder="Icon"
							error={errors.icon}
							style={{ width: '31%' }}
						/>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<DynamicTextEditor
									placeholder="Description"
									onChange={onChange}
									error={error}
									value={value}
								/>
							)}
							rules={{
								validate: {
									required: (v) =>
										(v && stripHtml(v).result.length > 0) ||
										'Description is required!',
								},
							}}
						/>
					</div>
					<Button>Update</Button>
				</form>
			)}
		</Meta>
	)
}
export default GenreEdit
