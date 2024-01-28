<script setup lang="ts">
	const searchTerms = [
		"cats",
		"dogs",
		"mountains",
		"flowers",
		"food",
		"lake",
		"sunset",
		"river",
		"nature",
		"wolf",
		"fruit",
		"ai generated",
		"bird",
		"dragon",
		"kid",
		"girl",
		"library",
		"plane",
		"winter",
		"skyscraper",
		"building",
		"trees",
		"dessert",
		"woman",
	];
	const emit = defineEmits(["hit"]);

	const getRandom = (arr: any[]) => {
		const r = Math.floor(Math.random() * arr.length);
		return arr[r];
	};
	
	async function changeAvatar() {
		const r = getRandom(searchTerms);
		const url = `https://pixabay.com/api/?key=14321378-74544a638996ce4d6cbd4ac5a&q=${r}`;
		const { data } = await useFetch(url);
		const randomImg = getRandom(data.value.hits);
		emit("hit", randomImg);
	}
</script>
<template>
	<div class="r-avatar">
		<button type="button" @click="changeAvatar" class="av-btn">
			Choose Random Avatar
		</button>
		<small
			>Powered by <NuxtLink to="https://pixabay.com">Pixabay</NuxtLink>
		</small>
	</div>
</template>
<style lang="scss">
	.r-avatar {
		margin: 8px 4px 16px;
		@include zflex(row, wrap, flex-start, flex-end);
		gap: 8px;
		.av-btn {
			cursor: pointer;
			text-align: center;
			border: 1px solid #babfc3;
			padding: 11px 24px;
			min-height: 44px;
			min-width: 44px;
			color: #202223;
			background: #ffffff;
			border-radius: 4px;
			font-weight: 500;
			font-size: 14px;
			box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px;
			&:hover {
				background-color: #f6f6f7;
				outline: 1px solid transparent;
			}
		}
		small {
			opacity: 0.5;
			a {
				color: $bluhclr;
			}
		}
	}
</style>
