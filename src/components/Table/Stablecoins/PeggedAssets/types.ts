interface IAsset {
	chains: Array<String>
	change_1d: number
	change_7d: number
	change_1m: number
	change_1d_nol: string | null
	change_7d_nol: string | null
	change_1m_nol: string | null
	circulating: number
	circulatingPrevDay: number
	circulatingPrevMonth: number
	circulatingPrevWeek: number
	depeggedTwoPercent: boolean
	floatingPeg: boolean
	gecko_id: string
	mcap: number
	name: string
	pegDeviation?: number
	pegDeviation_1m?: number
	pegMechanism?: string
	pegType?: string
	price: number
	symbol: string
	unreleased: number
	pegDeviationInfo?: {
		timestamp: number
		price: number
		priceSource: number
	}
}

export interface IPeggedAssetsRow extends IAsset {
	subRows?: Array<IAsset>
}
