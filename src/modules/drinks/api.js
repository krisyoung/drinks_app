const createDrinksAPIService = () => ({
	getAll: () =>
		fetch('/data/drinks.json')
			.then(res => res.json())
})

export default createDrinksAPIService
