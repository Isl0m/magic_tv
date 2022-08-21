import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import SkeletonLoader from '@/ui/skeleton/SkeletonLoader'

import { MovieService } from '@/services/movie.service'

import MoviesList from '../MoviesList'

const PopularMovies: FC = () => {
	const { isLoading, data } = useQuery(
		['populat', 'movies', 'sidebar'],
		() => MovieService.getMostPopularMovies(),
		{
			select: (data) => data.slice(0, 3),
		}
	)
	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-24 mb-4" />
		</div>
	) : (
		<MoviesList link="/trending" title="Popular Movies" movies={data || []} />
	)
}

export default PopularMovies
