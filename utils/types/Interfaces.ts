export interface Account {
	$createdAt: string;
	$id: string;
	email: string;
	emailVerification: boolean;
	name: string;
	phone: string;
	phoneVerification: boolean;
	status: boolean;
}

export interface User {
	$id: string;
	email: string;
	name: string;
	bio: string;
	avatar: string;
	$createdAt: string;
	lastVisitAt: string;
	posts: Post[];
	threads: Thread[];
	isActive: boolean;
	fileId: string;
	country: string;
}

export interface Category {
	name: string;
	$id: string;
	$createdAt: string;
	forums: Forum[];
}
export interface Forum {
	name: string;
	$id: string;
	$createdAt: string;
	category: Category;
	description: string;
	threads: Thread[];
}
export interface Thread {
	$id: string;
	$createdAt: string;
	content: string;
	title: string;
	forum: Forum;
	madeBy: User;
	posts: string[];
}

export interface LastThread {
	$id: string;
	title: string;
	forum: Forum;
	madeBy: User;
	$createdAt: string;
}

export interface Post {
	$id: string;
	content: string;
	madeBy: User;
	$createdAt: number;
	threadId: number;
}


export interface Counter {
	categories: number;
	forums: number;
	threads: number;
	posts: number;
	users: number;
}
