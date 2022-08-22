import { getMovieUrl } from 'config/url.config'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Movie from '@/screens/movie/Movie'
import { IMoviePage } from '@/screens/movie/movie.interface'

import { IGalleryItem } from '@/ui/gallery/gallery.interface'

import { MovieService } from '@/services/movie.service'

import Error404 from '../404'

const MoviePage: NextPage<IMoviePage> = (props) => {
	return props.movie ? <Movie {...props} /> : <Error404 />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAll()
		const paths = movies.map((m) => ({
			params: { slug: m.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug))

		const { data: similarByGenre } = await MovieService.getByGenres(
			movie.genres.map((g) => g._id)
		)

		const similarMovies: IGalleryItem[] = similarByGenre
			.filter((m) => m._id !== movie._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				url: getMovieUrl(m.slug),
			}))

		return {
			props: { movie, similarMovies },
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default MoviePage
