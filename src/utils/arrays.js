export function indexBy(key) {
	return (collection = []) =>
		collection.reduce((lookup, item) =>
			item[key] !== undefined
				? Object.assign(lookup, { [item[key]]: item })
				: lookup,
		{}
	)
}
