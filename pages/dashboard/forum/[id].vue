<script lang="ts" setup>
	definePageMeta({
		layout: "dashboard",
	});
	const route = useRoute();
	const id = ref<string>(route.params.id as string);
	const events = [
		"databases.appData.collections.threads.documents",
		`databases.appData.collections.forums.documents.${id}`,
	];
	const {
		response: forum,
		isReady,
		isLoading,
		error,
		reexecute,
	} = await useDocFetcher("forums", id.value);
	onMounted(() => {
		const appWrite = useAppWrite();
		appWrite.client.subscribe(events, () => {
			reexecute();
		});
	});
</script>

<template>
	<div v-if="forum" class="forum-page z-page z-clr p-16">
		<div class="fcc">
			<div class="f-header">
				<div class="f-details">
					<h1>{{ forum.name }}</h1>
					<p>
						{{ forum.description }}
					</p>
				</div>
				<nuxt-link
					:to="`/dashboard/forum/create-thread/${forum.$id}`"
					class="zbtn"
				>
					Start a thread
				</nuxt-link>
			</div>
			<ThreadList v-if="forum.threads" :threads="forum.threads" />
		</div>
	</div>
</template>

<style lang="scss">
	.forum-page {
		.f-header {
			padding: 16px;
			@include zflex(row, wrap, space-between, center);
			@include less($mS) {
				flex-direction: column-reverse;
			}
			.f-details {
				h1 {
					@include zfont(2rem, 600, $darkblue);
					margin: 16px;
					font-family: "Merriweather", serif;
					text-transform: capitalize;
				}
				p {
					@include zfont(1.375rem, 400, $graclr);
					margin: 16px 8px 8px;
				}
			}
		}
	}
</style>
