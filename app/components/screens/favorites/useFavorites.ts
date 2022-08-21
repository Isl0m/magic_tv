import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/hooks/useAuth'

import { UserService } from '@/services/user.service'

export const useFavorites = () => {
	const { user } = useAuth()
	const {
		isLoading,
		data: favoritesMovies,
		refetch,
	} = useQuery(['favorite', ' movies'], () => UserService.getFavorites(), {
		select: ({ data }) => data,
		enabled: !!user,
	})

	return { isLoading, favoritesMovies, refetch }
}
