import { NextPage } from 'next'

import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

const Error500: NextPage = () => {
	return (
		<Meta title="Server-side error occurred">
			<Heading title="500 - Server-side error occurred" />
		</Meta>
	)
}

export default Error500
