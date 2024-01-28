<script lang="ts" setup>
	const props = defineProps({
		name: { type: String, required: true },
	});
	const accountStore = useAccountStore();
	const form = ref(props.name);
	function updateName() {
		const data = { name: form.value };
		accountStore.updateName(data);
	}
</script>

<template>
	<div class="account-name">
		<AccountCard @saving="updateName">
			<template #display>
				<div class="dis-name">
					<span>Name</span>
					<p>{{ name }}</p>
				</div>
			</template>
			<template #edit>
				<BaseInput title="Full name" nom="name" v-model="form" />
			</template>
		</AccountCard>
	</div>
</template>
<style lang="scss">
	.account-name {
		.display {
			@include zflex(row, wrap, space-between);

			.dis-name {
				@include zflex(row, wrap);
				padding-right: 16px;
				span {
					@include zfont(1.25rem, 500, $gra2clr);
					margin-right: 16px;
				}
				p {
					@include zfont(1.5rem, 500, $dark);
				}
			}
		}
	}
</style>
