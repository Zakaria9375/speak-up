<script lang="ts" setup>
	import axios from "axios";

	const submitted = ref(false);
	const { defineField, handleSubmit, errors, validate, resetForm } = useForm({
		validationSchema: contactSchema,
	});
	const { addNoti } = useNotifications();
	const [name, nameAttrs] = defineField("name");
	const [email, emailAttrs] = defineField("email");
	const [subject, subjectAttrs] = defineField("subject");
	const [message, messageAttrs] = defineField("message");
	const endPoint = "https://getform.io/f/6bda41ea-1b3c-4e1a-8d66-0f9cde75aa79";
	const onSubmit = handleSubmit(async (values) => {
		const { valid } = await validate();
		if (valid) {
			axios
				.post(endPoint, values, {
					headers: {
						Accept: "application/json",
					},
				})
				.then(function (response) {
					submitted.value = true;
					resetForm({
						values: { name: "", email: "", subject: "", message: "" },
					});
					addNoti("Your message has been recieved", "s")
				})
				.catch(function (error) {
					addNoti("Error while submitting form", "e", `${error}`);
				});
		}
	});
</script>

<template>
	<div class="c-page z-page p-48">
		<div class="container">
			<section class="c-form">
				<div class="photo noneLS">
					<img src="/static/contact/contact.png" alt="Contact us" />
				</div>
				<div class="col2">
					<div class="heading">
						<h2>Get in Touch</h2>
						<p>
							If you have any questions or need help, please fill out the form
							below. We do our best to respond within 1 business day.
						</p>
					</div>
					<form @submit.prevent="onSubmit">
						<BaseInput
							class="c-input"
							nom="name"
							placeholder="Your Name"
							v-model="name"
							v-bind="nameAttrs"
							:errorMessage="errors.name"
						/>
						<BaseInput
							class="c-input"
							type="email"
							nom="email"
							placeholder="Your email address"
							v-model="email"
							v-bind="emailAttrs"
							:errorMessage="errors.email"
						/>
						<BaseInput
							class="c-input"
							nom="subject"
							placeholder="Subject"
							v-model="subject"
							v-bind="subjectAttrs"
							:errorMessage="errors.subject"
						/>
						<BaseInput
							class="c-textarea"
							:nom="message"
							:isTextarea="true"
							placeholder="Message"
							v-model="message"
							v-bind="messageAttrs"
							:errorMessage="errors.message"
						/>
						<button type="submit" :disabled="submitted">
							Send <fai class="fa-icon" icon="paper-plane"></fai>
						</button>
					</form>
					<div v-show="submitted" class="message">
						<p>Thank you your message has been recieved</p>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<style lang="scss">
	.c-page {
		@include zflex;
		.container {
			.c-form {
				@include zflex;
				flex-direction: row-reverse;
				.photo {
					max-width: 420px;
					padding: 16px;
				}
				.col2 {
					min-width: 300px;
					@include zflex;
					flex-direction: column;
					.heading {
						h2 {
							margin: 16px 0;
							text-align: center;
							@include zfont(2.25rem, 500, #5e5e5e);
						}
						p {
							@include zfont(1.75rem, 400, #666);
							line-height: 1.25;
							text-align: center;
							max-width: $smS;
						}
					}

					form {
						max-width: $smS;
						width: 100%;
						padding: 0 16px;
						@include zflex(column, nowrap, center, center);
						.c-input,
						.c-textarea {
							@include zfont(1.25rem, normal, $dark);
						}

						button {
							margin-top: 16px;
							@include zfont(1.25rem, normal, #fff);
							@include zbtn($bluclr, 12px 40px);
							.fa-icon {
								padding-left: 8px;
							}
							&:disabled {
								cursor: not-allowed;
								background-color: #e0e0e0;
							}
						}
					}
				}
			}
		}
	}
</style>
