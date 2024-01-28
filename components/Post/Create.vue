<script lang="ts" setup>
const dataStore = useDataStore()
const emit = defineEmits(['post-added','cancel'])
const {threadId} = defineProps({
	threadId: { type: String, required: true },
})
function addPost(payload: {content: string , madeBy: string}) {
	const post = {
		...payload,
		threadId: threadId,
	}
	dataStore.createPost(post, threadId)
	emit('post-added')
}
</script>

<template>
	<post-editor @save="addPost" @cancel="emit('cancel')"/>
</template>
