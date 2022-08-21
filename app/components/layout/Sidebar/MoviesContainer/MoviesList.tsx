import Link from 'next/link'
import { FC } from 'react'

import MovieListItem from './MovieListItem'
import s from './MoviesList.module.scss'
import { IMoviesList } from './moviesList.interface'

const MoviesList: FC<IMoviesList> = ({ title, link, movies }) => {
	return (
		<div className={s.list}>
			<div className={s.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieListItem key={movie._id} movie={movie} />
			))}
			<Link href={link}>
				<a className={s.button}>See more</a>
			</Link>
		</div>
	)
}

export default MoviesList
