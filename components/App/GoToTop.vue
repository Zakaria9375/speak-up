<script setup>
	const showButton = ref(false);
	const checkScroll = () => {
		const scrolledHeight = window.scrollY;
		const windowHeight = window.innerHeight;
		showButton.value = scrolledHeight > 1.2 * windowHeight;
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	onMounted(() => {
		window.addEventListener("scroll", checkScroll);
	});

	onUnmounted(() => {
		window.removeEventListener("scroll", checkScroll);
	});
</script>

<template>
	<button
		title="go to top"
		v-if="showButton"
		@click="scrollToTop"
		class="go-to-top"
	>
		<fai icon="chevron-up" class="fa-icon"></fai>
	</button>
</template>

<style lang="scss">
	.go-to-top {
		position: fixed;
		bottom: 90px;
		right: 30px;
		border: none;
		border-radius: 50%;
		background-color: $bluclr;
		cursor: pointer;
		padding: 12px;
		.fa-icon {
			width: 32px;
			height: 32px;
			color: #fff;
		}
	}
</style>
