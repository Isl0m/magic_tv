import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { IGalleryItem } from './gallery.interface'

const SwiperGallery: FC<{ items: IGalleryItem[] }> = ({ items }) => {
	return (
		<Swiper slidesPerView="auto" spaceBetween={16}>
			{items.map((item) => (
				<SwiperSlide key={item.url}>
					<Link href={item.url}>
						<a
							className={cn('item', {
								['withText']: item.content,
							})}
						>
							<Image
								alt={item.name}
								src={item.posterPath}
								layout="fill"
								draggable={false}
								priority
							/>
							{item.content && (
								<div className="content">
									<div className="title">{item.content.title}</div>
									{item.content.subTitle && (
										<div className="subTitle"> {item.content.subTitle}</div>
									)}
								</div>
							)}
						</a>
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
export default SwiperGallery
