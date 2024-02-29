<script lang="ts" setup>
	const { refValue, open, close } = useToggle();
	const whatToExpect = [
		{
			src: "for-comms.webp",
			title: "For Comms",
			sub: "Experience simplicity at its best, a powerful yet easy-to-use tool for better commmunication.",
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
	const counterStore = useCounterStore();
	const authStore = useAuthStore();
	const counts = computed(() => counterStore.counter);
	onMounted(() => {
		counterStore.getCounts();
		setTimeout(() => open(), 10000);
	});
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
					<nuxt-link to="/auth/register" class="bbtn">Join us now</nuxt-link>
				</div>
				<div class="photo">
					<img src="/static/welcome/chat-bro.png" alt="landing image" />
				</div>
			</div>
		</section>
		<section class="whatToExpect sec-pad z-clr">
			<div class="container">
				<div class="sec-main-title">
					<h1>What to Expect</h1>
				</div>
				<div class="features">
					<div v-for="f in whatToExpect" class="feature" data-aos="fade-up">
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
		<section class="smart sec-pad">
			<div class="ex-container">
				<div class="photo">
					<img src="/static/welcome/speakup-profile.png" alt="devices" />
				</div>
				<div class="profile">
					<h3>Smart solution for modern environment</h3>
					<p>We have set up everything you need to go digital with a user-friendly platform. Don't talk our word for it, Talk a look.</p>
					<nuxt-link to="/auth/register">Try it for Free</nuxt-link>
				</div>
			</div>
		</section>
		<section class="stats sec-pad z-clr">
			<div class="container">
				<div class="sec-main-title">
					<h1>Our awesome app</h1>
				</div>

				<main>
					<div class="photo">
						<img src="/static/welcome/events.png" alt="" />
					</div>
					<div class="content">
						<div v-if="counts.categories" class="details">
							<div class="unit">
								<span class="unit-nr" v-zanimate="{ fv: counts.categories }"
									>0</span
								>
								<span>Categories</span>
							</div>
							<div class="unit">
								<span class="unit-nr" v-zanimate="{ fv: counts.forums }"
									>0</span
								>
								<span>Forums</span>
							</div>
							<div class="unit">
								<span class="unit-nr" v-zanimate="{ fv: counts.threads }"
									>0</span
								>
								<span>Threads</span>
							</div>
							<div class="unit">
								<span class="unit-nr" v-zanimate="{ fv: counts.posts }">0</span>
								<span>Posts</span>
							</div>
							<div class="unit">
								<span class="unit-nr" v-zanimate="{ fv: counts.users }">0</span>
								<span>Users</span>
							</div>
						</div>
						<h1 data-aos="slide-left">
							<b>Engage in Meaningful Conversations</b>
						</h1>
						<p data-aos="slide-left">
							Join our growing community and be a part of dynamic discussions
							across various categories. Speak-Up is the perfect place to share
							your thoughts, learn new perspectives, and connect with
							like-minded individuals.
						</p>
					</div>
				</main>
			</div>
		</section>

		<section class="why-ourapp sec-pad">
			<div class="ex-container">
				<div class="sec-main-title">
					<h1>Why Speak-Up?</h1>
				</div>
				<main>
					<div class="why-content">
						<div class="box" data-aos="slide-right">
							<img src="/static/welcome/goodquality.png" alt="" />
							<div class="text">
								<h3>User-Friendly Interface</h3>
								<p>
									Designed with simplicity and ease of use in mind, Speak-Up
									offers an intuitive user interface that makes navigation and
									participation straightforward for all users.
								</p>
							</div>
						</div>
						<div class="box" data-aos="slide-right">
							<img src="/static/welcome/improve.png" alt="" />
							<div class="text">
								<h3>Continuous Improvement</h3>
								<p>
									Being open-source, Speak-Up is constantly improving with new
									features and updates driven by community feedback and
									collaboration.
								</p>
							</div>
						</div>
						<div class="box" data-aos="slide-right">
							<img src="/static/welcome/block.png" alt="" />
							<div class="text">
								<h3>Ad-Free Experience</h3>
								<p>
									Our platform offers an ad-free experience, focusing purely on
									user conversations and interactions without the distraction of
									advertisements.
								</p>
							</div>
						</div>
					</div>
					<div class="photo">
						<img src="/static/welcome/whyapp.png" alt="" />
					</div>
				</main>
			</div>
		</section>
		<section class="contact sec-pad z-clr">
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
					<nuxt-link :to="{ name: 'contact-us' }">Contact us</nuxt-link>
				</div>
			</div>
		</section>
	</div>
	<transition name="fade">
		<lazy-base-pop-up
			class="del-main"
			v-if="refValue && !authStore.loggedIn"
			@close="close"
		>
			<div class="sign-now">
				<div class="invite">
					<h1>🌟 Welcome to Speak-Up! 🌟</h1>
					<p>
						Engage in meaning conversations and Become a Part of Our Community.
						Speak-Up is where your voice matters, and your opinions shape the
						future of communication.
					</p>
				</div>
				<div class="form-act">
					<nuxt-link :to="{ name: 'auth-register' }" class="sign-up"
						>Sign up</nuxt-link
					>
				</div>
			</div>
		</lazy-base-pop-up>
	</transition>
</template>

<style lang="scss">
	.w-page {
		overflow: hidden;
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
		.stats {
			.container {
				main {
					@include zflex(row, wrap);
					gap: 32px;
					padding-bottom: 54px;
					.photo {
						max-width: 480px;
						padding: 16px;
					}
					.content {
						flex: 1;
						text-align: center;
						@include less(375px) {
							@include zflex(column);
							margin-top: 60px;
						}

						.details {
							margin: 20px auto 48px;
							gap: 10px;
							@include zflex;
							@include between(375px, 600px) {
								@include zflex(row, wrap);
								max-width: 350px;
							}
							@include less(375px) {
								@include zflex(column);
								position: relative;
								gap: 0;
								margin: 0;
								padding: 32px 0 0;
								width: fit-content;
								background-color: #f5f5f5;
								// margin-left: 76px;
								&:before {
									content: "";
									position: absolute;
									left: 50%;
									top: 0;
									transform: translate(-50%, -100%);
									width: 0;
									height: 0;
									border-left: 125px solid transparent;
									border-right: 125px solid transparent;
									border-bottom: 80px solid #f5f5f5;
									z-index: 0;
								}
								// &:after {
								// 	content: "We are growing";
								// 	font-family: Great Vibes;
								// 	color: #eee;
								// 	font-size: 4rem;
								// 	width: 400px;
								// 	position: absolute;
								// 	left: -100%;
								// 	bottom: 0;
								// 	transform: rotateZ(-90deg) translate(60%, -90%);
								// 	z-index: 0;
								// }
							}
							.unit {
								@include more(376px) {
									border-radius: 6px;
									border: 1px solid #d4d4d4;
									width: 100px;
									@include zflex(column);
									span {
										width: 100%;
										&:first-of-type {
											@include zfont(2rem, 500, $bluclr);
											padding: 24px 16px;
										}
										&:last-of-type {
											@include zfont(1rem, 400, #999);
											text-transform: lowercase;
											border-top: 1px solid #d4d4d4;
											padding: 12px 16px;
										}
									}
								}

								@include less(375px) {
									min-width: 150px;
									position: relative;
									text-align: left;
									// border: 1px solid #d4d4d4;
									// border-radius: 6px;
									width: 100%;
									padding: 16px 32px;
									&:nth-of-type(odd) {
										background-color: #eee;
									}
									span {
										&:first-of-type {
											display: block;
											width: 100%;
											@include zfont(2.75rem, 500, $bluclr);
											padding: 8px 16px;
										}
										&:last-of-type {
											position: absolute;
											right: 16px;
											top: 8px;
											@include zfont(1rem, 400, #999);
											text-transform: lowercase;
										}
									}
								}
							}
						}
					}
					h1 {
						@include zfont(2.25rem, 400, #212121);
						margin: 40px 0 0;
						font-family: Lilita-One;
					}
					p {
						line-height: 1.45;
						@include zfont(1.5rem, 500, #666);
					}
				}
			}
		}

		.why-ourapp {
			.ex-container {
				main {
					@include zflex;
					justify-content: space-evenly;
					.why-content {
						.box {
							// opacity: 0;
							// transform: translateX(-150px);
							max-width: 700px;
							background-color: #f6f5f5;
							padding: 30px;
							margin-bottom: 20px;
							border-radius: 6px;
							@include zflex;
							border: 2px solid white;
							position: relative;
							z-index: 1;

							&:before {
								content: "";
								left: 50%;
								top: 50%;
								position: absolute;
								width: 0;
								height: 0;
								transform: translate(-50%, -50%);
								background-color: #ededed;
								z-index: -1;
								transition: all 0.3s;
							}
							&:hover {
								&:before {
									width: 100%;
									height: 100%;
								}
							}

							img {
								width: 80px;
								// height: 64px;
								margin-right: 30px;
							}
							.text {
								h3 {
									@include zfont(1.5rem, 500, $dark);
									margin: 8px 0 16px;
								}
								p {
									@include zfont(1.375rem, 400, #666);
									margin: 16px 0 0;
								}
							}
							@include less($lS) {
								max-width: 500px;

								&:first-of-type {
									align-self: flex-start;
								}
								&:last-of-type {
									align-self: flex-end;
								}
								.text p {
									font-size: 1.25rem;
								}
							}
							@include less(500px) {
								@include zflex(column);
								img {
									padding-bottom: 24px;
									margin-right: 0;
								}
								.text h3 {
									font-size: 1.375rem;
								}
							}
						}
						@include less($lS) {
							@include zflex(column);
							width: 100%;
							padding: 16px;
						}
					}
					.photo {
						max-width: 400px;
						padding-left: 16px;
						@include less($lS) {
							display: none;
						}
					}
				}
			}
		}
		.smart {
			.ex-container {
				@include zflex(row-reverse, nowrap, center, center);
				gap: 32px;
				padding-left: 32px;
				padding-right: 32px;
				@include less($lS) {
					flex-wrap: wrap;
				}
				.photo {
					max-width: 680px;					
					@include zflex;
				}
				.profile {
					padding: 16px;
					h3 {
						@include zfont(2.25rem, 500, $dark);
					}
					p {
						@include zfont(1.65rem, 500, #666);
						margin: 32px 0 48px;
						line-height: 1.25;
					}
					a {
						@include zbtn(darken($orclr, 5%), 14px 32px);
						@include zfont(1.5rem, 500, #666);
						border-radius: 8px;
					}
				}
			}
		}
		.contact {
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
	}
	.sign-now {
		.invite {
			padding: 0 16px;
			h1 {
				margin: 0;
				@include zfont(2rem, 500, #212121);
				text-align: center;
			}
			p {
				@include zfont(1.375rem, 400, #666);
			}
		}
		.form-act {
			@include zflex;
			.sign-up {
				margin-left: 8px;
				@include zbtn(#0284c7, 12px 24px);
				@include zfont(1.125rem, 500, #fff);
			}
		}
	}
</style>
