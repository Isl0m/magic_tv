import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'

import { AuthService } from '@/services/auth/auth.service'

import { toastrError } from '@/utils/toastr-error'

import { IAuthResponse, IEmailPassword } from './user.interface'

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const res = await AuthService.register(email, password)
			toastr.success('Registration', 'Completed succesfully')
			return res.data
		} catch (error) {
			toastrError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const res = await AuthService.login(email, password)
			toastr.success('Login', 'Completed succesfully')
			return res.data
		} catch (error) {
			toastrError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	await AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const res = await AuthService.getNewTokens()
			return res.data
		} catch (error) {
			if (toastrError(error) === 'jwt expired') {
				toastr.error(
					'Logout',
					'Yout authorization is finished, plz sign in again'
				)
				thunkApi.dispatch(logout())
			}
			return thunkApi.rejectWithValue(error)
		}
	}
)
