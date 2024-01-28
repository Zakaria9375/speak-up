<script lang="ts" setup>
	const { id } = defineProps({
		id: { type: String, required: true },
	});
	const profileStore = useProfileStore();

	const colId = ref("posts");
	const btns = ["threads", "posts"];

	const lastId = ref("");
	const displayedData = ref<any[]>([]);

	async function initData() {
		const { data } = await profileStore.getDocsByUserId(colId, id);
		if (data) {
			displayedData.value = [];
			displayedData.value.push(...data);
		}
	}

	async function switchArray(btn: string) {
		colId.value = btn;
		displayedData.value = [];
		await initData();
		// console.log(`switching to ${colId.value}`);
	}
	
	async function onLoadMore() {
		const l = displayedData.value.length;
		if (l >= 10) {
			// console.log("more");
			const lastdocument = displayedData.value[displayedData.value.length - 1];
			if (lastdocument) {
				lastId.value = lastdocument.$id;
			}
			const { data: more } = await profileStore.loadDocsByUserId(
				colId,
				id,
				lastId
			);
			if (more) {
				displayedData.value.push(...more);
			}
		}
	}

	initData();
</script>

<template>
	<div class="main-activity cardW">
		<div class="profile-header">
			<h4>your's recent activity</h4>
			<div class="filters">
				<div class="form-act">
					<button
						v-for="btn in btns"
						@click="switchArray(btn)"
						:class="{ 'active-filter': colId === btn }"
					>
						{{ btn }}
					</button>
				</div>
			</div>
		</div>
		<div class="activity-list">
			<div v-for="item in displayedData">
				<PostCard
					:onlineDisplay="false"
					:post="item"
					v-if="colId === 'posts'"
				/>
				<LazyProfileThread :thread="item" v-else />
			</div>
			<div v-zis="onLoadMore"></div>
		</div>
	</div>
</template>

<style lang="scss">
	.main-activity {
		@include more($lS) {
			flex: 1 1 67%;
		}
		width: 100%;
		.profile-header {
			@include zflex(row, wrap, space-between);
			padding: 0 12px 8px;
			@include less($smS) {
				@include zflex(column);
				padding: 0 12px 16px;
				h4 {
					align-self: flex-start;
				}
			}
			h4 {
				@include zfont(1.15rem, 600, $dark);
				text-transform: capitalize;
			}

			.form-act {
				align-self: flex-end;
				button {
					margin: 4px 8px;
					@include zfont(1.075rem, 600, $dark);
					@include zbtn($webD, 8px 12px);
					&:hover {
						background-color: $wnice;
					}
				}
				.active-filter {
					@include zbtn($bluclr, 8px 12px);
					color: #fff;
				}
			}
		}
	}
</style>
