const createBarsAPIService = () => ({
	getAll: () => Promise.all([
			fetch('/data/bars.json').then(res => res.json()),
			fetch('/data/prices.json').then(res => res.json())
		])
		.then(([{ data: bars }, { data: prices }]) => ({
			data: bars.reduce((res, bar) => {
				const price_list = prices
					.filter(x => x.barId === bar.id)
					.reduce((list, { productId, currentPrice }) =>
						Object.assign(list, { [productId]: currentPrice })
					, {})
				return res.concat([{ ...bar, price_list }])
			}, [])
		}))
})

export default createBarsAPIService
