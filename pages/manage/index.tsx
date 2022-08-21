import Admin from '@/screens/admin/home /Admin'

import { NextPageAuth } from '@/shared/types/auth.types'

const AuthPage: NextPageAuth = () => {
	return <Admin />
}

AuthPage.isOnlyAdmin = true

export default AuthPage
