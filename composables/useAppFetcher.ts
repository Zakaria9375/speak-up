
export async function useAppFetcher(
	promFunction: Promise<any>,
	// refresher?: Ref,
	emsg: string = "🔗❌"
) {
	const response = ref<any>(null);
	const isLoading = ref(false);
	const isReady = ref(false);
	const error = ref<any>(null);

	async function execute() {
		try {
			isReady.value = false;
			isLoading.value = true;
			const data = await promFunction;
			response.value = data;
			isReady.value = true;
			
		} catch (err) {
			console.log(emsg, err);
			error.value = err;
		} finally {
			isLoading.value = false;
		}
	}

	// if (refresher) {
	// 	watch(refresher, () => execute());
	// }

	await execute(); 
	// console.log(response.value);
	return { response, isReady, isLoading, error };
}
