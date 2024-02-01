<script lang="ts" setup>
	const { threads } = defineProps({
		threads: {
			type: Array<Thread>,
			required: true,
		},
	});
		const shortTitle = (title: string) => {
		const maxLength = 45;
		const ending = "...";
		if (title && title.length > maxLength) {
			return title.substring(0, maxLength) + ending;
		}
		return title;
	};
</script>

<template>
	<div class="thread-item">
		<div class="thread-list">
			<h2 class="list-title">Threads</h2>
			<div v-if="threads.length" v-for="thread in threads" :key="thread.$id" class="thread g-listing">
				<div class="g-details flex">
					<nuxt-link :to="`/dashboard/thread/${thread.$id}`">
						{{ shortTitle(thread.title) }}
					</nuxt-link>
					<p class="replies">{{ thread.posts.length}} replies</p>
				</div>

				<div class="madeBy noneSS">
					<img
						class="xavatar"
						:src="thread.madeBy.avatar"
						alt="thread.madeBy.username"
					/>
					<div class="g-detail">
						<nuxt-link
							:to="`/dashboard/profile/${thread.madeBy.$id}`"
							>{{ thread.madeBy.name }}</nuxt-link
						>
						<p>
							<BaseDate :isoTimestamp="thread.$createdAt" />
						</p>
					</div>
				</div>
			</div>
			<div v-else class="thread g-listing">
				<p class="no-thread">Be the first one to create a thread in this forum</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.thread-item {
		.thread-list {
			.thread {
				.flex {
					flex-grow: 1;
					@include zflex(row, wrap, space-between, center);
					row-gap: 10px;
					.replies {
						@include zfont(1.125rem, 300, $dark);
						margin: 0;
					}
				}
				.madeBy {
					flex-basis: 40%;
					@include more($smS) {
						@include zflex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
	.no-thread {
		@include zfont(1.375rem, 400, $dark)
	}
</style>
