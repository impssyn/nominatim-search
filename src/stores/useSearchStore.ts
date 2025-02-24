import { defineStore } from 'pinia'
import { ref } from 'vue'

import { type NominatimResult } from '@/types/nominatim'

export const useSearchStore = defineStore('search', () => {
	const query = ref('')
	const results = ref<NominatimResult[]>([])
	const selectedLocation = ref<NominatimResult | null>(null)
	const history = ref<string[]>([]) // Храним последние 5 запросов

	function setQuery(newQuery: string) {
		query.value = newQuery
	}

	function setResults(newResults: NominatimResult[]) {
		results.value = newResults
	}

	function setSelectedLocation(location: NominatimResult) {
		selectedLocation.value = location
	}

	function addToHistory(newQuery: string) {
		if (!history.value.includes(newQuery)) {
			history.value.unshift(newQuery)
			if (history.value.length > 5) history.value.pop() // ограничение до 5 записей
		}
	}

	return {
		query,
		results,
		selectedLocation,
		history,
		setQuery,
		setResults,
		setSelectedLocation,
		addToHistory,
	}
})
