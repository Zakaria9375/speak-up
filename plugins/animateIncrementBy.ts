export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("zanimate", {
		mounted(el, binding) {
			let animationStarted = false;
			let startTime: number | null = null;
			const { fv } = binding.value;
			const totalDuration = 1250;
			let currentValue = 0;
			const finalValue = parseInt(fv, 10);

			const linear = (timeFraction: number) => timeFraction;

			const animateValue = (timestamp: any) => {
				if (!startTime) startTime = timestamp;
				if (startTime) {
					const timeElapsed = timestamp - startTime;
					const timeFraction = Math.min(timeElapsed / totalDuration, 1);
					const progress = linear(timeFraction);
					currentValue = progress * finalValue;

					if (currentValue > finalValue) currentValue = finalValue;

					el.innerHTML = Math.floor(currentValue).toString();

					if (timeElapsed < totalDuration) {
						requestAnimationFrame(animateValue);
					} else {
					}
				}
			};

			const handleScroll = () => {
				const elementTop = el.getBoundingClientRect().top;
				const viewportHeight = window.innerHeight;
				if (elementTop <= viewportHeight * 0.8) {
					if (!animationStarted) {
						animationStarted = true;
						requestAnimationFrame(animateValue);
					}
				} else if (elementTop > viewportHeight ) {
					animationStarted = false;
					startTime = null;
				}
			};

			window.addEventListener("scroll", handleScroll);
			el._handleScroll = handleScroll;
		},
		unmounted(el) {
			if (el._handleScroll) {
				window.removeEventListener("scroll", el._handleScroll);
			}
		},
	});
});
