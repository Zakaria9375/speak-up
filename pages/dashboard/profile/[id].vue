<script lang="ts" setup>
	definePageMeta({
		layout: "profile",
	});
	const route = useRoute();
	const id = ref<string>(route.params.id as string);
</script>

<template>
		<div class="profile-page z-page">
			<div class="container pb-16">
				<ProfileMain :id="id" />
				<ProfileRecentActivity :id="id" />
			</div>
		</div>
		<AppGoToTop/>
</template>
<style lang="scss">
	.profile-page {
		background-color: $web;
		.container {
			@include more($lS) {
				@include zflex(row, nowrap, center, flex-start);
				gap: 3%;
			}
			@include less($lS) {
				@include zflex(column, wrap, center, center);
			}
		}
	}
</style>
