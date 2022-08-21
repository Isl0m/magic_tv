import { ChangeEvent, FC, memo } from 'react'

import MaterialIcon from '../icons/MaterialIcon'

import s from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
	return (
		<div className={s.search}>
			<MaterialIcon name="MdSearch" />
			<input placeholder="Search" value={searchTerm} onChange={handleSearch} />
		</div>
	)
}

export default memo(SearchField)
