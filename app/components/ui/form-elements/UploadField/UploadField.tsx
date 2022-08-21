import cn from 'classnames'
import Image from 'next/image'
import { FC } from 'react'

import SkeletonLoader from '@/ui/skeleton/SkeletonLoader'

import { IUploadField } from '../form.interface'

import s from './UploadField.module.scss'
import { useUpload } from './useUpload'

const UploadField: FC<IUploadField> = ({
	folder,
	file,
	onChange,
	placeholder,
	error,
	style,
	isVideo = false,
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder)
	return (
		<div className={cn(s.field, s.uploadField)} style={style}>
			<div className={s.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadFile} />
					{error && <div className={s.error}>{error.message}</div>}
				</label>
				{!isVideo && (
					<div className={s.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className="w-full h-full" />
						) : (
							file && <Image src={file} alt="" layout="fill" unoptimized />
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
