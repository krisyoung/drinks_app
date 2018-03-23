export const compose = (...args) => firstArg => args
	.reverse()
	.reduce((res, fn) => fn(res), firstArg)
