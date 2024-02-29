<script setup>
	const isReady = ref(false);
	function display() {
		isReady.value = true;
	}
document.cookie = "name=third-party; domain=.speak-up.zaportfolio.com; path=/; Secure; SameSite=None; Partitioned";
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
