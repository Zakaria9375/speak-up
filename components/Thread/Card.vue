<script lang="ts" setup>
	const { thread } = defineProps({
		thread: { type: Object, required: true },
		onlineDisplay: { required: false, type: Boolean, default: true },
	});
</script>
<template>
	<div class="all">
		<div class="t-title">
			<h1 class="list-title">{{ thread.title }}</h1>
		</div>
		<div class="post firstPostStyle">
			<div class="post-detail">
				<div class="u-info">
					<nuxt-link
						:to="`/dashboard/profile/${thread.madeBy?.$id}`"
						class="user"
					>
						<img
							class="xxavatar"
							:src="thread.madeBy?.avatar"
							alt="post.madeBy.username"
						/>
						<div class="user-n">
							<span
								v-if="thread.madeBy?.isActive && onlineDisplay"
								class="online"
								><img
									class="online"
									src="/static/online.png"
									alt="online" /></span
							>{{ thread.madeBy?.name }}
						</div>
					</nuxt-link>
				</div>
				<p class="p-content">{{ thread.content }}</p>
			</div>
			<div class="date">
				<BaseDate :isoTimestamp="thread.$createdAt" />
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.firstPostStyle {
		border: 1px solid #000;
		border-top-right-radius: 0 !important;
		border-top-left-radius: 0 !important;
	}
</style>
