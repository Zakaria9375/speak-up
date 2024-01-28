<script lang="ts" setup>
	definePageMeta({
		layout: "just-footer",
	});
	const authStore = useAuthStore();
	const router = useRouter();
	const appWrite = useAppWrite();
	onMounted(async () => {
		authStore.onLoginSuccess();
		const session = await appWrite.account.getSession("current");
		// console.log(session.userId);
		const exist = await authStore.isUserRegistered(session.userId);
		// console.log(exist);
		if (exist) {
			appWrite.updateUserStatus(session.userId, true);
		} else {
			const authAccount = await appWrite.account.get();
			const locale = await appWrite.locale.get();
			const user = {
				name: authAccount.name,
				email: authAccount.email,
				isActive: true,
				country: locale.country,
			};
			await appWrite.databases.createDocument(
				"appData",
				"users",
				authAccount.$id,
				{
					...user,
				}
			);
		}
		await authStore.getAuthUser();
		setTimeout(() => router.push({ name: "dashboard" }), 1000);
	});
</script>

<template>
	<BaseLoading class="p-page" />
</template>
