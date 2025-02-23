import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
	state: () => ({
		query: '',
		results: [],
	}),
	actions: {
		setQuery(newQuery: string) {
			this.query = newQuery
		},
		setResults(newResults: []) {
			this.results = newResults
		},
	},
})
