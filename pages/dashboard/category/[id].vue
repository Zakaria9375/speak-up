<script lang="ts" setup>
	definePageMeta({
		layout: "dashboard",
	});
	const route = useRoute();
	const id = ref<string>(route.params.id as string);
	const dataStore = useDataStore();

	const category = computed(() => {
		if (dataStore.categories) {
			return dataStore.categories.find(
				(category: Category) => category.$id === id.value
			);
		} else {
			dataStore.getCategories();
			return dataStore.categories.find(
				(category: Category) => category.$id === id.value
			);
		}
	});
</script>

<template>
	<div v-if="category" class="category-page z-page p-32">
		<div class="c-details">
			<h1>{{ category.name }}</h1>
		</div>

		<ForumList v-if="category.forums" :forums="category.forums" />
	</div>
</template>

<style lang="scss">
	.category-page {
		.c-details h1 {
			text-align: center;
			@include zfont(2rem, 600, $darkblue);
			padding: 16px 0 20px;
			margin: 0;
			font-family: "Merriweather", serif;
		}
	}
</style>
