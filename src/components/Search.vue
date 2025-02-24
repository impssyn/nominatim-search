<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { searchNominatim } from '@/api/nominatim'
import ResultItem from '@/components/ResultItem.vue'
import { useSearchStore } from '@/stores/useSearchStore'

import { DEBOUNCE_DELAY_MS } from '@/consts/nominatim'
import { debounce } from '@/helpers/debounce'

import styles from './Search.module.scss'

const store = useSearchStore()
const searchInput = ref(store.query)
const isLoading = ref(false)
const isTyping = ref(false)

const performSearch = debounce(async () => {
	if (!searchInput.value.trim()) {
		store.setResults([])
		isTyping.value = false
		isLoading.value = false
		return
	}

	isTyping.value = false
	isLoading.value = true

	const results = await searchNominatim(searchInput.value)
	store.setResults(results)

	isLoading.value = false
}, DEBOUNCE_DELAY_MS)

watch(searchInput, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		isTyping.value = true
		isLoading.value = false
		store.setResults([])
	}
	store.setQuery(newValue)
	performSearch()
})

const showLoader = computed(() => isTyping.value || isLoading.value)
const hasNoResults = computed(
	() =>
		!showLoader.value && store.results.length === 0 && searchInput.value.trim(),
)
</script>

<template>
	<div :class="styles.container">
		<input
			v-model="searchInput"
			type="text"
			:class="styles.input"
			placeholder="Введите запрос"
		/>
		<div v-if="showLoader" :class="styles.loader">
			<svg viewBox="0 0 50 50">
				<circle cx="25" cy="25" r="20" :class="styles.background" />
				<circle cx="25" cy="25" r="20" :class="styles.spinner" />
			</svg>
		</div>
		<p v-if="hasNoResults" :class="styles.noResults">Ничего не найдено</p>
		<ul v-if="store.results.length" :class="styles.list">
			<ResultItem
				v-for="result in store.results"
				:key="result.place_id"
				:result="result"
				@select="store.setSelectedLocation"
			/>
		</ul>
	</div>
</template>
