export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore();

	if (to.path.startsWith("/dashboard/") && !authStore.loggedIn) {
		return navigateTo("/auth/login");
	}
	if (to.path === "/dashboard" && !authStore.loggedIn) {
		return navigateTo("/auth/login");
	}
	if (to.path.startsWith("/auth/") && authStore.loggedIn) {
		return navigateTo("/dashboard");
	}
});
