import { IGalleryItem } from '@/ui/gallery/gallery.interface'
import { ISlide } from '@/ui/slider/slider.interface'

import { IMovie } from '@/shared/types/movie.types'

export interface ISlideMovie
	extends Pick<IMovie, '_id' | 'bigPoster' | 'title' | 'genres' | 'slug'> {}

export interface IHome {
	slides: ISlide[]
	trendingMovies: IGalleryItem[]
	actors: IGalleryItem[]
}
