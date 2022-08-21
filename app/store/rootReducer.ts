import { reducer as toastrReducer } from 'react-redux-toastr'
import { UserReducer } from './user/user.slice'

export const reducers = {
	user: UserReducer,
	toastr: toastrReducer,
}
