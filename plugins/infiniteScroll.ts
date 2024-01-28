export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("zis", {
		mounted(el, binding) {
			// console.log("zis Directive mounted");
			const options = {
				rootMargin: "0px 0px 100px 0px ",
			};

			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					// console.log("zis directive Intersection detected");
					binding.value(); // Call the provided method
				}
			}, options);

			observer.observe(el);

			el._observer = observer; // Store the observer for later cleanup
		},
		unmounted(el) {
			if (el._observer) {
				el._observer.disconnect(); // Cleanup observer on directive unmount
			}
		},
	});
});
