<script lang="ts" setup>
	definePageMeta({
		layout: "dashboard",
	});
	const router = useRouter();
	const route = useRoute();
	const id = ref<string>(route.params.id as string);
	const dataStore = useDataStore();
	const {
		response: thread,
		isReady,
		isLoading,
		error,
	} = await useDocFetcher("threads", id.value);

	async function save(data: { title: string; content: string }) {
		const updatedThread = {
			title: data.title,
			content: data.content,
		};
		await dataStore.updateThread(id.value, updatedThread);
	}

	function cancel() {
		router.push(`/dashboard/thread/${id.value}`);
	}
</script>

<template>
	<div class="updateThread-page z-clr z-page p-48">
		<div v-if="thread">
			<div class="heading">
				<h1>{{ thread.title }}</h1>
				<h2>Update your thread</h2>
			</div>
			<ThreadEditor
				:title="thread.title"
				:content="thread.content"
				btn-submit="Update"
				@save="save"
				@cancel="cancel"
			/>
		</div>
	</div>
</template>
<style lang="scss">
	.updateThread-page {
		.heading {
			text-align: center;
			h1 {
				@include zfont(2.25rem, 800, $darkblue);
			}
			h2 {
				@include zfont(1.875rem, 500, #666);
			}
		}
	}
</style>
