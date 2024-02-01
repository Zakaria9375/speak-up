<script lang="ts" setup>
	const route = useRoute();
	const { width } = useWindowSize();
	const authStore = useAuthStore();
	const isLoggedIn = computed(() => authStore.loggedIn);
	const showLink = computed(()=> {
		return route.path !== "/dashboard" && isLoggedIn.value 
	})
</script>

<template>
	<div>
		<header>
			<nav class="container">
				<NuxtLink to="/" class="logo-wrap">
					<div class="logo">
						<img src="/static/svg/logo.svg" alt="website logo" />
						<span>Speak up</span>
					</div>
				</NuxtLink>
				<!-- <button type="button" @click="authStore.logout()">sigout</button> -->
				<section class="reg-tools">
					<AppSignedUser v-if="isLoggedIn" />
					<div v-else class="sign">
						<nuxt-link :to="{ name: 'auth-login' }" class="sign-in"
							>Sign in</nuxt-link
						>
						<nuxt-link :to="{ name: 'auth-register' }" class="sign-up"
							>Sign up</nuxt-link
						>
					</div>
					<nuxt-link v-if="showLink" to="/dashboard">
						<span class="or-btn">Go to Dashboard</span>
					</nuxt-link>
				</section>
			</nav>
		</header>
	</div>
</template>
<style lang="scss">
	header {
		height: 80px;
		background-color: #fff;
		nav {
			@include zflex(row, nowrap, space-between, center);
			.logo {
				padding: 16px;
				@include zflex(row, nowrap, center, flex-end);
				img {
					display: inline-block;
					width: 48px;
					height: 48px;
				}
				span {
					margin-left: 0.25rem;
					@include zfont(1.75rem, 400, #1f2937);
					font-family: "Great Vibes", cursive;
					@include less($smS) {
						display: none;
					}
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
			.reg-tools {
				@include zflex;
			}
			.sign {
				@include zflex;
				.sign-in {
					@include zfont(1.25rem, 500, #0f172a);
					padding: 16px 10px;
					&:hover {
						color: $bluclr;
					}
				}
				.sign-up {
					margin-left: 8px;
					@include zbtn(#0284c7, 12px 24px);
					@include zfont(1.125rem, 500, #fff);
				}
			}
			.or-btn {
				@include zbtn(#f6c25f, 12px 24px);
				@include zfont(1rem, 500, $gra2clr);
				cursor: pointer;
				margin-left: 12px;
				@include less($smS) {
					padding: 12px;
				}
			}
			.dash-pic {
				max-width: 46px;
				max-height: 46px;
				margin: 0 8px 0 16px;
			}
		}
	}
</style>
