import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Genre from '@/screens/genre/Genre'
import { IGenrePage } from '@/screens/genre/genre.interface'

import { GenreService } from '@/services/genre.service'
import { MovieService } from '@/services/movie.service'

import Error404 from '../404'

const GenrePage: NextPage<IGenrePage> = ({ genre, movies }) => {
	return genre ? <Genre genre={genre} movies={movies} /> : <Error404 />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await GenreService.getAll()
		const paths = genres.map((g) => ({
			params: { slug: g.slug },
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
		const { data: genre } = await GenreService.getBySlug(String(params?.slug))

		const { data: movies } = await MovieService.getByGenres([genre._id])

		return {
			props: { movies, genre },
			revalidate: 60,
		}
	} catch (error) {
		console.log(error)
		return {
			props: {},
		}
	}
}

export default GenrePage
