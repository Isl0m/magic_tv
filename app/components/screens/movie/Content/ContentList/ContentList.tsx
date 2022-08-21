import Link from 'next/link'
import { FC, Fragment } from 'react'

import s from './ContentList.module.scss'
import { IContentList } from './content-list.interface'

const ContentList: FC<IContentList> = ({ name, links }) => {
	return (
		<div className={s.list}>
			<div className={s.name}>{name}:</div>
			<div className={s.links}>
				{links.slice(0, 3).map(({ link, title, _id }, idx) => (
					<Fragment key={_id}>
						<Link href={link}>
							<a>{title}</a>
						</Link>
						{idx + 1 !== links.length ? ', ' : ''}
					</Fragment>
				))}
			</div>
		</div>
	)
}
export default ContentList
