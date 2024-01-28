<script lang="ts" setup>
	definePageMeta({
		layout: "dashboard",
	});
	const dataStore = useDataStore();
	onMounted(() => {
		if (!dataStore.categories.value) {
			dataStore.getCategories();
		}
	});
</script>

<template>
	<div class="main-page z-page p-32">
		<div v-for="category in dataStore.categories" :key="category.$id">
			<ForumList
				v-if="category.forums"
				:forums="category.forums"
				:title="category.name"
				:categoryId="category.$id"
			></ForumList>
		</div>
	</div>
</template>
<style lang="scss">
.main-page {
	padding: 16px;
}
</style>