import { ID } from "appwrite";
export const useAuthStore = defineStore("auth", () => {
	const appWrite = useAppWrite();
	const loginErr = ref(false);
	const registerErr = ref("");
	const loggedIn = useLocalStorage("loggedIn", false);
	const authId = ref("");
	const authAccount = ref<Account | null>(null);
	const authUser = ref<User | null>(null);
	function login(data: { email: string; password: string }) {
		const router = useRouter();
		loginErr.value = false;
		const loginOperation = appWrite.account.createEmailSession(
			data.email,
			data.password
		);
		loginOperation.then(
			(res) => {
				appWrite.updateUserStatus(res.userId, true);
				loggedIn.value = true;
				getAuthUser()
				router.push("/dashboard");
				// console.log("🍍🔑✅ login");
			},
			(err) => {
				loginErr.value = true;
				console.log("🍍🔑❌ login", err);
			}
		);
	}
	function logout() {
		const router = useRouter();
		const logoutOperation = appWrite.account.deleteSession("current");
		logoutOperation.then(
			() => {
				appWrite.updateUserStatus(authId.value, false);
				loggedIn.value = false;
				router.push("/auth/login");
				// console.log("🍍🔑✔️ logout");
			},
			(err) => {
				console.log("🍍🔑✖️ logout", err);
			}
		);
	}
	function onLoginSuccess() {
		loggedIn.value = true;
	}
	async function createNewUser(data: {
		email: string;
		password: string;
		name: string;
	}) {
		try {
			const router = useRouter();
			registerErr.value = ""
			const createAccount = await appWrite.account.create(
				ID.unique(),
				data.email,
				data.password,
				data.name
			);
			const locale = await appWrite.locale.get();
			
			const user = {
				name: data.name,
				email: data.email,
				country: locale.country,
			};
			await appWrite.databases.createDocument(
				"appData",
				"users",
				createAccount.$id,
				{ ...user }
			);
			router.push("/auth/login");
			// console.log("🍍👤☑️ create new user");
		} catch (error) {
			registerErr.value = `${error}`;
			console.log("🍍👤❌ create new user", error);
		}
	}
	async function getAuthUser() {
		if (loggedIn.value) {
			try {
				const getAccount = await appWrite.account.get();
				authId.value = getAccount.$id;
				authAccount.value = useTransform<Account>(getAccount, accountKeys); 
				const getUser = await appWrite.databases.getDocument(
					"appData",
					"users",
					authId.value
				);
				authUser.value = useTransform<User>(getUser, userKeys);
				// console.log("🍍👤✅ get user and account");
			} catch (error) {
				console.log("🍍👤❌ get user and account", error);
			}
		}
	}
	function deleteAccount() {
		appWrite.account.deleteIdentity(authId.value);
		appWrite.databases.deleteDocument("appData", "users", authId.value);
		logout();
	}
	async function isUserRegistered(userId: string) {
		try {
			const user = await appWrite.databases.getDocument(
				"appData",
				"users",
				userId
			);
			// console.log("🍍👤✅ user is registered", user);
			return true; // User found
		} catch (error) {
			console.log("🍍👤❌ user is not registered", error);
			return false; // User not found or other error
		}
	}
	function googleLogin () {
		try {
			appWrite.account.createOAuth2Session(
				"google",
				"http://localhost:3000/google-success",
				"http://localhost:3000/auth/login"
			);
		} catch (error) {
			console.log("🍍🔑❌ google login", error);
		}
	}
	return {
		loggedIn,
		authId,
		authAccount,
		authUser,

		loginErr,
		registerErr,

		login,
		logout,
		onLoginSuccess,
		createNewUser,
		getAuthUser,
		deleteAccount,
		isUserRegistered,
		googleLogin,
	};
});
