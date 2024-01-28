<script setup>
	const { notis, addNoti, removeNoti } = useNotifications();
</script>
<template>
	<div class="nots">
		<TransitionGroup name="list" tag="div">
			<div class="not" :class="n.type" v-for="n in notis" :key="n.$id">
				{{ n.message }}
			</div>
		</TransitionGroup>
	</div>
</template>

<style lang="scss">
	.nots {
		position: fixed;
		bottom: 80px;
		right: 10px;
		.not {
			background: #fff;
			min-width: 280px;
			@include zfont(1.25rem, 400, $dark);
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
			padding: 12px 16px;
			margin-bottom: 5px;
			
		}
		.success {
			border-left: 15px solid #227e0d;
		}
		.info {
			border-left: 15px solid #263959;
		}
		.error {
			border-left: 15px solid #b40d0d;
		}
	}
	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s ease;
	}
	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}
</style>
