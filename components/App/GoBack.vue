<script lang="ts" setup>
	const el = ref<HTMLElement | null>(null);
	const { width, height } = useWindowSize();
	const { x, y, style } = useDraggable(el, {
		initialValue: {
			x: width.value - width.value * 0.99 ,
			y: height.value - height.value * 0.01 - 65,
		},
	});
	// const { x, y, style } = useDraggable(el, {
	// 	initialValue: {
	// 		x: 225,
	// 		y: 75,
	// 	},
	// });
</script>

<template>
	<div ref="el" :style="style" class="go-back">
		<button @click="$router.go(-1)" type="button" class="back-btn">
			<fai icon="arrow-left-long" />
			<span>Go back</span>
		</button>
	</div>
</template>

<style lang="scss">
	.go-back {
		position: fixed;
		margin: 16px;
		cursor: grab;
		z-index: 9998;
		.back-btn {
			z-index: 9999;
			@include zbtn(#ffffff, 12px 28px);
			@include zfont(1.125rem, 400, $dark);
			box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
				rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
				cursor: move;
			span {
				margin-left: 8px;
				display: none;
				
			}
			&:hover {
				span {
					display: inline;
				}
			}
		}
	}
</style>
