import cn from 'classnames'
import { FC } from 'react'

import s from './Form.module.scss'
import { IButton } from './form.interface'

const Button: FC<IButton> = ({ children, className, ...rest }) => {
	return (
		<button className={cn(s.button, className)} {...rest}>
			{children}
		</button>
	)
}

export default Button
