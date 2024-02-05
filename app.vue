<script lang="ts" setup>
	const authStore = useAuthStore();
	authStore.checkIfStillLoggedIn();
	const isLoggedIn = computed(() => authStore.loggedIn);
	watch(isLoggedIn, () => {
		if (isLoggedIn.value) {
			authStore.getAuthUser();
		}
	});
</script>
<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
