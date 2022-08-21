import { getGenreUrl } from 'config/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import CollectionImage from './CollectionImage'
import s from './Collections.module.scss'
import { ICollection } from './collections.interface'

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link href={getGenreUrl(collection.slug)}>
			<a className={s.collection}>
				<CollectionImage collection={collection} />

				<div className={s.content}>
					<div className={s.title}>{collection.title}</div>
				</div>

				<div className={`${s.behind} ${s.second}`}>
					<CollectionImage collection={collection} />
				</div>

				<div className={`${s.behind} ${s.third}`}>
					<CollectionImage collection={collection} />
				</div>
			</a>
		</Link>
	)
}

export default CollectionItem
