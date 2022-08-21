import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/ui/form-elements/Button'
import Heading from '@/ui/heading/Heading'

import { useActoins } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/Meta'

import s from './Auth.module.scss'
import AuthFields from './AuthFields'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

const Auth: FC = () => {
	useAuthRedirect()
	const { isLoading } = useAuth()
	const [isRegister, setIsRegister] = useState<boolean>(false)
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({ mode: 'onChange' })

	const { login, register } = useActoins()

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (isRegister) register(data)
		else login(data)

		reset()
	}
	return (
		<Meta title="Auth">
			<section className={s.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title="Auth" className="mb-6" />
					<AuthFields
						//@ts-ignore
						formState={formState}
						register={registerInput}
						isPasswordRequired
					/>
					<div className={s.buttons}>
						<Button
							type="submit"
							onClick={() => setIsRegister(false)}
							disabled={isLoading}
						>
							Login
						</Button>
						<Button
							type="submit"
							onClick={() => setIsRegister(true)}
							disabled={isLoading}
						>
							Register
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default Auth
