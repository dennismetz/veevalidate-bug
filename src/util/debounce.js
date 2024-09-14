export function debounce(inner, ms = 500, ...options) {
	let timer = null
	let resolves = []
	let rejects = []

	const debouncedFunction = function (...args) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			const result = inner.apply(this, args)
			resolves.forEach(resolve => resolve(result))
			resolves = []
			rejects = []
		}, ms)

		return new Promise((resolve, reject) => {
			resolves.push(resolve)
			rejects.push(reject)
		})
	}

	debouncedFunction.cancel = function () {
		clearTimeout(timer)
		timer = null
		rejects.forEach(reject => reject(new Error('Debounce cancelled')))
		resolves = []
		rejects = []
	}

	return debouncedFunction
}
