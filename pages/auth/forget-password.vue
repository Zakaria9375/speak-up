<script lang="ts" setup>
	definePageMeta({
		layout: "just-footer",
	});
	const err = ref(false);
	const { refValue: msgPop, open: openMsg, close: closeMsg } = useToggle();
	const { defineField, handleSubmit, errors, validate } = useForm({
		validationSchema: forgetPasswordSchema,
	});
	const [email, emailAttrs] = defineField("email");
	const accountStore = useAccountStore();
	const onSubmit = handleSubmit(async (values) => {
		const { valid } = await validate();
		if (valid) {
			const emailValue = values.email;
			const isregistered = await accountStore.isRegistered(emailValue);
			if (isregistered) {
				openMsg();
				await accountStore.recoverPassword(emailValue);
			} else {
				err.value = true;
			}
		}
	});
</script>
<template>
	<div class="fp-page p-page x-clr">
		<div class="container z-page">
			<div class="photo noneLS">
				<img src="/static/forget/fpa.png" alt="forget password amigo" />
			</div>
			<div class="col2">
				<div class="heading">
					<h2>Forget Your Password?</h2>
					<p>
						No worries! Enter your email address, and we'll send you an email to
						reset it.
					</p>
				</div>
				<form @submit.prevent="onSubmit">
					<BaseInput
						class="f-input"
						type="email"
						nom="email"
						v-model="email"
						v-bind="emailAttrs"
						:errorMessage="errors.email"
					/>
					<button type="submit">Submit</button>
				</form>
				<p v-if="err" class="error-message" style="font-size: 1.375rem">
					User not registered
				</p>
			</div>
		</div>
	</div>
	<Transition name="fade">
		<LazyBasePopUp class="del-main" v-if="msgPop" @close="closeMsg">
			<div class="reset-msg">
				<div class="photo">
					<img src="/static/forget/msg-r.png" alt="new massage" />
				</div>
				<p class="v-text">
					An email has been sent to you. Please, check your email to complete
					verification process.
				</p>
			</div>
		</LazyBasePopUp>
	</Transition>
</template>
<style lang="scss">
	.fp-page {
		.container {
			@include zflex(row, nowrap, space-between, center);
			.photo {
				max-width: 600px;
			}
			.col2 {
				min-width: 300px;
				@include zflex(column, nowrap, center, center);
				.heading {
					h2 {
						margin: 16px 0;
						text-align: center;
						@include zfont(2.25rem, 500, #5e5e5e);
					}
					p {
						@include zfont(1.875rem, 400, #666);
						line-height: 1.35;
						text-align: center;
						max-width: $xlS;
					}
				}

				form {
					max-width: $smS;
					width: 100%;
					padding: 16px;
					@include zflex(row, nowrap, center, flex-start);
					@include less($xsmS) {
						@include zflex(column, nowrap, center, center);
					}
					.f-input {
						border-radius: 8px;
						@include more($xsmS) {
							height: 45px;
							border-bottom-right-radius: 0px;
							border-top-right-radius: 0px;
						}
					}
					button {
						@include zfont(1.15rem, normal, #fff);
						@include zbtn($greclr, 12px 16px);
						@include less($xsmS) {
							width: 80%;
						}
						@include more($xsmS) {
							border-bottom-left-radius: 0px;
							border-top-left-radius: 0px;
							margin-top: 8px;
						}
					}
				}
			}
		}
	}
	.reset-msg {
		@include zflex(column);
		.photo {
			img {
				max-width: 250px;
				max-height: 250px;
			}
		}
	}
</style>
