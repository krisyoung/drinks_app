const formatCurrency = (value) => `£${(value/100).toFixed(2)}`
const truncateString = (len) => (str) => {
	if (!str || str.length <= len) {
		return str
	}
	return `${str.substr(0, len - 3)}...`
}

export {
	truncateString,
	formatCurrency
}
