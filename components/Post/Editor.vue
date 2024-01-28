<script lang="ts" setup>
const authStore = useAuthStore()
const user = computed(() => authStore.authUser)

const emit = defineEmits(['save', 'cancel'])
const props = defineProps({
	content: { type: String, default: '' },
	btnSubmit: { type: String, default: 'add' },
})

const content = ref(props.content)
function save() {
	const post = {
		content: content.value,
		madeBy: user.value?.$id
	}
	emit('save', post)
}
</script>
<template>
	<div class="post-editor">
		<div class="u-info">
			<nuxt-link :to="`/dashboard/profile/${user?.$id}`" class="user">
				<img class="xavatar" :src="user?.avatar" alt="post.madeBy.username" />
				<div class="user-name">{{ user?.name }}</div>
			</nuxt-link>
		</div>
		<form @submit.prevent="save">
			<BaseInput
				:isTextarea="true"
				required
				placeholder="What's in your mind?..."
				class="nt-textarea"
				nom="content"
				v-model="content"
				maxlength="1000"
			></BaseInput>
			<div class="text-counter">{{ content.length }} / 1000</div>
			<div class="form-act">
				<button class="gh-m-btn" @click="emit('cancel')" type="button">Cancel</button>
				<button class="blu-btn" type="submit">{{ btnSubmit }}</button>
			</div>
		</form>
	</div>
</template>
<style lang="scss">
.post-editor {
	width: 100%;
	padding: 32px;
	// margin: 0 auto;
	// 	max-width: $lS;
	.user {
		@include zflex(row, nowrap, flex-start, center);
		.user-name {
			@include zfont(1.125rem, 500, $darkblue);
		}
	}
	form {
		width: 100%;
		.nt-textarea {
			min-height: 220px;
			border-radius: 12px;
			@include zfont(1.125rem, 400, $dark);
			padding: 16px 16px 0;
		}
	}
}
</style>