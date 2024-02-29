<script lang="ts" setup>
	definePageMeta({
		layout: "just-footer",
	});
	const { defineField, handleSubmit, errors } = useForm({
		validationSchema: loginSchema,
	});

	const authStore = useAuthStore();
	const outputErr = computed(() => authStore.loginErr);

	const [email, emailAttrs] = defineField("email");
	const [password, passwordAttrs] = defineField("password");
	const router = useRouter();
	const onSubmit = handleSubmit((values) => {
		authStore.login(values);
	});
</script>

<template>
	<div class="login-page p-page z-clr p-16">
		<div class="container">
			<div class="sp-heading noneMedS">
				<h1>Sign In</h1>
				<p>Login to Your Account</p>
			</div>
			<div class="login-container">
				<GoogleSignIn />
				<form @submit.prevent="onSubmit" class="login-form">
					<h4 class="title">or Login with your credentials</h4>
					<BaseInput
						type="email"
						title="Email"
						nom="email"
						v-model="email"
						v-bind="emailAttrs"
						:errorMessage="errors.email"
						autocomplete="email"
					/>
					<BaseInput
						type="password"
						title="Password"
						nom="password"
						v-model="password"
						v-bind="passwordAttrs"
						:errorMessage="errors.password"
						autocomplete="current-password"
					/>
					<nuxt-link
						to="/auth/forget-password"
						class="link"
						title="Did you forget your password?!"
						>Forget password ?!</nuxt-link
					>
					<button type="submit" class="login">Login</button>
				</form>
				<p class="sign-link">
					<nuxt-link
						to="/auth/register"
						title="Sign up Now!"
						class="link"
						>Sign Up</nuxt-link
					>
					It's quick and easy!
				</p>
				<div class="error-message" v-if="outputErr">Invalid credentials. Please check the email and password. </div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.login-page {
		@include zflex(column);
		.container {
			@include zflex;
			gap: 5%;
			.login-container {
				max-width: 400px;
				flex: 1;
				@include zflex(column);

				.login-form {
					.title {
						@include zfont(1.375rem, 500, #777);
						margin: 0;
						padding: 16px 0;
					}
					padding: 16px;
					width: 100%;
					@include zflex(column);
					.link {
						padding: 10px;
						margin-bottom: 16px;
						@include zfont(1.2rem, 500, $bluclr);
					}
					.login {
						@include zbtn;
						@include zfont(1.2rem, 600, #fff);
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
