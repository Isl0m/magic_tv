import cn from 'classnames'
import { FC } from 'react'

import MaterialIcon from '@/ui/icons/MaterialIcon'

import s from './SlideArrow.module.scss'

interface ISlideArrow {
	variant: 'left' | 'right'
	clickHandler: () => void
}

const SlideArrow: FC<ISlideArrow> = ({ variant, clickHandler }) => {
	const isLeft = variant === 'left'
	return (
		<button
			onClick={clickHandler}
			className={cn(s.arrow, {
				[s.left]: isLeft,
				[s.right]: !isLeft,
			})}
			aria-label={isLeft ? 'previous slide' : 'next slide'}
		>
			<MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
		</button>
	)
}
export default SlideArrow
