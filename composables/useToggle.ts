
export function useToggle() {
	const refValue = ref(false);
	function open() {
		refValue.value = true;
	}
	function close() {
		refValue.value = false;
	}
	function toggle() {
		refValue.value = !refValue.value;
	}
	return {
		refValue,
		open,
		close,
		toggle,
	};
}
