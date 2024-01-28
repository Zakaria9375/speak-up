<script lang="ts" setup>
	const { user } = defineProps({
		user: { required: true, type: Object },
	});
</script>

<template>
	<div v-if="user" class="profile-card">
		<div class="main">
			<div class="photo">
				<div class="user-avatar">
					<img :src="user.avatar" :alt="user.name" class="avatar-xlarge" />
				</div>
			</div>
			<div class="info">
				<h2 class="name">{{ user.name }}</h2>
				<div v-if="user.country" class="location">
					<fai icon="location-dot" class="fa-icon"></fai>
					<span>{{ user.country }}</span>
				</div>
			</div>
		</div>
		<div class="about">
			<h2>About</h2>
			<div class="bioP">
				<p class="bio">{{ user.bio ? user.bio : `No bio specified.` }}</p>
			</div>

			<div class="stats">
				<span
					>{{ user.posts?.length > 0 ? user.posts?.length : "no" }} post{{
						user.posts.length > 1 ? "s" : ""
					}}</span
				>
				<span
					>{{ user.threads?.length > 0 ? user.threads?.length : "no" }} thread{{
						user.posts.length > 1 ? "s" : ""
					}}</span
				>
			</div>
			<div class="member">
				<p>
					<span class="lead">Member since:</span>
					<BaseDate :act="true" :isoTimestamp="user.$createdAt" forma="ll" />
				</p>
				<p v-if="user.isActive" class="active-user">
					Status: <span>Online</span>
				</p>
				<p v-else>
					<span class="lead">Last visit at:</span>
					<BaseDate v-if="user.lastVisitAt" :isoTimestamp="user.lastVisitAt" />
				</p>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.profile-card {
		width: 100%;
		@include less($lS) {
			@include zflex(row, wrap, space-evenly, flex-end);
		}
		.main {
			.photo {
				@include zflex;
				.user-avatar {
					border-radius: 50%;
				}
			}
			.info {
				padding: 16px 12px 0px;
				.name {
					@include zfont(2.125rem, 700, $dark);
					text-align: center;
					margin: 0 0 10px;
				}
				.location {
					@include zflex;
					
					.fa-icon {
						margin-right: 16px;
						@include zfont(1.375rem, normal, $dark);
					}
					span {
						@include zfont(1.5rem, 500, $dark);
					}
				}
			}
		}
		.about {
			padding: 4px 12px 0;
			margin-bottom: 16px;
			.bioP {
				.bio {
					@include zfont(1.25rem, 500, $dark);
				}
			}
			.stats {
				@include zflex;
				margin: 20px 0;
				text-align: center;
				span {
					@include zfont(1.25rem, 400, $dark);
					flex-basis: 50%;
				}
			}
			.member {
				align-self: self-start;

				p {
					margin: 0 0 10px;
				}
				.active-user {
					@include zfont(1.125rem, 400, $dark);
					span {
						color: $greclr;
					}
				}
				span.lead {
					margin-right: 12px;
					@include zfont(1.15rem, 400, $dark);
				}
			}
		}
	}
</style>
