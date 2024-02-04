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
					<img
						:src="user.avatar"
						onerror="this.onerror=null;this.src='/static/userPlaceholder.png';"
						:alt="user.name"
						class="avatar-xlarge"
					/>
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
			<h4>Bio</h4>
			<div class="bioP">
				<p class="bio">{{ user.bio ? user.bio : `No bio specified.` }}</p>
			</div>

			<div class="stats">
				<h4>Contributions</h4>
				<span
					>{{ user.posts?.length > 0 ? user.posts?.length : "no" }} post{{
						user.posts.length > 1 ? "s" : ""
					}}</span
				>
				<span
					>{{ user.threads?.length > 0 ? user.threads?.length : "no" }} thread{{
						user.threads.length > 1 ? "s" : ""
					}}</span
				>
			</div>
			<div class="member">
				<p v-if="user.isActive" class="active-user">
					Status: <span>Online</span>
				</p>
				<p v-else>
					<span class="lead">Last visit at</span>
					<BaseDate v-if="user.lastVisitAt" :isoTimestamp="user.lastVisitAt" />
				</p>
				<p>
					<span class="lead">Joined</span>
					<BaseDate :act="true" :isoTimestamp="user.$createdAt" forma="L" />
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
				padding: 16px 16px 0;
				.user-avatar {
					border-radius: 50%;
				}
				@include less(530px) {
					width: 100%;
				}
			}
			.info {
				padding: 12px 16px 16px;
				@include less(530px) {
					width: 100%;
				}
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
			padding: 8px 16px 8px;
			border-top: 1px solid #ddd;
			@include between(530px, $lS) {
				border-top: none;
			}
			@include less(530px) {
				width: 100%;
			}
			margin-bottom: 16px;
			h4 {
				@include zfont(1rem, 400, $graclr);
				margin-top: 8px;
				margin-bottom: 8px;
			}
			.bioP {
				padding: 0 12px;
				.bio {
					@include zfont(1.25rem, 500, $dark);
					margin-top: 12px;
					margin-bottom: 12px;
				}
			}
			.stats {
				padding: 8px 0 12px 0;
				border-top: 1px solid #f1f1f1;
				border-bottom: 1px solid #f1f1f1;
				text-align: left;
				span {
					@include zfont(1.25rem, 400, $dark);
					display: block;
					padding: 4px 12px;
				}
			}
			.member {
				padding-top: 8px;
				p {
					margin: 8px 0 0;
				}
				.active-user {
					@include zfont(1.125rem, 400, $dark);
					span {
						color: $greclr;
					}
				}
				span.lead {
					margin-right: 16px;
					min-width: 95px;
					display: inline-block;
					@include zfont(1.15rem, 400, $dark);
				}
			}
		}
	}
</style>
