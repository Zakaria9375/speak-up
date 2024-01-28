import { Query, ID } from "appwrite";

export const useProfileStore = defineStore("profile", () => {
	const appWrite = useAppwrite();
	const { addNoti } = useNotifications();
	async function getUser(id: string) {
		const { response, isReady, isLoading, error } = await useAppFetcher(
			appWrite.database.getDocument("appData", "users", id),
			"🍍👽🔗🤖❌ getting user"
		);
		const data = useTransform<User>(response.value, userKeys);
		return { data, isReady, isLoading, error };
	}
	async function updateBio(id: string, bio: string) {
		try {
			await appWrite.database.updateDocument("appData", "users", id, {
				bio: bio,
			});
			addNoti("Bio has been updated", "s");
		} catch (error) {
			addNoti("Failed to update Bio", "e", `${error}`);
		}
	}
	async function updateLocation(id: string, country: string) {
		try {
			await appWrite.database.updateDocument("appData", "users", id, {
				country: country,
			});
			addNoti("Location has been updated", "s");
		} catch (error) {
			addNoti("Failed to update Location", "e", `${error}`);
		}
	}
	async function updatePhoto(file: File, user: User) {
		try {
			if (user.fileId) {
				await appWrite.storage.deleteFile("appStorage", user.fileId);
			}
			const createdFile = await appWrite.storage.createFile(
				"appStorage",
				ID.unique(),
				file
			);
			const viewFile = appWrite.storage.getFileView(
				"appStorage",
				createdFile.$id
			);
			await appWrite.database.updateDocument("appData", "users", user.$id, {
				avatar: viewFile.href,
				fileId: createdFile.$id,
			});
			addNoti("Profile picture has been updated", "s");
		} catch (error) {
			addNoti("Failed to update Profile picture", "e", `${error}`);
		}
	}
	async function updateAvatar(user: User, img: string) {
		try {
			const response = await fetch(img);
			const blob = await response.blob();
			const file = new File([blob], "avatar.jpg", { type: blob.type });
			// console.log(user, file);
			updatePhoto(file, user);
		} catch (error) {
			addNoti("Failed to update Avatar", "e", `${error}`);
		}
	}
	async function getUsersList() {
		const { response, isReady, isLoading, error } = await useAppFetcher(
			appWrite.database.listDocuments("appData", "users", [Query.limit(100)]),
			"🍍👽🔗🤖❌ getting users"
		)
		const data = response.value?.documents;
		return { data, isReady, isLoading, error }; 
	}

	async function getDocsByUserId(colId: Ref<string>, userId: string) {
		const { response, isReady, isLoading, error } = await useAppFetcher(
			appWrite.database.listDocuments("appData", colId.value, [
				Query.equal("madeBy", userId),
				Query.limit(10),
			]),
			`🍍👽🔗📄❌ init from ${colId.value}`
		);
		const data = response.value?.documents;
		return { data, isReady, isLoading, error };
	}
	async function loadDocsByUserId(
		colId: Ref<string>,
		userId: string,
		lastId: Ref<string>
	) {
		const { response, isReady, isLoading, error } = await useAppFetcher(
			appWrite.database.listDocuments("appData", colId.value, [
				Query.equal("madeBy", userId),
				Query.limit(10),
				Query.cursorAfter(lastId.value),
			]),
			`🍍👽🔗🔄❌ load from ${colId.value}`
		);
		const data = response.value?.documents;
		return { data, isReady, isLoading, error };
	}
	return {
		getUser,
		updateBio,
		updatePhoto,
		updateAvatar,
		getDocsByUserId,
		loadDocsByUserId,
		getUsersList,
		updateLocation
	};
});
