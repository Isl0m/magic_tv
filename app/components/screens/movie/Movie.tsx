import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { FC, useEffect } from 'react'

import Banner from '@/ui/banner/Banner'
import SwiperGallery from '@/ui/gallery/SwiperGallery'
import SubHeading from '@/ui/heading/SubHeading'

import { MovieService } from '@/services/movie.service'

import Meta from '@/utils/meta/Meta'

import Content from './Content/Content'
import { IMoviePage } from './movie.interface'

const DynamicPlayer = dynamic(() => import('@/ui/video-player/VideoPlayer'), {
	ssr: false,
})

const DynamicRating = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false,
})

const Movie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	const { mutateAsync } = useMutation(['update', ' actor'], () =>
		MovieService.updateCountOpened(movie.slug)
	)
	useEffect(() => {
		mutateAsync()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				imagePath={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<DynamicPlayer slug={movie.slug} videoSource={movie.videoUrl} />

			<div className="mt-12">
				<SubHeading title="Sidebar" />
				<SwiperGallery items={similarMovies} />
			</div>
			<DynamicRating movieId={movie._id} slug={movie.slug} />
		</Meta>
	)
}
export default Movie
