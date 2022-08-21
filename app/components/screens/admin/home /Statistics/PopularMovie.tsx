import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import { getMovieUrl } from 'config/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import SubHeading from '@/ui/heading/SubHeading'
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import s from '../Admin.module.scss'

const PopularMovie: FC = () => {
	const { isLoading, data: movie } = useQuery(
		['most', 'popular', 'movie'],
		() => MovieService.getMostPopularMovies(),
		{
			select: (data): IMovie => data[0],
		}
	)
	return (
		<div className={cn(s.block, s.popular)}>
			<SubHeading title="The most popular movie" />
			{isLoading ? (
				<SkeletonLoader className="h-48" />
			) : (
				movie && (
					<>
						<h3>Opened {movie.countOpened} times</h3>
						<Link href={getMovieUrl(movie.slug)}>
							<a>
								<Image
									width={285}
									height={176}
									src={movie.bigPoster}
									alt={movie.title}
									className={s.image}
									unoptimized
								/>
							</a>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularMovie
