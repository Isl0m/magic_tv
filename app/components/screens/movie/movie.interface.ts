import { IGalleryItem } from '@/ui/gallery/gallery.interface'

import { IMovie } from '@/shared/types/movie.types'

export interface IMoviePage {
	movie: IMovie
	similarMovies: IGalleryItem[]
}
