<script lang="ts" setup>
const emit = defineEmits(['saving', 'verify'])
const { verify } = defineProps({ verify: { type: Boolean, default: false } })

// toggle editing section by edit btn or cancel to go back or saving and cancel
const isEditing = ref(false)
const edit = () => isEditing.value = true
const cancel = () => isEditing.value = false
const save = (e: Event) => {
	emit('saving', e)
	isEditing.value = false
}
</script>

<template>
	<div class="account-card">
		<!-- Display Email and Edit Button -->
		<div v-if="!isEditing" class="display">
			<slot name="display"></slot>

			<div class="form-act">
				<button type="button" v-if="verify" @click="emit('verify')" class="gh-btn" aria-label="Verify this field">Verify</button>
				<button type="button" @click="edit" class="blu-sm-btn" aria-label="Edit account settings">Edit</button>
			</div>
		</div>

		<!-- Display Edit Form -->
		<div v-else class="editing">
			<form @submit.prevent="save">
				<slot name="edit"></slot>

				<div class="form-act">
					<button type="button" @click="cancel" class="gh-btn" aria-label="Cancel editing">Cancel</button>
					<button type="submit" class="blu-sm-btn" aria-label="Save changes">Save</button>
				</div>
			</form>
		</div>
	</div>
</template>
<style scop lang="scss">
.account-card {
	margin-top: 16px;
	padding-bottom: 16px;
	border-bottom: 0.5px solid $webD;
	margin-bottom: 16px;
}
</style>
