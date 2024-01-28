<script lang="ts" setup>
const dataStore = useDataStore()
const router = useRouter()
const emit = defineEmits(['thread-deleted', 'cancel'])
const { thread, forumId } = defineProps({
	thread: { type: Object, required: true },
	forumId: { type: String, required: true }
})
function deleteThread() {
	dataStore.deleteThread(thread)
	emit('thread-deleted')
	router.push(`/dashboard/forum/${forumId}`);
}
</script>

<template>
	<div class="del-Thread">
		<p>Are you Sure you want to Delete this Thread ?</p>
		<div class="form-act">
			<button type="button" class="gh-btn" @click="emit('cancel')">cancel</button>
			<button type="button" class="blu-btn" @click="deleteThread">confirm</button>
		</div>
	</div>
</template>
<style lang="scss">
	.del-Thread {
		p {
			text-align: center;
			padding: 16px;
			margin: 0;
			@include zfont(1.5rem, 500, $dark)
		}
		.gh-btn {
			@include zfont(1.125rem, 400, #000);
			@include zbtn(#adaaaa, 10px 22px);
			margin-right: 12px;
		}
		.blu-btn {
			padding: 10px 22px;
		}
	}
</style>