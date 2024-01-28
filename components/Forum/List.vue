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
</script>

<template>
	<div class="category-item">
		<div class="forum-list">
			<h2 class="list-title">
				<nuxt-link :to="`/dashboard/category/${categoryId}`">
					{{ title }}
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
				<ThreadLast v-if="forum.threads.length > 0" class="noneMedS" :id="forum.$id" />
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.category-item {
	.forum-list {
		padding: 16px;
		margin-bottom: 32px;
		.forum {			
			.forum-details {
				flex-shrink: 1;
			}
			.threads-count {
				width: 65px;
				text-align: center;
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
