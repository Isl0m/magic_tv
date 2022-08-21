import { FC } from 'react'

import AdminActions from './AdminActions/AdminActions'
import s from './AdminTable.module.scss'
import { IAdminTableItem } from './admin-table.interface'

const AdminTableItem: FC<IAdminTableItem> = ({ tableItem, removeHandler }) => {
	return (
		<div className={s.item}>
			{tableItem.items.map((item) => (
				<div key={item}>{item}</div>
			))}

			<AdminActions
				editUrl={tableItem.editUrl}
				removeHandler={() => removeHandler(tableItem._id)}
			/>
		</div>
	)
}
export default AdminTableItem
