<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
const {height} = useWindowSize()
const h = computed(()=> `${height.value}px`)
const emit = defineEmits(['close'])
function close() {
	emit('close')
} 
</script>
<template>
	<div class="overlay">
		<div class="bg" v-on-click-outside="close">
			<div class="pop-head">
				<button class="btnClose" @click="close">
					<fai icon="xmark" class="fa-icon"/>
				</button>
			</div>
			<slot></slot>
		</div>
	</div>
</template>
<style lang="scss">
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 11;
	background-color: rgba(0, 0, 0, 0.5);
	@include zflex;
	overflow: auto;
	.bg {
		max-width: $lS;
		width: 100%;
		background-color: #fff;
		padding: 16px;
		border-radius: 8px;
		margin: 54px 16px 16px;
		
		.pop-head {
			@include zflex;
			justify-content: flex-end;
			max-height: v-bind(h);
			
			.btnClose {
				border: none;
				background: none;
				cursor: pointer;
				@include zflex;
				.fa-icon {
					font-size: 1.5rem;
					color: $graclr;
					border: none;
					border-radius: 50%;
				}
			}
		}
	}
}
</style>
