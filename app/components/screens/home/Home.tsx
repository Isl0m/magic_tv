import { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'

import SwiperGallery from '@/ui/gallery/SwiperGallery'
import SubHeading from '@/ui/heading/SubHeading'
import Slider from '@/ui/slider/Slider'

import Meta from '@/utils/meta/Meta'

import { IHome } from './home.interface'

const Home: FC<IHome> = ({ slides, trendingMovies, actors }) => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch MovieApp movies and TV shows online or stream right to your browser."
		>
			<Heading
				title="Watch movies online"
				className="text-gray-300 mb-8 text-xl"
			/>
			{slides?.length && <Slider slides={slides} />}

			<div className="my-10">
				<SubHeading title="Trending now" />
				{trendingMovies.length && <SwiperGallery items={trendingMovies} />}

				<div>
					<SubHeading title="Best actors" />
					{actors.length && <SwiperGallery items={actors} />}
				</div>
			</div>
		</Meta>
	)
}

export default Home
