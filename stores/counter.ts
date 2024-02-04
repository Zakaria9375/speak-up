
export const useCounterStore = defineStore("counter", () => {
	const counter = ref<Counter>({
		categories: 0,
		forums: 0,
		threads: 0,
		posts: 0,
		users: 0,
	});
	const appWrite = useAppwrite();
	async function getCounts() {
		try {
			const response = await appWrite.database.getDocument(
				"appData",
				"counts",
				"allDocuments"
			);
			counter.value = useTransform<Counter>(response, counterKeys)
		} catch (error) {
			console.log("🍍❌ counter", error);
		}
	}
	return {counter, getCounts };
});
