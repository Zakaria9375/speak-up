<script lang="ts" setup>
const { forums, title, categoryId } = defineProps({
	forums: {
		type: Array<Forum>,
		required: true,
	},
	title: {
		type: String,
		default: 'Forums',
	},
	categoryId: {
		type: String,
		required: false,
	},
})
	const shortTitle = computed(() => {
		const maxLength = 35;
		const ending = "...";
		if (title && title.length > maxLength) {
			return title.substring(0, maxLength) + ending;
		}
		return title;
	});
</script>

<template>
	<div class="category-item">
		<div class="forum-list">
			<h2 class="list-title">
				<nuxt-link :to="`/dashboard/category/${categoryId}`">
					{{ shortTitle }}
				</nuxt-link>
			</h2>

			<div class="forum g-listing" v-for="forum in forums" :key="forum.$id">
				<div class="forum-details g-details">
					<nuxt-link :to="`/dashboard/forum/${forum.$id}`" class="forum-name">
						{{ forum.name }}
					</nuxt-link>
					<p class="">{{ forum.description }}</p>
				</div>

				<div class="threads-count noneLS">
					<p class="count">{{ forum.threads?.length }}</p>
					{{
						forum.threads?.length
							? forum.threads?.length > 1
								? 'threads'
								: 'thread'
							: 'no-threads'
					}}
				</div>
				<!-- <ThreadLast v-if="forum.threads.length > 0" class="noneMedS" :id="forum.$id" /> -->
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.category-item {
	@include zflex;
	.forum-list {
		padding: 16px;
		margin-bottom: 32px;
		max-width: $lS;
		width: 100%;
		.forum {			
			.forum-details {
				flex-shrink: 1;
				flex-basis: 50%;
				min-width: 200px;
				margin-right: 10px;
			}
			.threads-count {
				width: 65px;
				text-align: center;
				margin: 0 16px;
				.count {
					@include zfont(1.25rem, 300, $dark);
					margin: 0;
					padding-bottom: 8px;
				}
				
			}
			
		}
	}
}
</style>
