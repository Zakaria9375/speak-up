import { ID } from "appwrite";
import { Query } from "appwrite";

export const useDataStore = defineStore("data", () => {
	const appWrite = useAppwrite();
	const categories = ref<any>([]);
	const { addNoti } = useNotifications();
	//categories
	async function getCategories() {
		try {
			const response = await appWrite.database.listDocuments(
				"appData",
				"categories"
			);

			categories.value = response.documents.map((doc) =>
				useTransform<Category>(doc, categoryKeys)
			);
			// console.log("🍍💾 - 👁️📚 →→ ✅", `${response.documents.length} 📚`);
		} catch (error) {
			console.log("🍍💾 - 👁️📚 →→ ❌", error);
		}
	}
	//lastThread
	async function getlastThread(id: string) {
		try {
			const lastThread = await appWrite.database.listDocuments(
				"appData",
				"threads",
				[
					Query.equal("forum", id),
					Query.orderDesc("$createdAt"),
					Query.limit(1),
				]
			);
			const response = lastThread.documents[0];
			return response;
		} catch (error) {
			console.log("🍍💾 - 👁️last📌 →→ ❌", error);
		}
	}
	//thread
	async function createThread(thread: any) {
		try {
			const response = await appWrite.database.createDocument(
				"appData",
				"threads",
				ID.unique(),
				{
					...thread,
				}
			);
			const router = useRouter();
			router.push(`/dashboard/thread/${response.$id}`);
			addNoti("Thread has been created 🌱📌", "s");
		} catch (error) {
			addNoti("Failed to create thread 🌱📌", "e", `${error}`);
		}
	}
	async function updateThread(id: string, updatedThread: any) {
		try {
			await appWrite.database.updateDocument("appData", "threads", id, {
				...updatedThread,
			});
			const router = useRouter();
			router.push(`/dashboard/thread/${id}`);
			addNoti("Thread has been updated ✏️📌", "s");
		} catch (error) {
			addNoti("Failed to update thread ✏️📌", "e", `${error}`);
		}
	}
	async function deleteThread(thread: Thread) {
		try {
			const posts = thread.posts.length;
			await appWrite.database.deleteDocument("appData", "threads", thread.$id);
			if (posts) {
				const relatedPosts = await appWrite.database.listDocuments(
					"appData",
					"posts",
					[Query.equal("threadId", thread.$id)]
				);
				for (const doc of relatedPosts.documents) {
					await appWrite.database.deleteDocument("appData", "posts", doc.$id);
				}
			}
			addNoti("Thread has been deleted 🗑️📌", "s");
		} catch (error) {
			addNoti("Failed to delete thread 🗑️📌", "e", `${error}`);
		}
	}
	//post
	async function findPostsOfUpdatedThread(threadId: string) {
		const updatedThread = await appWrite.database.getDocument(
			"appData",
			"threads",
			threadId
		);
		const posts = Array.isArray(updatedThread.posts)
			? [...updatedThread.posts]
			: [];
		return posts;
	}
	async function createPost(post: any, threadId: string) {
		try {
			const createdPost = await appWrite.database.createDocument(
				"appData",
				"posts",
				ID.unique(),
				{ ...post }
			);
			const posts = await findPostsOfUpdatedThread(threadId);
			posts.push(createdPost.$id);
			await appWrite.database.updateDocument("appData", "threads", threadId, {
				posts: posts,
			});
			addNoti("Post has been created 🌱📃", "s");
		} catch (error) {
			addNoti("Failed to create post 🌱📃", "e", `${error}`);
		}
	}
	async function updatePost(postId: string, content: string) {
		try {
			await appWrite.database.updateDocument("appData", "posts", postId, {
				content: content,
			});
			addNoti("Post has been updated ✏️📃", "s");
		} catch (error) {
			addNoti("Failed to update post ✏️📃", "e", `${error}`);
		}
	}
	async function deletePost(postId: string, threadId: string) {
		try {
			await appWrite.database.deleteDocument("appData", "posts", postId);
			const posts = await findPostsOfUpdatedThread(threadId);
			const newPosts = posts.filter((id) => id !== postId);
			await appWrite.database.updateDocument("appData", "threads", threadId, {
				posts: newPosts,
			});
			addNoti("Post has been deleted 🗑️📃", "s");
		} catch (error) {
			addNoti("Failed to delete post 🗑️📃", "e", `${error}`);
		}
	}
	return {
		categories,
		getCategories,
		getlastThread,
		createThread,
		updateThread,
		deleteThread,
		createPost,
		updatePost,
		deletePost,
	};
});
