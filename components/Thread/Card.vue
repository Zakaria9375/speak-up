<script lang="ts" setup>
const { thread } = defineProps({
	thread: { type: Object, required: true },
	onlineDisplay: { required: false, type: Boolean, default: true },
})
</script>
<template>
	<div class="all">
		<div class="t-title">
			<h1 class="list-title">{{ thread.title }}</h1>
		</div>
		<div class="post firstPostStyle">
			<div class="post-detail">
				<div class="u-info">
					<nuxt-link :to="`/dashboard/profile/${thread.madeBy?.$id}`" class="user">
						<img class="xxavatar" :src="thread.madeBy?.avatar" alt="post.madeBy.username" />
						<div class="user-n">
							<span v-if="thread.madeBy?.isActive && onlineDisplay" class="online"
								><img class="online" src="/static/online.png" alt="online" /></span
							>{{ thread.madeBy?.name }}
						</div>
					</nuxt-link>
				</div>
				<p class="p-content">{{ thread.content }}</p>
			</div>
			<div class="date">
				<BaseDate :isoTimestamp="thread.$createdAt" />
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.post {
	background-color: #fff;
	box-shadow:
		rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
		rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
	margin-bottom: 8px;
	border-radius: 8px;
	overflow: hidden;
	position: relative;
	@include more($mS) {
		.post-detail {
			display: grid;
			grid-template-columns: minmax(175px, 200px) auto;
			.u-info {
				min-height: 165px;
				@include zflex(column, wrap, center, center);
				text-align: center;
				background-color: #efefef;
				.xxavatar {
					border-radius: 50%;
					max-width: 100%;
					width: 120px;
					height: 120px;
				}
			}
			.p-content {
				position: relative;
				flex: 1;
				padding: 16px 40px 40px 16px;
				@include zfont(1.125rem, 400, $dark);
				margin: 0;
				line-height: 1.4;
				text-align: justify;
			}
		}
		.edit-btns {
			@include zflex;
			flex-direction: column;
			position: absolute;
			right: 0;
			top: 35px;
			background-color: $web;
			border-top-left-radius: 6px;
			border-bottom-left-radius: 6px;

			border: 0.5px solid $web;
			padding: 10px;
			.editA:first-child {
				margin-bottom: 15px;
			}
			i {
				color: $bluclr;
			}
		}
		.date {
			position: absolute;
			right: 0;
			bottom: 0;
			padding: 10px;
		}
	}
	@include less($mS) {
		.post-detail {
			.u-info {
				background-color: #ced4da;
				.user {
					@include zflex(row, nowrap, flex-start, center);
					padding: 6px;
					.xxavatar {
						border-radius: 50%;
						max-width: 100%;
						width: 45px;
						height: 45px;
					}
					.user-n {
						@include zfont(1.125rem, 400, $dark);
					}
				}
			}
			.p-content {
				padding: 16px 16px 40px;
				@include zfont(1.125rem, 400, $dark);
				margin: 0;
				line-height: 1.4;
				text-align: justify;
			}
		}
		.edit-btns {
			@include zflex;

			gap: 10px;
			position: absolute;
			right: 5px;
			top: 10px;
			padding: 10px;
			i {
				color: $bluclr;
			}
		}
		.date {
			position: absolute;
			right: 0;
			bottom: 0;
			padding: 10px;
		}
	}
}

.firstPostStyle {
	border: 1px solid #000;
}
</style>
