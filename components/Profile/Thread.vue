<script lang="ts" setup>
	const { thread } = defineProps({
		thread: { type: Object, required: true },
	});
</script>
<template>
	<div class="thread-view">
		<nuxt-link
			:to="`/dashboard/thread/${thread?.$id}`"
			class="thread-link"
			title="Visit the thread"
			><fai class="fa-icon" icon="up-right-from-square"></fai></nuxt-link
		><ThreadCard :onlineDisplay="false" :thread="thread" />
	</div>
</template>
<style lang="scss">
	.thread-view {
		position: relative;
		.thread-link {
			position: absolute;
			right: 15px;
			top: 65px;
			z-index: 3;
			.fa-icon {
				font-size: 1.25rem;
				color: $darkblue;
				cursor: pointer;
				&:hover {
					font-size: 1.325rem;
				}
			}
		}
	}
</style>
