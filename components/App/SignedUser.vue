<script lang="ts" setup>
	import { vOnClickOutside } from "@vueuse/components";
	const authStore = useAuthStore();
	const {
		refValue: userMenu,
		toggle: toggleUserMenu,
		close: closeUserMenu,
	} = useToggle();
	const user = computed(() => authStore.authUser);
	authStore.checkIfStillLoggedIn()
</script>

<template>
	<div class="dd-content">
		<!-- <div class="noti" v-on-click-outside="closeNMenu">
			<div v-if="user" class="noticon" @click="toggleNMenu">
				<fai class="fa-icon" icon="bell"></fai>
			</div>
			<div class="list" :class="{ activeNoti: nMenu }">
				<h2>Notifications</h2>
				<ul>
					<li></li>
				</ul>
			</div>
		</div> -->
		<div v-if="user" class="userInfo" v-on-click-outside="closeUserMenu">
			<div class="user" @click="toggleUserMenu">
				<img
					class="avatar"
					:src="user.avatar"
					:alt="`${user.name} profile picture`"
				/>
			</div>
			<ul :class="{ active: userMenu }">
				<div class="signedUser">
					<img
						class="avatar"
						:src="user.avatar"
						:alt="`${user.name} profile picture`"
					/>
					<span>{{ user.name }}</span>
				</div>
				<li>
					<NuxtLink
						:to="`/dashboard/profile/${user.$id}`"
					>
						<div class="icon"><fai class="fa-icon" icon="user"></fai></div>
						profile</NuxtLink
					>
				</li>
				<li>
					<NuxtLink to="/dashboard/account">
						<div class="icon"><fai class="fa-icon" icon="gear"></fai></div>
						account</NuxtLink
					>
				</li>
				<li>
					<NuxtLink :to="{ name: 'contact-us' }">
						<div class="icon">
							<fai class="fa-icon" icon="message"></fai>
						</div>
						help & support</NuxtLink
					>
				</li>
				<li>
					<button type="button" @click="authStore.logout()">
						<div class="icon">
							<fai class="fa-icon" icon="right-from-bracket"></fai>
						</div>
						log out
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>
<style lang="scss">
	.dd-content {
		@include zflex;
		gap: 10px;
	}
	.userInfo {
		height: 80px;
		position: relative;

		.user {
			height: 100%;
			cursor: pointer;
			@include zflex;
		}
		ul {
			position: absolute;
			background-color: #fff;
			border-radius: 8px;
			padding: 8px;
			min-width: 250px;
			right: 0;
			z-index: 5;
			display: none;
			box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
				rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
			&.active {
				display: block;
			}
			.signedUser {
				height: 100%;
				padding-bottom: 14px;
				@include zflex;
				border-bottom: 0.5px solid $divider;
				span {
					padding-left: 8px;
					@include zfont(1.35rem, 500, $dark);
					letter-spacing: 0.5px;
				}
			}
			li {
				padding: 16px 12px;
				@include zflex;
				a,
				button {
					@include zflex;
					justify-content: flex-start;
					width: 100%;
					cursor: pointer;
					border: none;
					background: none;
					@include zfont(1.25rem, 600, $dark);
					text-transform: capitalize;
					padding: 0;
					gap: 10px;
					.icon {
						width: fit-content;
						padding: 10px;
						margin: 0 5px;
						background-color: #dcdcdc;
						border-radius: 50%;
						@include zflex;
						.fa-icon {
							font-size: 1.25rem;
						}
					}
				}
			}
		}
	}
	.noti {
		position: relative;

		.noticon {
			cursor: pointer;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #eeeeee;
			@include zflex;
			.fa-icon {
				font-size: 1.75rem;
			}
		}
		.list {
			position: absolute;
			background-color: #fff;
			border-radius: 8px;
			padding: 8px;
			min-width: 250px;
			right: -30px;
			top: 65px;
			z-index: 5;
			display: none;
			box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
				rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
			&.activeNoti {
				display: block;
			}
			h2 {
				margin: 12px;
				@include zfont(1.5rem, 700, $dark);
			}
		}
	}
</style>
