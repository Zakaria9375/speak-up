<script lang="ts" setup>
	const whatToExpect = [
		{
			src: "for-comms.webp",
			title: "For Comms",
			sub: "Experience simplicity at its best – a powerful yet easy-to-use tool for better commmunication.",
		},
		{
			src: "for-family.webp",
			title: "For Family",
			sub: "Build a sense of belonging by strong connections among your friends, family and team members",
		},
		{
			src: "for-it.webp",
			title: "For IT",
			sub: "Improve your productivity with simple and centralized tool for streamlined communication.",
		},
		{
			src: "for-employees.webp",
			title: "For Employees",
			sub: "Boost adoption rates with a platform that people actually enjoy using for effective communication.",
		},
	];

	const faqs = [
		{
			question: "What is Speak-up and how does it work?",
			answer:
				"Speak-up is a communication platform designed to facilitate online discussions and collaboration. It organizes content into categories, each containing forums. Within these forums, users can create threads on specific topics, and each thread comprises individual posts where users can share information, ask questions, and interact with others.",
		},
		{
			question: "How do I create a new thread in a forum?",
			answer:
				"To create a new thread, first navigate to the category that best fits your topic. Then, select the forum where you want to start your thread. Click on the Create Thread button, enter a title and your message, and then submit it. Your thread will now be open for others to view and respond to with their posts.",
		},
		{
			question: "How does Speak-up handle security and data?",
			answer:
				"Speak-up prioritizes the security and privacy of user data. To achieve this, we utilize Appwrite, a robust open-source backend server, known for its comprehensive security features. Appwrite includes end-to-end encryption, ensuring that all data, both in transit and at rest, is securely encrypted. Additionally, Appwrite follows strict authentication and authorization protocols to control access to data, preventing unauthorized access.",
		},
		{
			question: "How does the pricing work?",
			answer:
				"Speak-up is completely free to use. As an open-source platform, we are committed to providing a cost-free communication tool that is accessible to everyone. Users can create and join forums, threads, and posts without any charges. Our open-source nature also means that enthusiastic developers and users can contribute to the app development, ensuring continuous improvement and innovation without any cost.",
		},
	];
	const activeIndex = ref(-1);

	const toggleAnswer = (index: number) => {
		activeIndex.value = activeIndex.value === index ? -1 : index;
	};
</script>

<template>
	<div class="w-page z-page">
		<section class="land">
			<div class="container">
				<div class="col1">
					<h1>Speak up</h1>
					<p>
						An internal communication app that enables you to reach everyone,
						everywhere – in the office, at home or on the frontline.
					</p>
					<nuxt-link to="/auth/register" class="bbtn"
						>Join us now</nuxt-link
					>
				</div>
				<div class="photo">
					<img src="/static/welcome/chat-bro.png" alt="landing image" />
				</div>
			</div>
		</section>
		<section class="whatToExpect">
			<div class="container">
				<div class="tit">
					<h2 class="tito">What to Expect</h2>
				</div>
				<div class="features">
					<div v-for="f in whatToExpect" class="feature">
						<div class="photo">
							<img :src="`/static/welcome/${f.src}`" :alt="f.title" />
						</div>
						<div class="description">
							<h3>{{ f.title }}</h3>
							<p>{{ f.sub }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="contact">
			<div class="container">
				<div class="photo">
					<img src="/static/welcome/customer-support.webp" alt="cs" />
				</div>
				<div class="details">
					<h3>Hi, I'm Amy, your dedicated support agent!</h3>
					<p>
						Welcome to our platform! If you have any questions or need
						assistance, feel free to reach out. I'm here to guide you through
						any queries you may have. Let's make your experience seamless and
						enjoyable!
					</p>
					<nuxt-link :to="{ name: 'contact' }">Contact us</nuxt-link>
				</div>
			</div>
		</section>
		<section class="faq-sec z-clr">
			<div class="container">
				<h2 class="tito">Frequently asked questions</h2>
				<div class="faqs">
					<div v-for="(item, index) in faqs" :key="index" class="s-item">
						<!-- <FAQitem :faq="item" /> -->
						<div class="faq-item">
							<div class="qes" @click="toggleAnswer(index)">
								<h4>{{ item.question }}</h4>
								<span
									><fai
									class="fa-icon"
										:icon="
											activeIndex === index
												? 'fa-chevron-up'
												: 'fa-chevron-down'
										"
									></fai
								></span>
							</div>
							<div v-show="activeIndex === index" class="ans">
								<p>{{ item.answer }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss">
	.w-page {
		.land {
			padding-bottom: 54px;
			.container {
				@include zflex(row, nowrap, center, center);
				@include less($lS) {
					@include zflex(column-reverse, nowrap, center, center);
					padding-bottom: 48px;
				}
				.col1 {
					padding: 0 8px;
					h1 {
						@include zfont(3.25rem, 400, $bluclr);
						font-family: "Lilita One", sans-serif;
						letter-spacing: 1px;
						margin: 1.2rem 0.5rem;
					}
					p {
						@include zfont(2rem, 700, #666);
						line-height: 1.4;
						margin: 0.5rem 0 1.5rem;
					}
					.bbtn {
						@include zbtn($bluclr, 14px 38px);
						@include zfont(1.875rem, 500, #fff);
					}
				}
				.photo {
					max-width: 600px;
				}
			}
		}
		.whatToExpect {
			background-color: $web;
			padding: 48px 0;
			.tit {
				padding: 16px;
			}
			.features {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
				column-gap: 40px;
				row-gap: 40px;
				@include between($xlS, $xxlS) {
					grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
					column-gap: 25px;
				}
				@include between($lS, $xlS) {
					grid-template-columns: repeat(2, minmax(215px, 1fr));
					column-gap: auto;
					padding: 0px 32px;
				}
				.feature {
					@include zflex(column, nowrap, space-between, center);
					padding: 16px;
					@include less($mS) {
						max-width: 350px;
						margin-left: auto;
						margin-right: auto;
					}
					.description {
						min-height: 178px;
						h3 {
							@include zfont(1.25rem, 700, $dark);
						}
						p {
							// text-align: justify;
							line-height: 1.35;
							@include zfont(1.125rem, 500, #666);
						}
					}
				}
			}
		}
		.contact {
			padding-top: 86px;
			padding-bottom: 86px;
			.container {
				@include zflex(row, nowrap, center, center);
				gap: 48px;
				@include less($lS) {
					@include zflex(column, nowrap, center, center);
				}
				.photo {
					max-width: 430px;
				}
				.details {
					padding: 0 8px;
					h3 {
						@include zfont(2.25rem, 500, $dark);
					}
					p {
						@include zfont(1.65rem, 500, #666);
						margin: 32px 0 48px;
						line-height: 1.25;
					}
					a {
						@include zbtn(darken($orclr, 5%), 14px 58px);
						@include zfont(1.5rem, 500, #666);
						border-radius: 27.5px;
					}
				}
			}
		}
		.faq-sec {
			padding-top: 54px;
			padding-bottom: 96px;
			.container {
				.faqs {
					padding: 32px 8px 16px;
					.s-item {
						width: 100%;
						border-bottom: 0.5px solid #c0c0c0;
						&:first-of-type {
							border-top: 0.5px solid #c0c0c0;
						}
						.faq-item {
							.qes {
								@include zflex(row, nowrap, space-between, flex-start);
								padding: 30px 0;
								cursor: pointer;
								h4 {
									margin: 0;
									@include zfont(1.5rem, 700, $bdclr);
								}
								span {
									@include zflex;
									background-color: #aaa;
									padding: 8px;
									border-radius: 4px;
									.fa-icon {
										font-size: 1.5rem;
										color: #fff;
									}
								}
							}
							.ans {
								overflow: hidden;
								transition: all 0.6s ease;
								p {
									@include zfont(1.25rem, 400, #666);
									margin: 0;
									padding-bottom: 30px;
									line-height: 1.35;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
