import { slug } from '~/utils'
import { withPerformanceLogging } from '~/utils/perf'
import { getProtocolOverviewPageData } from '~/containers/ProtocolOverview/queries'
import { maxAgeForNext } from '~/api'
import { ProtocolOverview } from '~/containers/ProtocolOverview'
import { IProtocolMetadata, IProtocolOverviewPageData } from '~/containers/ProtocolOverview/types'
import { PROTOCOLS_API } from '~/constants'
import { fetchJson } from '~/utils/async'

export const getStaticProps = withPerformanceLogging(
	'protocol/[...protocol]',
	async ({
		params: {
			protocol: [protocol]
		}
	}) => {
		const normalizedName = slug(protocol)
		const metadataCache = await import('~/utils/metadata').then((m) => m.default)
		const { protocolMetadata } = metadataCache
		let metadata: [string, IProtocolMetadata] | undefined
		for (const key in protocolMetadata) {
			if (slug(protocolMetadata[key].displayName) === normalizedName) {
				metadata = [key, protocolMetadata[key]]
				break
			}
		}

		if (!metadata) {
			return { notFound: true, props: null }
		}

		const data = await getProtocolOverviewPageData({
			protocolId: metadata[0],
			metadata: metadata[1]
		})

		if (!data) {
			return { notFound: true, props: null }
		}

		return { props: data, revalidate: maxAgeForNext([22]) }
	}
)
export async function getStaticPaths() {
	const res = await fetchJson(PROTOCOLS_API)

	const paths: string[] = res.protocols.slice(0, 30).map(({ name }) => ({
		params: { protocol: [slug(name)] }
	}))

	return { paths, fallback: 'blocking' }
}

export default function Protocols(props: IProtocolOverviewPageData) {
	return <ProtocolOverview {...props} />
}
