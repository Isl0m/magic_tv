import { FC, memo } from 'react'

import SearchField from '@/ui/search-field/SearchField'

import s from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { data, isSuccess, handleSearch, searchTerm } = useSearch()
	return (
		<div className={s.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	)
}

export default Search
