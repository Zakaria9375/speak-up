<script lang="ts" setup>
	definePageMeta({
		layout: "dashboard",
	});
	const profileStore = useProfileStore();
	const { data: users, isReady, isLoading } = await profileStore.getUsersList();
</script>

<template>
	<div class="all-profiles p-32">
		<div v-if="isReady" class="users-list">
			<div class="s-user" v-for="user in users">
				<div class="photo">
					<img
						class="pic"
						:src="user.avatar"
						onerror="this.onerror=null;this.src='/static/userPlaceholder.png';"
						:alt="user.name"
					/>
				</div>

				<div class="user-n">
					<div>
						<span v-if="user.isActive" class="online"
							><img
								class="online"
								src="/static/online.png"
								alt="online" /></span
						>{{ user.name }}
					</div>
					<div class="location">{{ user.country }}</div>
				</div>
				<div class="info">
					<div class="stat">
						<fai icon="newspaper" class="fa-icon" />
						<span
							>{{
								user.threads?.length > 0 ? user.threads?.length : "no"
							}}
							thread{{ user.threads.length > 1 ? "s" : "" }}</span
						>
					</div>
					<div class="stat">
						<fai icon="pen-to-square" class="fa-icon" />
						<span
							>{{ user.posts?.length > 0 ? user.posts?.length : "no" }} post{{
								user.posts.length > 1 ? "s" : ""
							}}</span
						>
					</div>
				</div>
				<div class="joined">
					<p>
						<span class="lead">Joined</span>
						<BaseDate :act="true" :isoTimestamp="user.$createdAt" forma="L" />
					</p>
				</div>
				<div class="visit form-act">
					<NuxtLink :to="`/dashboard/profile/${user.$id}`" class="profile-btn">Profile</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.all-profiles {
	@include zflex;
}
	.users-list {
		padding: 0 16px;
		gap: 16px;
		@include more($lS) {
			@include zflex(row, wrap, center, flex-start);
		}
		@include between(850px, $lS) {
			@include zflex(row, wrap, space-evenly, flex-start);
			.s-user {
				min-width: 200px;
			}
		}
		@include less(850px) {
			@include zflex(row, wrap, space-evenly, flex-start);
			.s-user {
				min-width: 220px;
			}
		}
		.s-user {
			
			background-color: #fff;
			border-radius: 8px;
			padding: 16px;
			min-height: 390px;
			text-align: center;
			.photo {
				@include zflex;
				.pic {
					width: 120px;
					height: 120px;
					border-radius: 50%;
					box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
				}
			}
			.user-n {
				border-bottom: 1px solid #eee;
				padding: 16px 8px;
				@include zfont(1.125rem, 400, $dark);
				.location {
					margin-top: 8px;
					@include zfont(1rem, 400, #888);
				}
			}
			.info {
				text-align: left;
				padding: 16px 16px 0;
				.stat {
					padding: 0 0 12px;
					.fa-icon {
						@include zfont(1rem, normal, #555);
						margin-right: 12px;
					}
					span {
						@include zfont(1rem, normal, #444);
					}
				}
			}
			.joined {
				text-align: left;
				padding: 8px 8px 4px;
				p {
					margin: 0;
				}
				.lead {
					margin-right: 12px;
				}
			}
			.visit {
				padding-top: 12px;
				.profile-btn {
					@include zbtn(#1d3b6d, 8px 12px);
					@include zfont(1rem, 400, #fff);
				}
			}
			@include more($lS) {
				min-width: 260px;
			}
			@include less(475px) {
				width: 100%;
				// margin: 16px;
			}
		}
		
	}
</style>
