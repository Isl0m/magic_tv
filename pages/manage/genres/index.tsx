import GenreList from '@/screens/admin/genres/GenreList'

import { NextPageAuth } from '@/shared/types/auth.types'

const GenresListPage: NextPageAuth = () => {
	return <GenreList />
}

GenresListPage.isOnlyAdmin = true

export default GenresListPage
