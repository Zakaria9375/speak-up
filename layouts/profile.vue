<script setup>
	const isReady = ref(false);
	function display() {
		isReady.value = true;
	}
</script>
<template>
	<div>
		<NuxtLoadingIndicator  color="#0284c7" :height="4"/>
		<AppHeader />
		<div class="control">
			<slot></slot>
		</div>
		<LazyAppNotification />
		<AppFooter />
	</div>
</template>
