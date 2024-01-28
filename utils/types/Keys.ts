import type {
	Account,
	Category,
	Forum,
	LastThread,
	Post,
	Thread,
} from "./Interfaces";

export const accountKeys: (keyof Account)[] = [
	"$createdAt",
	"$id",
	"email",
	"emailVerification",
	"name",
	"phone",
	"phoneVerification",
	"status",
];

export const userKeys: (keyof User)[] = [
	"$id",
	"email",
	"name",
	"bio",
	"avatar",
	"$createdAt",
	"lastVisitAt",
	"posts",
	"threads",
	"isActive",
	"fileId",
	"country"
];

export const categoryKeys: (keyof Category)[] = [
	"name",
	"$id",
	"$createdAt",
	"forums",
];

export const forumKeys: (keyof Forum)[] = [
	"name",
	"$id",
	"$createdAt",
	"category",
	"description",
	"threads",
];

export const threadKeys: (keyof Thread)[] = [
	"$id",
	"$createdAt",
	"content",
	"title",
	"forum",
	"madeBy",
	"posts",
];

export const lastThreadKeys: (keyof LastThread)[] = [
	"$id",
	"title",
	"forum",
	"madeBy",
];

export const postKeys: (keyof Post)[] = [
	"$id",
	"content",
	"madeBy",
	"$createdAt",
	"threadId",
];