<script lang="ts" setup>
	definePageMeta({
		layout: "dashboard",
	});
	const profileStore = useProfileStore();
	const { data: users, isReady, isLoading } = await profileStore.getUsersList();
</script>

<template>
	<div v-if="isReady" class="users-list p-32">
		<div class="s-user" v-for="user in users">
			<NuxtLink :to="`/dashboard/profile/${user.$id}`">
				<img class="pic" :src="user.avatar" alt="post.madeBy.username" />
				<div class="user-n">
					<span v-if="user.isActive" class="online"
						><img class="online" src="/static/online.png" alt="online" /></span
					>{{ user.name }}
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<style lang="scss">
	.users-list {
		@include zflex(row, wrap, flex-start, flex-start);
		padding: 16px;
		gap: 16px;
		.s-user {
			margin: 16px;
			background-color: #fff;
			border-radius: 8px;
			padding: 8px;
			a {
				// @include zflex(column, wrap, center, center);
				text-align: center;
				.pic {
					width: 150px;
					height: 150px;
					max-width: 100%;
					max-height: 100%;
					border-radius: 50%;
				}
				.user-n {
					border-top: 1px solid $webD;
					padding: 16px 8px;
					@include zfont(1.25rem, 400, $dark);
				}
			}
		}
		@include less(460px) {
			padding: 16px;
			@include zflex(row, wrap, center, flex-start);
			gap: 0;
			.s-user {
				width: 100%;
				a {
					@include 	zflex;
					.pic {
						width: 120px;
						height: 120px;
					}
					.user-n {
						border-top: none;
					}
				}
			}
		}
	}
</style>
