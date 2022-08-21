import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { RatingService } from '@/services/rating.service'

import { toastrError } from '@/utils/toastr-error'

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)

	const { user } = useAuth()

	const { refetch } = useQuery(
		['get', 'movie', 'rating', movieId],
		() => RatingService.getByUserMovie(movieId),
		{
			onSuccess({ data }) {
				setRating(data)
			},
			enabled: !!movieId && !!user,
		}
	)

	const { mutateAsync: rateMovie } = useMutation(
		['set', ' rating', ' movie', movieId],
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
			onError(error) {
				toastrError(error, 'Rate movie')
			},
			onSuccess() {
				setIsSended(true)
				refetch()

				setTimeout(() => {
					setIsSended(false)
				}, 2400)
			},
		}
	)
	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await rateMovie({ value: nextValue })
	}

	return {
		isSended,
		rating,
		handleClick,
	}
}
