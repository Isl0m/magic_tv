import cn from 'classnames'
import { forwardRef } from 'react'

import s from './Form.module.scss'
import { IField } from './form.interface'

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={cn(s.common, s.field)} style={style}>
				<label>
					<span>{placeholder}</span>
					<input ref={ref} type={type} {...rest} />
				</label>
				{error && <div className={s.error}>{error.message}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
