import { Query } from "appwrite";

export const useAccountStore = defineStore("account", () => {
	const appWrite = useAppWrite();
	const { addNoti } = useNotifications();
	async function updateEmail(data: { email: string; password: string }) {
		try {
			const accountName = await appWrite.account.updateEmail(
				data.email,
				data.password
			);
			const userName = await appWrite.databases.updateDocument(
				"appData",
				"users",
				accountName.$id,
				{ email: data.email }
			);
			addNoti("Email has been Updated", "s");
		} catch (error) {
			addNoti("Failed to update email", "e", `${error}`);
		}
	}
	async function createEmailVerification() {
		try {
			await appWrite.account.createVerification(
				"https://speak-up.zaportfolio.com/email-verify"
			);
			addNoti("Email verification has been created", "i");
		} catch (error) {
			addNoti("Failed to create email verification", "e", `${error}`);
		}
	}
	async function verifyEmail(secret: string) {
		try {
			const authStore = useAuthStore();
			await authStore.getAuthUser();
			const id = authStore.authId;
			await appWrite.account.updateVerification(id.value, secret);
			addNoti("Email has been verified", "s");
		} catch (error) {
			addNoti("Failed to verify email", "e", `${error}`);
		}
	}

	async function updateName(data: { name: string }) {
		try {
			const accountName = await appWrite.account.updateName(data.name);
			const userName = await appWrite.databases.updateDocument(
				"appData",
				"users",
				accountName.$id,
				{ ...data }
			);
			addNoti("Name updated", "s");
		} catch (error) {
			addNoti("Failed to update name", "e", `${error}`);
		}
	}

	async function updatePassword(data: {
		newPassword: string;
		oldPassword: string;
	}) {
		try {
			await appWrite.account.updatePassword(data.newPassword, data.oldPassword);
			addNoti("Password updated 🔐", "s");
		} catch (error) {
			addNoti("Failed to update password", "e", `🔐 ${error}`);
		}
	}
	async function recoverPassword(email: string) {
		await appWrite.account.createRecovery(
			email,
			"https://speak-up.zaportfolio.com/auth/password-recovery"
		);
	}

	async function updatePhone(data: { phone: string; password: string }) {
		try {
			const accountPhone = await appWrite.account.updatePhone(
				data.phone,
				data.password
			);
			addNoti("Phone updated 📞 ", "s");
		} catch (error) {
			addNoti("Failed to update phone", "e", `📞 ${error}`);
		}
	}
	async function createPhoneVerification() {
		await appWrite.account.createPhoneVerification();
	}
	function verifyPhone(secret: string) {
		try {
			const authStore = useAuthStore();
			const id = authStore.authId.value;
			appWrite.account.updatePhoneVerification(id, secret);
			addNoti("Phone verified ☎️ ", "s");
		} catch (error) {
			addNoti("Failed to verify phone", "e", `☎️ ${error}`);
		}
	}
	async function isRegistered(email: string) {
		try {
			const user = await appWrite.databases.listDocuments("appData", "users", [
				Query.equal("email", email),
			]);
			if (user.documents.length > 0) {
				addNoti("Email is Registered", "s");
				return true;
			}
		} catch (error) {
			addNoti("Email is not Registered", "e", `${error}`);
			return false;
		}
	}
	async function getAllSessions() {
		const sessions = await appWrite.account.listSessions();
		return sessions.sessions;
	}
	async function deleteSession(sessionId: string) {
		try {
			await appWrite.account.deleteSession(sessionId);
			addNoti("Session deleted", "s");
		} catch (error) {
			addNoti("Failed to delete session", "e", `${error}`);
		}
	}
	return {
		updateEmail,
		createEmailVerification,
		verifyEmail,
		isRegistered,
		updateName,

		updatePassword,
		recoverPassword,

		updatePhone,
		createPhoneVerification,
		verifyPhone,
		getAllSessions,
		deleteSession,
	};
});
