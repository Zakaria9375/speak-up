<template>
	<footer>
		<div class="ex-container">
			<div class="footer-content">
				<div class="app-links">
					<div class="logo">
						<NuxtLink to="/" class="logo-wrap">
							<img src="/static/svg/logo.svg" alt="logo" />
							<span>Speak up</span>
						</NuxtLink>
					</div>
					<NuxtLink to="/contact-us" class="contact-us">Contact Us</NuxtLink>
				</div>
				<ul class="auth-links">
					<li>
						<NuxtLink to="/auth/register">
							<fai icon="angles-right" class="fa-icon" />Sign Up
						</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/auth/login">
							<fai icon="angles-right" class="fa-icon" />Log In
						</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/auth/forget-password">
							<fai icon="angles-right" class="fa-icon" />Forget Password
						</NuxtLink>
					</li>
				</ul>

				<ul class="info-links">
					<li>
						<NuxtLink to="/info/privacy-policy">
							<fai icon="angles-right" class="fa-icon" />Privacy Policy
						</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/info/terms">
							<fai icon="angles-right" class="fa-icon" />Terms and conditions
						</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/info/faqs">
							<fai icon="angles-right" class="fa-icon" />FAQs
						</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
		<div class="copy">
			<p class="copyright">© 2024 Speak Up. All rights reserved.</p>
		</div>
	</footer>
</template>

<style lang="scss">
	footer {
		background-color: #333;
		// height: 70px;
		color: #ccc;
		padding: 32px 0 24px;
		text-align: center;
		// border-top: solid 1px #555;
		@include zfont(1.25rem, 500, #ccc);
		.ex-container {
			@include zflex;
			max-width: 1126px;
		}
		.footer-content {
			padding: 0 16px;
			width: 100%;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			column-gap: 40px;

			.app-links {
				@include zflex(column);
				.logo {
					padding: 16px 0 24px;
					@include zflex;
					img {
						display: inline-block;
						width: 48px;
						height: 48px;
					}
					span {
						margin-left: 0.5rem;
						@include zfont(2rem, 400, #fff);
						font-family: "Great Vibes", cursive;
					}
					&:hover {
						img {
							transform: rotate(15deg);
							transition: all 0.3s ease;
						}
						span {
							color: $bluclr;
						}
					}
				}
				.contact-us {
					@include zbtn(darken($orclr, 5%), 12px 24px);
					@include zfont(1.25rem, 500, #666);
					border-radius: 27.5px;
				}
			}
			.auth-links,
			.info-links {
				padding: 0;
				li {
					padding: 15px 0;
					border-bottom: 1px solid #666;
					&:last-of-type {
						border-bottom: none;
					}
					a {
						display: block;
						width: fit-content;
						text-align: left;
						@include zfont(1.25rem, 400, #ccc);
						transition: all 0.3s;
						.fa-icon {
							color: $bluhclr;
							margin-right: 10px;
						}
						&:hover {
							transform: translateX(15px);
							color: #fff;
						}
					}
				}
			}
			@include between(550px, 831px) {
				grid-template-columns: repeat(2, 1fr);
				grid-template-rows: auto auto;
				grid-template-areas: "logo auth" "logo info";
				column-gap: 24px;
				.info-links {
					grid-area: info;
				}
				.auth-links {
					grid-area: auth;
				}
				.logo {
					grid-area: logo;
				}
			}
			@include less(550px) {
				@include zflex(column);
				.auth-links,
				.info-links {
					width: 225px;
				}
				.app-links {
					padding-bottom: 20px;
				}
			}
			@include less(831px) {
				.auth-links {
					li {
						border-bottom: 1px solid #666 !important;
					}
				}
			}
		}
		.copy {
			border-top: 1px solid #666;
			margin-top: 33.42px;
			.copyright {
				@include zfont(1.125rem, 400, #ccc);
				text-align: center;
				margin: 0;
				padding-top: 24px;
			}
		}
	}
</style>
