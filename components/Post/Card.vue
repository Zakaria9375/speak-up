<script lang="ts" setup>
	const authId = useAuthStore().authId;
	const emit = defineEmits(["@refreshPage"]);
	const { post, onlineDisplay } = defineProps({
		post: { type: Object, required: true },
		onlineDisplay: { required: false, type: Boolean, default: true },
	});
	const { refValue: edit, open: openEdit, close: closeEdit } = useToggle();
	const {
		refValue: deleting,
		open: openDelete,
		close: closeDelete,
	} = useToggle();
	function refreshPage() {
		closeDelete();
		closeEdit();
		emit("@refreshPage");
	}
</script>
<template>
	<div class="post">
		<div class="post-detail">
			<div class="u-info">
				<nuxt-link :to="`/dashboard/profile/${post.madeBy?.$id}`" class="user">
					<img
						class="xxavatar"
						:src="post.madeBy?.avatar"
						alt="post.madeBy.username"
					/>
					<div class="user-n">
						<span v-if="post.madeBy?.isActive && onlineDisplay" class="online"
							><img
								class="online"
								src="/static/online.png"
								alt="online" /></span
						>{{ post.madeBy?.name }}
					</div>
				</nuxt-link>
			</div>
			<p class="p-content">{{ post.content }}</p>
		</div>
		<div v-if="authId === post.madeBy?.$id" class="edit-btns">
			<button class="editA nobtn" @click="openEdit" title="Make a change">
				<fai class="fa-icon" icon="pencil"></fai>
			</button>
			<button class="editA nobtn" @click="openDelete" title="Delete post">
				<fai class="fa-icon" icon="trash-can"></fai>
			</button>
		</div>

		<div class="date">
			<BaseDate :isoTimestamp="post.$createdAt" />
		</div>
	</div>
	<Transition name="fade">
	<LazyBasePopUp v-if="edit" @close="closeEdit">
		<PostUpdate
			v-if="post"
			:post="post"
			@post-updated="refreshPage"
			@cancel="closeEdit"
		/>
	</LazyBasePopUp>
	</Transition>
<Transition name="fade">
	<LazyBasePopUp class="del-main" v-if="deleting" @close="closeDelete">
		<PostDelete
			v-if="post"
			:id="post.$id"
			:threadId="post.threadId"
			@post-deleted="refreshPage"
			@cancel="closeDelete"
		/>
	</LazyBasePopUp>
	</Transition>
</template>
<style lang="scss">

</style>
