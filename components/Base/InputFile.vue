<script lang="ts" setup>
	const fileError = ref<string | null>(null);
	const preview = ref<string | ArrayBuffer | null | undefined>(null);
	const emit = defineEmits(["fileValue"]);
	const { nom, fz, allowedTypes, helper } = defineProps({
		nom: { type: String, required: false },
		fz: { type: Number, default: 5 * 1024 },
		allowedTypes: {
			type: Array<string>,
			required: false,
			default: ["image/jpg","image/jpeg", "image/png", "image/svg+xml", "image/gif"],
		},
		helper: { type: String, default: "" },
	});
	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.files?.[0]) {
			const file = target.files[0];
			const maxFileSize = fz * 1024; // 5 MB

			if (file.size > maxFileSize) {
				fileError.value = "File size should not exceed 5 MB";
				return;
			} else if (!allowedTypes.includes(file.type)) {
				fileError.value = "Unsupported format";
				return;
			} else {
				fileError.value = null;
				emit("fileValue", file);
				const reader = new FileReader();
				reader.onload = (e) => (preview.value = e.target?.result as string);
				reader.readAsDataURL(file);
			}
		}
	};
</script>

<template>
	<section class="input-filewrapper">
		<p class="helper" v-if="helper">{{ helper }}</p>
		<div v-if="preview" class="preview">
			<img :src="`${preview}`" class="xxavatar" alt="Preview" />
		</div>
		<input
			v-bind="$attrs"
			type="file"
			:name="nom"
			:id="nom"
			@change="handleInput"
		/>

		<div class="error-message" v-if="fileError">{{ fileError }}</div>
	</section>
</template>

<style lang="scss">
	.input-filewrapper {
		margin-bottom: 20px;
		width: 100%;
		label {
			display: block;
			margin-bottom: 12px;
			color: $graclr;
		}
		.helper {
			@include zfont(0.95rem, 400, $graclr);
		}
		.preview {
			@include zflex;
			padding: 8px;
		}
		input[type="file"] {
			padding: 4px;
			margin: -4px;
			position: relative;
			outline: none;
			width: 100%;

			/*	File	Selector	Button	Styles	*/
			&::file-selector-button {
				border-radius: 4px;
				padding: 0 16px;
				height: 40px;
				cursor: pointer;
				background-color: white;
				border: 1px solid rgba(#000, 0.16);
				box-shadow: 0px 1px 0px rgba(#000, 0.05);
				margin-right: 16px;

				/*
				This	is	a	hack	to	change	the	button	label.
				I'm	hiding	the	default	label	and	then
				manually	applying	the	width	based	on
				updated	icon	and	label.
			*/
				width: 140px;
				color: transparent;

				/*
				Firefox	doesn't	support	the	pseudo	::before
				or	::after	elements	on	this	input	field	so
				we	need	to	use	the	@supports	rule	to	enable
				default	styles	fallback	for	Firefox.
			*/
				@supports (-moz-appearance: none) {
					color: var(--primary-color);
				}

				&:hover {
					background-color: #f3f4f6;
				}

				&:active {
					background-color: #e5e7eb;
				}
			}

			/*	Faked	label	styles	and	icon	*/
			&::before {
				position: absolute;
				pointer-events: none;
				top: 14px;
				left: 16px;
				height: 20px;
				width: 20px;
				content: "";
				background-image: url("data:image/svg+xml,%3Csvg	xmlns='http://www.w3.org/2000/svg'	viewBox='0	0	24	24'	fill='%230964B0'%3E%3Cpath	d='M18	15v3H6v-3H4v3c0	1.1.9	2	2	2h12c1.1	0	2-.9	2-2v-3h-2zM7	9l1.41	1.41L11	7.83V16h2V7.83l2.59	2.58L17	9l-5-5-5	5z'/%3E%3C/svg%3E");
			}

			&::after {
				position: absolute;
				pointer-events: none;
				top: 16px;
				left: 40px;
				color: var(--primary-color);
				content: "Upload photo";
			}

			/*	Handle	Component	Focus	*/
			&:focus-within::file-selector-button,
			&:focus::file-selector-button {
				outline: 2px solid var(--primary-color);
				outline-offset: 2px;
			}
		}
		.error-message {
			color: $errclr;
			margin: 10px;
			text-align: start;
		}
	}
</style>
