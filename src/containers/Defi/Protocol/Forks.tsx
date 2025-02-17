import { useQuery } from '@tanstack/react-query'
import { getForkPageData } from '~/api/categories/protocols'
import { ForkContainer } from '~/containers/Forks'

export function ForksData({ protocolName }: { protocolName: string }) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['forks', protocolName],
		queryFn: () =>
			getForkPageData(protocolName).then((data) => ({
				chartData: data.props.chartData,
				tokenLinks: [],
				token: data.props.token,
				filteredProtocols: data.props.filteredProtocols,
				parentTokens: []
			})),
		staleTime: 60 * 60 * 1000
	})

	if (isLoading) {
		return <p className="my-[180px] text-center">Loading...</p>
	}

	if (error) {
		return <p className="my-[180px] text-center">{JSON.stringify(error)}</p>
	}

	return (
		<div className="min-h-[460px]">
			<ForkContainer {...data} />
		</div>
	)
}
