<script lang="ts" setup>
	import type { BasePagination } from "#build/components";

	definePageMeta({
		layout: "dashboard",
	});
	const route = useRoute();
	const id = ref<string>(route.params.id as string);
	const authId = useAuthStore().authId;
	const {
		refValue: create,
		open: openCreate,
		close: closeCreate,
	} = useToggle();
	const { refValue: del, open: openDel, close: closeDel } = useToggle();

	//component logic
	const startAt = ref(0);
	const thread = ref<Thread>();
	const posts = ref<Post[]>();
	const channels = ref<string[]>();
	const { isReady, isLoading, error, fetchData } = await useListFetcher(
		thread,
		posts,
		"threads",
		id.value,
		"posts",
		startAt.value,
		channels
	);

	function onPageChange(currentPage: number) {
		startAt.value = currentPage * 10 - 10;
		fetchData(startAt.value);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	const length = computed(() => thread.value?.posts.length);

	const contributors = computed(() => {
		const unique = new Set();
		if (posts.value) {
			posts.value.forEach((p: Post) => {
				if (p && p.madeBy) {
					unique.add(p.madeBy.$id);
				}
			});
		}
		return unique.size;
	});

	const paginationRef = ref<InstanceType<typeof BasePagination> | null>(null);

	watch(length, () => {
		if (paginationRef.value && length.value) {
			paginationRef.value.updateOnLengthChange(length.value);
			fetchData(startAt.value);
		}
	});

	const appWrite = useAppWrite();
	if (channels.value) {
		appWrite.client.subscribe(channels.value, async (res) => {
			await fetchData(startAt.value);
		});
	}
	function refreshPost() {
		fetchData(startAt.value);
	}
</script>

<template>
	<div v-if="isReady && thread" class="thread-page z-page">
		<div class="fcc">
			<div class="leading pb-32">
				<div v-if="authId === thread.madeBy.$id" class="form-act">
					<button @click="openDel" type="button" class="gh-btn">
						Delete thread
					</button>
					<nuxt-link
						v-if="thread"
						:to="`/dashboard/thread/edit/${thread.$id}`"
						class="zbtn"
					>
						Edit thread
					</nuxt-link>
				</div>
			</div>
			<ThreadCard v-if="thread" :thread="thread" />
			<div class="leading countsLead">
				<span class="counts"
					>{{ length }} replies by {{ contributors }} contributors</span
				>
			</div>
			<div class="post-list">
				<div v-for="post in posts" :key="post.$id">
					<PostCard :post="post" @@refresh-page="refreshPost" />
				</div>
			</div>

			<div class="form-act">
				<button type="button" class="zbtn" @click="openCreate">
					Add new post
				</button>
			</div>
			<BasePagination
				v-if="length > 10"
				:length="length"
				ref="paginationRef"
				@current="onPageChange"
			/>
		</div>
		<div id="pop">
			<Transition name="fade">
				<LazyBasePopUp v-if="create" @close="closeCreate">
					<PostCreate
						v-if="thread"
						:threadId="thread.$id"
						@post-added="closeCreate"
						@cancel="closeCreate"
					/>
				</LazyBasePopUp>
			</Transition>
			<Transition name="fade">
				<BasePopUp class="del-main" v-if="del" @close="closeDel">
					<ThreadDelete
						v-if="thread"
						:thread="thread"
						:forumId="thread.forum.$id"
						@thread-deleted="closeDel"
						@cancel="closeDel"
					/>
				</BasePopUp>
			</Transition>
		</div>
	</div>
</template>

<style lang="scss">
	.thread-page {
		padding-top: 16px;
		padding-bottom: 54px;
		.leading {
			@include zflex(column, wrap, center, flex-end);

			.gh-btn {
				@include zfont(1.125rem, 400, #000);
				@include zbtn(#adaaaa, 10px 22px);
				margin-right: 12px;
			}
			.zbtn {
				width: fit-content;
			}
			span.counts {
				padding: 12px 0;
				@include zfont(1.125rem, 300, $gra2clr);
			}
		}
		.countsLead {
			margin-bottom: 18px;
			align-items: center;
		}
	}
</style>
