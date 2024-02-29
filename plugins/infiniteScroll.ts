export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("zinfinite", {
		mounted(el, binding) {
			const options = {
				rootMargin: "0px 0px 100px 0px ",
			};

			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {

					binding.value();
				}
			}, options);

			observer.observe(el);

			el._observer = observer; 
		},
		unmounted(el) {
			if (el._observer) {
				el._observer.disconnect();
			}
		},
	});
});
