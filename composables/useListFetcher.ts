import { Query } from "appwrite";

export async function useListFetcher(
	parent: Ref<any>,
	child: Ref<any>,
	colId1: string,
	docId1: string,
	colId2: string,
	startAt: number,
	channels: Ref<string[] | undefined>
) {
	const isLoading = ref(false);
	const isReady = ref(false);
	const error = ref<any>(null);
	const appWrite = useAppWrite();

	async function fetchData(startAt: number) {
		const query = ref([
			Query.equal(`${colId1.slice(0, -1)}Id`, docId1),
			Query.limit(10),
			Query.offset(startAt),
		]);
		const parentOperation = await appWrite.databases.getDocument(
			"appData",
			colId1,
			docId1
		);
		parent.value = parentOperation;
		const childOperation = await appWrite.databases.listDocuments(
			"appData",
			colId2,
			query.value
		);
		child.value = childOperation.documents;
		getChannels(parentOperation);
	}

	function getChannels(parent: any) {
		channels.value = parent.posts.map(
			($id: string) =>
				`databases.appData.collections.${colId2}.documents.${$id}`
		);
		channels.value?.push(
			`databases.appData.collections.${colId1}.documents.${docId1}`
		);
	}

	async function execute() {
		try {
			isReady.value = false;
			isLoading.value = true;
			await fetchData(startAt);
			isReady.value = true;
		} catch (err) {
			console.log(
				`🔌 ${colId1.slice(0, -1)} ${docId1} 👨‍👧‍👦 ${colId2}  - 👁️📑📑 →→ ❌`,
				err
			);
			error.value = err;
		} finally {
			isLoading.value = false;
		}
	}
	await execute();

	return {
		isReady,
		isLoading,
		error,
		channels,
		fetchData,
	};
}
