<script setup>
	const { notis, addNoti, removeNoti } = useNotifications();
	const { width } = useWindowSize();
	const w = computed(() => {
		return `calc(${width}px - 50px)`;
	});
</script>
<template>
	<div class="nots">
		<TransitionGroup name="list" tag="div">
			<div class="not" :class="n.type" v-for="n in notis" :key="n.$id">

				{{ n.message }}
				<fai icon="xmark" @click="removeNoti(n.$id)" class="fa-icon"/>
			</div>
		</TransitionGroup>
	</div>
</template>

<style lang="scss">
	.nots {
		position: fixed;
		bottom: 80px;
		right: 10px;
		margin: 16px;
		max-width: 450px;
		> div {
			@include zflex(column);
			gap: 16px;
		}

		.not {
			background: #fff;
			min-width: 280px;
			position: relative;
			max-width: v-bind(w);
			@include zfont(1.25rem, 400, $dark);
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
			padding: 12px 32px 12px 16px;
			.fa-icon {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 6px;
				background-color: #f5f5f5;
				border: 0.5px solid #f1f1f1;
				padding: 4px;
				font-size: 1rem;
				box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
				cursor: pointer;
			}
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
