import { errorCatch } from 'api/api.helpers'
import { getActorUrl, getMovieUrl } from 'config/url.config'
import type { GetStaticProps, NextPage } from 'next'

import { IHome } from '@/screens/home/home.interface'

import Home from '@/components/screens/home/Home'

import { IGalleryItem } from '@/ui/gallery/gallery.interface'
import { ISlide } from '@/ui/slider/slider.interface'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'

const HomePage: NextPage<IHome> = (props) => {
	return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()
		const { data: dataActors } = await ActorService.getAll()
		const datatTrendingMovies = await MovieService.getMostPopularMovies()

		const slides: ISlide[] = movies.slice(4, 7).map((m) => ({
			_id: m._id,
			title: m.title,
			subTitle: getGenresList(m.genres.slice(0, 2)),
			bigPoster: m.bigPoster,
			link: getMovieUrl(m.slug),
		}))

		const actors: IGalleryItem[] = dataActors.slice(0, 7).map((a) => ({
			name: a.name,
			posterPath: a.photo,
			url: getActorUrl(a.slug),
			content: {
				title: a.name,
				subTitle: `+${a.countMovies} movies`,
			},
		}))

		const trendingMovies: IGalleryItem[] = datatTrendingMovies
			.slice(0, 7)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				url: getMovieUrl(m.slug),
			}))

		return {
			props: { slides, trendingMovies, actors } as IHome,
			revalidate: 60,
		}
	} catch (error) {
		console.log(errorCatch(error))

		return {
			props: {
				slides: [],
				trendingMovies: [],
				actors: [],
			},
		}
	}
}

export default HomePage
