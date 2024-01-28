<script lang="ts" setup>
	const emit = defineEmits(["update:modelValue"]);
	const { title, modelValue, nom } = defineProps({
		title: { type: String, default: "" },
		modelValue: { type: [String, Number], default: "" },
		nom: { type: String, required: false },
		errorMessage: { type: String, required: false },
		isTextarea: { type: Boolean, required: false, default: false },
	});
	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement | HTMLTextAreaElement | null;
		if (target) {
			emit("update:modelValue", target.value);
		}
	};
</script>

<template>
	<section class="input-wrapper">
		<label :for="nom">{{ title }}</label>
		<input
			v-if="!isTextarea"
			v-bind="$attrs"
			:name="nom"
			:id="nom"
			:value="modelValue"
			@input="handleInput"
			:class="{ error: errorMessage }"
		/>
		<textarea
			v-else
			v-bind="$attrs"
			:name="nom"
			:id="nom"
			:value="modelValue"
			@input="handleInput"
			:class="{ error: errorMessage }"
		></textarea>
		<div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
	</section>
</template>

<style lang="scss">
	.input-wrapper {
		margin-bottom: 20px;
		width: 100%;
		label {
			display: block;
			margin-bottom: 8px;
			color: $graclr;
		}

		input {
			width: 100%;
			padding: 16px;
			border: 1px solid #ccc;
			border-radius: 8px;
			box-sizing: border-box;
			&.error {
				border-color: $errclr;
			}
		}
		textarea {
			max-width: 100%;
			resize: none;
			width: 100%;
			padding: 16px;
			border-radius: 8px;
			border: 1px solid #ccc;
			overflow-y: auto;
			min-height: 140px;
			&.error {
				border-color: $errclr;
			}
		}

		.error-message {
			color: $errclr;
			margin: 10px;
			text-align: start;
		}
	}
</style>
