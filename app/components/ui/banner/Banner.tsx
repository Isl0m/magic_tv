import Image from 'next/image'
import { FC } from 'react'

import s from './Banner.module.scss'

interface IBanner {
	imagePath: string
	Detail?: FC | null
}
const Banner: FC<IBanner> = ({ imagePath, Detail }) => {
	return (
		<div className={s.banner}>
			<Image
				src={imagePath}
				draggable={false}
				layout="fill"
				className='image-like-bg object-top"'
				unoptimized
				priority
				alt="Banner"
			/>
			{Detail && <Detail />}
		</div>
	)
}
export default Banner
