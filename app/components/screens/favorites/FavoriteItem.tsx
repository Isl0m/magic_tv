import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import FavoriteButton from '../movie/FavoriteButton/FavoriteButton'

import s from './Favorites.module.scss'
import { IFavoriteItem } from './favorites.interface'

const FavoriteItem: FC<{ item: IFavoriteItem }> = ({ item }) => {
	return (
		<div className={s.itemWrapper}>
			<FavoriteButton movieId={item._id} />
			<Link href={item.url}>
				<a className={s.item}>
					<Image
						alt={item.name}
						src={item.posterPath}
						layout="fill"
						draggable={false}
						priority
					/>

					<div className={s.title}>{item.title}</div>
				</a>
			</Link>
		</div>
	)
}

export default FavoriteItem
