import { FC } from 'react'

import { useFavorites } from '@/components/screens/favorites/useFavorites'

import SkeletonLoader from '@/ui/skeleton/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'

import MoviesList from '../MoviesList'

import NotAuthFavourites from './NotAuthFavourites'

const FavoriteMovieList: FC = () => {
	const { isLoading, favoritesMovies } = useFavorites()
	const { user } = useAuth()

	if (!user) return <NotAuthFavourites />

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MoviesList
			link="/favorites"
			movies={favoritesMovies?.slice(0, 3) || []}
			title="Favorites"
		/>
	)
}

export default FavoriteMovieList
