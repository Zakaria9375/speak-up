export async function useDocFetcher(
	colId: string,
	docId: string
	) {
	const response = ref<any>(null);
	const isLoading = ref(false);
	const isReady = ref(false);
	const error = ref<any>(null);
	const appWrite = useAppWrite();

	async function execute() {
		try {
			isReady.value = false;
			isLoading.value = true;
			response.value = await appWrite.databases.getDocument(
				"appData",
				colId,
				docId
			);
			isReady.value = true;
			// console.log(`🔌 ${colId.slice(0, -1)} ${docId} - 👁️📜 →→ ✅`);
		} catch (err) {
			console.log(`🔌 ${colId.slice(0, -1)} ${docId} - 👁️📜 →→ ❌`, err);
			error.value = err;
		} finally {
			isLoading.value = false;
		}
	}
	async function reexecute() {
		try {
			response.value = await appWrite.databases.getDocument(
				"appData",
				colId,
				docId
			);
		} catch (err) {
			console.log(`🔌 ${colId.slice(0, -1)} ${docId} - 🔊📜 →→ ❌`, err);
			error.value = err;
		}
	}
	
	execute()

	return { response, isReady, isLoading, error, reexecute };
}
