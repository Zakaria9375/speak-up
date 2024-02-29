
export default defineNuxtRouteMiddleware((to, from) => {
	document.cookie = "name=third-party; domain=.speak-up.zaportfolio.com; path=/; Secure; SameSite=None; Partitioned";
});
