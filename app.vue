<script lang="ts" setup>
	const authStore = useAuthStore();
	authStore.checkIfStillLoggedIn();
</script>
<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
