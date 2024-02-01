<script lang="ts" setup>
	const policy = [
		{
			question: "What information do we collect?",
			answer:
				"We may collect information about you in a variety of ways. The information we may collect via the App includes:",
			list: [
				{
					subtitle: "Personal Data: ",
					content:
						"Personally identifiable information, such as your name, email address, and demographic information, that you voluntarily give to us when you register with the App or when you choose to participate in various activities related to the App.",
				},
				{
					subtitle: "Derivative Data: ",
					content:
						"Information our servers automatically collect when you access the App, such as your IP address, browser type, operating system, and access times.",
				},
				{
					subtitle: "Data from Appwrite Services: ",
					content:
						"As we use Appwrite as our backend service, data storage and user authentication is managed through their platform. Please refer to Appwrite’s privacy policy for more details on their data handling.",
				},
			],
		},
		{
			question: "How do we use your information?",
			answer: "We use the information collected about you via the App to:",
			list: [
				{
					subtitle: "",
					content: "Facilitate the creation and management of your account.",
				},
				{ subtitle: "", content: "Email you regarding your account or order." },
				{
					subtitle: "",
					content: "Increase the efficiency and operation of the App.",
				},
			],
		},
		{
			question: "Disclosure of Your Information",
			answer:
				"We may share information we have collected about you in certain situations. Your information may be disclosed as follows:",
			list: [
				{
					subtitle: "By Law or to Protect Rights: ",
					content:
						"If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.",
				},
				{
					subtitle: "Third-Party Service Providers: ",
					content:
						"We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance.",
				},
			],
		},
		{
			question: "Security of Your Information",
			answer:
				"We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that As with any internet-enabled system, there is always a risk of unauthorized access, so it’s important to protect your password and to contact us if you suspect any unauthorized access to your account.",
		},
		{
			question: "Your Rights",
			answer:
				"You have the right to access, update, delete, or restrict the processing of your personal information. From your account and profile pages or you may also contact us for individual rights requests about your personal data.",
		},
		{
			question: "Changes to This Privacy Policy",
			answer:
				"Our Privacy Policy may change from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.",
		},
		{
			question: "Contact Us",
			answer:
				"If you have questions or comments about this Privacy Policy, please contact us ",
			link: "here",
			to: "/contact-us",
		},
	];
	const activeIndex = ref(-1);

	const toggleAnswer = (index: number) => {
		activeIndex.value = activeIndex.value === index ? -1 : index;
	};
</script>

<template>
	<div class="policy p-32">
		<div class="container">
			<div class="heading">
				<div class="photo">
					<img src="/static/privacy/policy.png" alt="policy" />
				</div>
				<div class="text-heading">
					<h1>Privacy Policy</h1>
					<p>
						Welcome to the "Speak Up Communication" app. Your privacy is
						important to us. This Privacy Policy explains how we collect, use,
						disclose, and safeguard your information when you use our Speak Up
						Communication app (the "App"), which is an open-source project
						utilizing Nuxt.js and Appwrite.
					</p>
				</div>
			</div>

			<div class="policies">
				<div v-for="(item, index) in policy" :key="index" class="s-item">
					<!-- <FAQitem :faq="item" /> -->
					<div class="policy-item">
						<div class="qes" @click="toggleAnswer(index)">
							<h4>{{ item.question }}</h4>
							<span
								><fai
									class="fa-icon"
									:icon="
										activeIndex === index ? 'fa-chevron-up' : 'fa-chevron-down'
									"
								></fai
							></span>
						</div>
						<div v-show="activeIndex === index" class="ans">
							<p>
								{{ item.answer }}
								<NuxtLink v-if="item.link" :to="item.to">{{
									item.link
								}}</NuxtLink>
							</p>
							<ul v-if="item.list">
								<li v-for="i in item.list">
									<fai icon="circle" class="icon" />
									<span v-if="i.subtitle">{{ i.subtitle }}</span
									>{{ i.content }}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.policy {
		background-color: #f7faff;
		.container {
			.heading {
				@include zflex;
				gap: 16px;
				@include less($lS) {
					flex-direction: column;
				}
				.photo {
					flex-basis: 46%;
					max-width: 400px;
					padding: 16px;
				}
				.text-heading {
					padding: 16px;
					flex-basis: 50%;
					h1 {
						@include zfont(2.6rem, 700, $dark);
					}
					p {
						@include zfont(1.5rem, 400, $dark);
					}
				}
			}
			.policies {
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
					.policy-item {
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
									color: #000;
								}
							}
						}
						.ans {
							overflow: hidden;
							transition: all 0.6s ease;
							padding: 12px;
							p {
								@include zfont(1.375rem, 400, #555);
								margin: 0;
								line-height: 1.35;
								a {
									@include zfont(1.375rem, 400, $bluhclr);
								}
							}
							ul {
								padding-top: 8px;
								@include less($smS) {
									padding-left: 12px;
								}
								li {
									padding: 8px 0;
									.icon {
										width: 8px;
										height: 8px;
										padding: 4px 8px;
									}
									span {
										@include zfont(1.25rem, 500, #333);
									}
									@include zfont(1.25rem, 400, #555);
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
