import SkeletonLoader from '@/components/ui/skeleton/SkeletonLoader'
import { FC } from 'react'
import Menu from '../Menu'
import { usePopularGenres } from './usePopularGenres'

const GenreMenu: FC = () => {
	const { isLoading, data } = usePopularGenres()
	return isLoading ? <div className='mx-8 mb-6'><SkeletonLoader count={4} className='h-5 mt-4 w-40' /></div> : <Menu menu={{ title: 'Popular genres', items: data || [] }} />
}

export default GenreMenu
