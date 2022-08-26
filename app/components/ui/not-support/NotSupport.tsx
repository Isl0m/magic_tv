import { FC } from 'react'

const NotSupport: FC = () => {
	return (
		<div className="text-center mt-[35vh] p-8 text-white text-5xl">
			Your device with is not supported <br />
			<span className="text-primary text-xl">
				Please open on laptop or zoom out and reload page
			</span>
		</div>
	)
}
export default NotSupport
