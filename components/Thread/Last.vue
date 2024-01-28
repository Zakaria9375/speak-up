<script setup>
const { id } = defineProps({
	id: { type: String, required: true },
})
const dataStore = useDataStore()
const { response: lastThread, isReady, isLoading, error } = await useAppFetcher(dataStore.getlastThread(id))
</script>

<template>
	<div v-if="lastThread" class="eval">
		<span class="title">Last thread:</span>
		<div class="last-thread" v-if="lastThread">
			<nuxt-link :to="`/dashboard/profile/${lastThread.madeBy.$id}`">
				<img class="avatar" :src="lastThread.madeBy?.avatar" :alt="lastThread.madeBy?.firstName" />
			</nuxt-link>
			<div class="last-thread-details">
				<nuxt-link :to="`/dashboard/thread/${lastThread.$id}`">{{
					lastThread.title
				}}</nuxt-link>
				<p>
					By
					<nuxt-link :to="`/dashboard/profile/${lastThread.madeBy.$id}`">{{
						lastThread.madeBy?.name
					}}</nuxt-link
					>, <BaseDate v-if="lastThread.$createdAt" :isoTimestamp="lastThread.$createdAt" />
				</p>
			</div>
		</div>
		<div v-else class="last-thread">
			<p>Be the first one to create a thread</p>
		</div>
	</div>
</template>
<style lang="scss">
.eval {
	.title {
		display: block;
		padding: 0 0 8px;
	}
	flex-shrink: 0;
	.last-thread {
		@include zflex(row, nowrap, flex-start, center);
		.avatar {
			margin-right: 8px;
		}
		.last-thread-details {
			a {
				padding: 0 8px 8px 0;
				@include zfont(1.15rem, normal, $greclr);
			}
		}
		p {
			margin: 8px 8px 0 0;
		}
	}
}
</style>
