<script lang="ts" setup>
	const emit = defineEmits(["save", "cancel"]);
	const props = defineProps({
		title: { type: String, required: false, default: "" },
		content: { type: String, required: false, default: "" },
		btnSubmit: { type: String, required: false, default: "Submit" },
	});
	const form = ref({
		title: props.title,
		content: props.content,
	});
	function save() {
		emit("save", form.value);
	}
	function cancel() {
		emit("cancel");
	}
</script>

<template>
	<form @submit.prevent="save">
		<div class="input-counter">{{ form.title.length }} / 99</div>
		<BaseInput
			required
			v-model="form.title"
			placeholder="Write your thread title..."
			nom="title"
			title="Title"
			class="nt-input"
			maxlength="99"
		/>

		<BaseInput
			:isTextarea="true"
			required
			placeholder="Write your first post content..."
			class="nt-textarea nt-input"
			title="Content"
			nom="content"
			v-model="form.content"
			maxlength="1000"
		/>
		<div class="text-counter">{{ form.content.length }} / 1000</div>
		<div class="form-actions">
			<button @click="cancel" type="button" class="gh-btn">Cancel</button>
			<button class="blu-btn" type="submit">{{ btnSubmit }}</button>
		</div>
	</form>
</template>
<style lang="scss">
	form {
		margin: 0 auto;
		max-width: $lS;
		width: 100%;
		position: relative;
		.nt-input {
			border-radius: 12px;
			@include zfont(1.125rem, 400, $dark);
			padding: 16px;
		}
		.input-counter {
			position: absolute;
			right: 16px;
			top: 16px;
			@include zfont(1.125rem, 300, $gra2clr);
		}
		.nt-textarea {
			min-height: 200px;
			padding: 16px 16px 0;
		}
		.text-counter {
			margin-bottom: 16px;
		}
		.form-actions {
			@include zflex(row, nowrap, flex-end, center);

			.gh-btn {
				@include zfont(1.125rem, 400, #000);
				margin-right: 12px;
				background: none;
				border: none;
				padding: 15px 36px;
				border-radius: 8px;
				&:hover {
					background-color: #adaaaa;
					color: #fff;
					cursor: pointer;
				}
			}
			.blu-btn {
				@include zbtn(#263959, 15px 36px);
				@include zfont(1.125rem, 400, #fff);
			}
		}
	}
</style>
