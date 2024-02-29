import {
	Client,
	Account,
	Databases,
	Functions,
	Storage,
	Locale,
	Avatars,
} from "appwrite";

export function useAppWrite() {
	const client = new Client()
		.setEndpoint("https://appwrite.speak-up.zaportfolio.com/v1")
		.setProject("65718378450202a4f926");
	const account = new Account(client);
	const databases = new Databases(client);
	const functions = new Functions(client);
	const storage = new Storage(client);
	const locale = new Locale(client);
	const avatars = new Avatars(client);
	document.cookie =
		"name=appwrite-speakup; domain=.speak-up.zaportfolio.com; path=/; Secure; SameSite=None; Partitioned";
	function updateUserStatus(userId: string, isActive: boolean) {
		const data = { userId, isActive };
		functions
			.createExecution("658fc32f58c191e05288", JSON.stringify(data))
			.catch((error) => console.error("Error:", error));
	}
	return {
		client,
		storage,
		account,
		databases,
		locale,
		avatars,
		updateUserStatus,
	};
}
