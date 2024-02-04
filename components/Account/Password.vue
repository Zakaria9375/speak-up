<script lang="ts" setup>
	const { defineField, handleSubmit, errors, validate } = useForm({
		validationSchema: changePassword,
	});
	const { refValue, open, close } = useToggle();
	const [oldPassword, oldPasswordAttrs] = defineField("oldPassword");
	const [newPassword, newPasswordAttrs] = defineField("newPassword");
	const [confirmPassword, confirmPasswordAttrs] =
		defineField("confirmPassword");

	const accountStore = useAccountStore();
	const updating = ref(false);
	const savePassword = handleSubmit(async (values) => {
		const { valid } = await validate();
		if (valid) {
			updating.value = true;
			const result = await accountStore.updatePassword(values);
			close();
			updating.value = false;
		}
	});
</script>

<template>
	<div class="acc-card">
		<h2 class="card-title">Password</h2>
		<div class="card-icon">
			<img src="/static/account/key.png" alt="Icon" />
		</div>
		<div class="card-content">
			<p>Make your password stronger or change it.</p>
			<button type="button" @click="open" class="nobtn">
				Change password >
			</button>
		</div>
	</div>
	<Transition name="fade">
		<LazyBasePopUp class="del-main" v-if="refValue" @close="close">
			<div v-if="!updating" class="account-password">
				<form @submit.prevent="savePassword">
					<BaseInput
						type="password"
						title="Old Password"
						nom="oldPassword"
						v-model="oldPassword"
						v-bind="oldPasswordAttrs"
						:errorMessage="errors.oldPassword"
					/>
					<p class="helper">
						If you have signed with google enter the new password in all fields
					</p>
					<BaseInput
						type="password"
						title="New Password"
						nom="newPassword"
						v-model="newPassword"
						v-bind="newPasswordAttrs"
						:errorMessage="errors.newPassword"
					/>
					<BaseInput
						type="password"
						title="Confirm Password"
						nom="confirmPassword"
						v-model="confirmPassword"
						v-bind="confirmPasswordAttrs"
						:errorMessage="errors.confirmPassword"
					/>
					<div class="form-act">
						<button type="button" class="gh-btn" @click="close">cancel</button>
						<button type="submit" class="blu-sm-btn">save</button>
					</div>
				</form>
			</div>
			<div class="msg" v-else>
				<p>Your password is being updated...</p>
			</div>
		</LazyBasePopUp>
	</Transition>
</template>
<style lang="scss">
	.msg {
		padding: 16px;
		p {
			text-align: center;
			@include zfont(1.5rem, 400, #333);
		}
	}
</style>
