<script setup lang="ts">
import { type NominatimResult } from '@/types/nominatim'

import styles from './ResultItem.module.scss'

defineProps<{ result: NominatimResult }>()
</script>

<template>
	<li @click="$emit('select', result)" :class="styles.item">
		{{ result.display_name }}
	</li>
</template>
