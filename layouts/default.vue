<script setup>
document.cookie = "name=third-party; domain=.speak-up.zaportfolio.com; path=/; Secure; SameSite=None; Partitioned";
</script>
<template>
	<div>
		<AppHeader />
		<slot></slot>
		<AppFooter />
	</div>
	<LazyAppNotification />
</template>
