<script setup lang="ts">
	const faqs = reactive([
		{
			question: "What is Speak-up and how does it work?",
			answer:
				"Speak-up is a communication platform designed to facilitate online discussions and collaboration. It organizes content into categories, each containing forums. Within these forums, users can create threads on specific topics, and each thread comprises individual posts where users can share information, ask questions, and interact with others.",
			isVisible: false,
		},
		{
			question: "How do I create a new thread in a forum?",
			answer:
				"To create a new thread, first navigate to the category that best fits your topic. Then, select the forum where you want to start your thread. Click on the Create Thread button, enter a title and your message, and then submit it. Your thread will now be open for others to view and respond to with their posts.",
			isVisible: false,
		},
		{
			question: "How does Speak-up handle security and data?",
			answer:
				"Speak-up prioritizes the security and privacy of user data. To achieve this, we utilize Appwrite, a robust open-source backend server, known for its comprehensive security features. Appwrite includes end-to-end encryption, ensuring that all data, both in transit and at rest, is securely encrypted. Additionally, Appwrite follows strict authentication and authorization protocols to control access to data, preventing unauthorized access.",
			isVisible: false,
		},
		{
			question: "How does the pricing work?",
			answer:
				"Speak-up is completely free to use. As an open-source platform, we are committed to providing a cost-free communication tool that is accessible to everyone. Users can create and join forums, threads, and posts without any charges. Our open-source nature also means that enthusiastic developers and users can contribute to the app development, ensuring continuous improvement and innovation without any cost.",
			isVisible: false,
		},
		{
			question: "How can I register for an account?",
			answer:
				"Registering is easy. Just click the 'Sign Up' button on our homepage, fill in the required information, and you'll be ready to join the conversations. or you can sign in with google account by clicking into continue with google button",
			isVisible: false,
		},
		{
			question: "What should I do if I forget my account password?",
			answer:
				"If you forget your password, click the 'Forgot Password' link on the login page and provide us with your email then click submit. An email will be send to your account to reset your password. The verification link sent to the user's email address is valid for 1 hour.",
			isVisible: false,
		},
		{
			question: "Can I delete my posts or threads?",
			answer:
				"Yes, you can delete your posts or threads at any time. Just go to the post or thread you created and select the 'Delete' option.",
			isVisible: false,
		},
		{
			question: "Can I create a forum?",
			answer: "In the next update, This feature will be available",
			isVisible: false,
		},
		{
			question: " How can I contact Speak-Up for support or feedback?",
			answer:
				"We're here to help! For support or feedback, please visit our 'Contact Us' page and send us a message ",
			isVisible: false,
			link: "/contact-us",
		},
	]);
	const toggleAnswer = (index: number) => {
		faqs.map((faq, i) => {
			if (index === i) {
				faq.isVisible = !faq.isVisible;
			} else {
				faq.isVisible = false;
			}
		});
	};
</script>

<template>
	<div class="faqs-page z-page p-32">
		<div class="container">
			<!-- <h2 class="tito">FAQ</h2> -->
			<div class="heading">
				<div class="photo">
					<img src="/static/faqs/FAQs3.png" alt="" />
				</div>
			</div>

			<div class="faqs">
				<div v-for="(item, index) in faqs" :key="index" class="s-item">
					<div class="faq-item">
						<div class="qes" @click="toggleAnswer(index)">
							<h4>{{ item.question }}</h4>
							<span
								><fai
									class="fa-icon"
									:icon="item.isVisible ? 'fa-chevron-up' : 'fa-chevron-down'"
								></fai
							></span>
						</div>
						<Transition name="max">
							<div v-if="item.isVisible" class="ans">
								<p>
									{{ item.answer }}
									<NuxtLink v-if="item.link" :to="item.link">here</NuxtLink>
								</p>
							</div>
						</Transition>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.faqs-page {
		background-color: #f7faff;
		.container {
			.heading {
				@include zflex;

				.photo {
					padding: 0 16px 16px;
					max-width: 400px;
					img {
						max-width: 100%;
					}
				}
			}
			.faqs {
				padding: 16px;
				@include zflex(column);

				.s-item {
					width: 100%;
					max-width: 1024px;
					background-color: #fdfdfd;
					box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
						rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
					border-radius: 12px;
					margin-bottom: 16px;
					padding: 16px;
					.faq-item {
						.qes {
							@include zflex(row, nowrap, space-between, center);
							padding: 12px;
							cursor: pointer;
							h4 {
								margin: 0;
								@include zfont(1.5rem, 700, #222);
							}
							span {
								@include zflex;
								background-color: #ffffff;
								padding: 8px;
								border-radius: 4px;
								box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
									rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
								.fa-icon {
									font-size: 1.5rem;
									color: #000000;
								}
							}
						}
						.ans {
							overflow: hidden;
							transition: all 0.2s ease-out;
							padding: 12px;
							p {
								@include zfont(1.375rem, 400, #555);
								margin: 0;
								line-height: 1.35;
								a {
									@include zfont(1.375rem, 400, $bluhclr);
								}
							}
						}
					}
				}
			}
		}
	}
</style>
