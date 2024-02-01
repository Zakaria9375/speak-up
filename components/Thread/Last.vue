<script setup>
	const { id } = defineProps({
		id: { type: String, required: true },
	});
	const dataStore = useDataStore();
	const {
		response: lastThread,
		isReady,
		isLoading,
		error,
	} = await useAppFetcher(dataStore.getlastThread(id));

	const shortTitle = computed(() => {
		const maxLength = 35;
		const ending = "...";
		if (lastThread.value.title && lastThread.value.title.length > maxLength) {
			return lastThread.value.title.substring(0, maxLength) + ending;
		}
		return lastThread.value.title;
	});
</script>

<template>
	<div v-if="lastThread" class="eval">
		<span class="title">Last thread:</span>
		<div class="last-thread" v-if="lastThread">
			<nuxt-link :to="`/dashboard/thread/${lastThread.$id}`">{{
				shortTitle
			}}</nuxt-link>
			<p>
				By
				<nuxt-link :to="`/dashboard/profile/${lastThread.madeBy.$id}`">{{
					lastThread.madeBy?.name
				}}</nuxt-link
				>,
				<BaseDate
					v-if="lastThread.$createdAt"
					:isoTimestamp="lastThread.$createdAt"
				/>
			</p>
		</div>
		<div v-else class="last-thread">
			<p>Be the first one to create a thread</p>
		</div>
	</div>
</template>
<style lang="scss">
	.eval {
		max-width: 350px;
		.title {
			display: block;
			padding: 0 0 8px;
		}
		flex-shrink: 1;
		flex-basis: 40%;
		.last-thread {
			margin-left: 12px;
			a {
				padding: 0 8px 8px 0;
				@include zfont(1.15rem, normal, $greclr);
			}
		}
		p {
			margin: 8px 8px 0 0;
		}
	}
</style>
