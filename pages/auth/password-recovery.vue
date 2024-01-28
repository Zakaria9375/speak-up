<script lang="ts" setup>
	definePageMeta({
		layout: "just-footer",
	});
	const router = useRouter();
	const route = useRoute();
	const appWrite = useAppWrite();
	const { defineField, handleSubmit, errors, validate } = useForm({
		validationSchema: passwordRecovery,
	});
	const [newPassword, newPasswordAttrs] = defineField("newPassword");
	const [confirmPassword, confirmPasswordAttrs] =
		defineField("confirmPassword");

	const isReady = ref(false);
	const updating = ref(false);
	const userId = ref("");
	const token = ref("");
	const { addNoti } = useNotifications();
	const recreatePassword = handleSubmit(async (values) => {
		const { valid } = await validate();
		if (valid) {
			updating.value = true;
			const promise = appWrite.account.updateRecovery(
				userId.value,
				token.value,
				values.newPassword,
				values.confirmPassword
			);
			promise.then(
				(res) => {
					// console.log("🔐✅ password recovery", res);
					updating.value = false;
					isReady.value = true;
					addNoti("Password Recrated 🔐", "s");
				},
				(err) => {
					updating.value = false;
					addNoti("Failed to recover Password 🔐", "e", `${err}`);
				}
			);
		}
	});
	onMounted(() => {
		if (route.query.userId && route.query.secret) {
			userId.value = route.query.userId.toString();
			token.value = route.query.secret.toString();
		}
	});
</script>

<template>
	<div v-show="!updating" class="p-page recover p-16">
		<div v-if="!isReady" class="container">
			<div class="photo1 noneMedS">
				<img src="/static/password-recover/reset.png" alt="new massage" />
			</div>
			<form @submit.prevent="recreatePassword">
				<h2 class="tito2">Password Reset</h2>
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
					<button type="submit" class="blu-sm-btn">Submit</button>
				</div>
			</form>
		</div>
		<div class="container" v-else>
			<div class="photo1 noneMedS">
				<img src="/static/password-recover/updated.png" alt="new massage" />
			</div>
			<div class="msg">
				<p class="v-text">Your password has been updated...</p>
				<NuxtLink to="/auth/login" class="blu-btn">Login</NuxtLink>
			</div>
		</div>
	</div>
	<BaseLoading v-show="updating" class="p-page" />
</template>

<style lang="scss">
	.recover {
		@include zflex;
		.container {
			@include zflex;
			gap: 3%;
			.photo1 {
				max-width: 450px;
				@include less($lS) {
					max-width: 400px;
				}
			}
			form {
				flex: 1;
				min-width: 280px;
				max-width: 480px;
				padding: 16px;
				.tito2 {
					color: #333;
					@include zfont(2.5rem, 500, #333);
					text-align: center;
				}
				margin-bottom: 54px;
			}
			.v-text {
				font-size: 2rem;
			}
			
		}
	}
	.msg {
		@include zflex(column);
	}
</style>
