<script lang="ts" setup>
const dataStore = useDataStore()
const emit = defineEmits(['post-updated', 'cancel'])
const {post} = defineProps({
	post: { type: Object, required: true },
})
function updatePost(payload: {content: string , madeBy: string}) {
	const postId = post.$id
	const content = payload.content
	dataStore.updatePost(postId, content)
	emit("post-updated")
}
</script>

<template>
	<post-editor @save="updatePost" @cancel="emit('cancel')" :content="post.content" btnSubmit="update"/>
</template>