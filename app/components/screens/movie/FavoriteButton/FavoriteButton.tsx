import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'
import { FC, useEffect, useState } from 'react'

import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

import { useFavorites } from '../../favorites/useFavorites'

import s from './FavoriteButton.module.scss'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false)

	const { favoritesMovies, refetch } = useFavorites()

	useEffect(() => {
		if (favoritesMovies) {
			const isHasMovie = favoritesMovies.some((f) => f._id === movieId)
			if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
		}
	}, [favoritesMovies, isSmashed, movieId])

	const { mutateAsync } = useMutation(
		['update', 'movie', 'favorites'],
		() => UserService.toggleFavorite(movieId),
		{
			onError(error) {
				toastrError(error, 'Update favorite list')
			},
			onSuccess() {
				setIsSmashed(!isSmashed)
				refetch()
			},
		}
	)

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(s.button, {
				[s.animate]: isSmashed,
			})}
			style={{ backgroundImage: `url('/heart-animation.png')` }}
		/>
	)
}

export default FavoriteButton
