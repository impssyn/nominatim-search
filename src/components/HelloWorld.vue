<script setup lang="ts">
import c from './helloWorld.module.scss'

defineProps<{ msg: string }>()
</script>

<template>
	<h1 :class="c.header">{{ msg }}</h1>
	<button>Кнопка</button>
	<input type="text" />
</template>
