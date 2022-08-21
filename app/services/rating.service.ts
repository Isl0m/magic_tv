import axios from 'api/interceptors'
import { getRatingsUrl } from 'config/api.config'

export const RatingService = {
	async getByUserMovie(movieId: string) {
		return axios.get<number>(getRatingsUrl(`/${movieId}`))
	},

	async setRating(movieId: string, value: number) {
		return axios.post<string>(getRatingsUrl(`/set-rating`), {
			movieId,
			value,
		})
	},
}
