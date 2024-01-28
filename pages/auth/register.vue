<script lang="ts" setup>
	definePageMeta({
		layout: "just-footer",
	});
	const { defineField, handleSubmit, errors, validate } = useForm({
		validationSchema: registerSchema,
	});
	const router = useRouter();
	const authStore = useAuthStore();

	const [name, nameAttrs] = defineField("name");
	const [email, emailAttrs] = defineField("email");
	const [password, passwordAttrs] = defineField("password");
	const [confirmPassword, confirmPasswordAttrs] =
		defineField("confirmPassword");

	const outputErr = computed(() => authStore.registerErr);

	const onSubmit = handleSubmit(async (values) => {
		const { valid } = await validate();
		if (valid) {
			authStore.createNewUser(values);
		}
	});
</script>

<template>
	<div class="p-page z-clr sign-page p-16">
		<div class="container">
			<div class="sp-heading noneLS">
				<h1>Sign Up</h1>
				<p>Join Us Today!</p>
			</div>
			<div class="signup-container">
				<form @submit.prevent="onSubmit" class="signup-form">
					<BaseInput
						type="text"
						placeholder="Full name"
						nom="name"
						v-model="name"
						v-bind="nameAttrs"
						:errorMessage="errors.name"
					/>
					<BaseInput
						type="email"
						placeholder="Email"
						nom="email"
						v-model="email"
						v-bind="emailAttrs"
						:errorMessage="errors.email"
					/>
					<BaseInput
						type="password"
						placeholder="Password"
						nom="password"
						v-model="password"
						v-bind="passwordAttrs"
						:errorMessage="errors.password"
					/>
					<BaseInput
						type="password"
						placeholder="Confirm Password"
						nom="confirmPassword"
						v-model="confirmPassword"
						v-bind="confirmPasswordAttrs"
						:errorMessage="errors.confirmPassword"
					/>
					<button type="submit" class="signup">Sign Up</button>
				</form>
				<div class="error-message" v-if="outputErr">{{ outputErr }}</div>
				<GoogleSignIn />
				<p class="sign-link">
					Already have an account?
					<nuxt-link
						to="/auth/login"
						title="Do you have an account?!"
						class="link"
						>Log in</nuxt-link
					>
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.sign-page {
		@include zflex(column);
		.container {
			@include zflex;
			gap: 5%;
			.signup-container {
				max-width: 400px;
				flex: 1;
				@include zflex(column);
				.signup-form {
					padding: 16px 0;
					width: 100%;
					@include zflex(column);
					.signup {
						@include zbtn;
						@include zfont(1.2rem, 600, #fff);
						.link {
							display: inline;
						}
					}
				}
				.sign-link {
					@include zfont(1.15rem, 400, $dark);
					margin-bottom: 32px;
					.link {
						@include zfont(1.25rem, 500, $bluclr);
						display: inline;
					}
				}
			}
		}
	}
</style>
