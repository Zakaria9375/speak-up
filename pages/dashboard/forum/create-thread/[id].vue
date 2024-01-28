<script lang="ts" setup>
	definePageMeta({
		layout: "dashboard",
	});
	const router = useRouter();
	const route = useRoute();
	const id = ref<string>(route.params.id as string);
	const dataStore = useDataStore();
	const authUser = computed(() => useAuthStore().authUser);
	const {
		response: forum,
		isReady,
		isLoading,
		error,
	} = await useDocFetcher("forums", id.value);
	async function save(data: { title: string; content: string }) {
		const newThread = {
			forum: id.value,
			title: data.title,
			content: data.content,
			madeBy: authUser.value?.$id,
		};
		// console.log(data);
		// console.log(newThread);
		await dataStore.createThread(newThread);
	}

	function cancel() {
		router.push(`/dashboard/forum/${id.value}`);
	}
</script>

<template>
	<div v-if="forum" class="newthread-page z-clr z-page p-48">
		<div class="heading">
			<h1>{{ forum.name }}</h1>
			<h2>Create new thread</h2>
		</div>
		<ThreadEditor btn-submit="Create" @save="save" @cancel="cancel" />
	</div>
</template>
<style lang="scss">
	.newthread-page {
		padding-left: 16px;
		padding-right: 16px;
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
