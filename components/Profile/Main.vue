<script lang="ts" setup>
	const authStore = useAuthStore();
	const profileStore = useProfileStore();
	const appWrite = useAppWrite();
	const { refValue, open, close } = useToggle();

	// id as string is this your profile?
	const { id } = defineProps({
		id: { type: String, required: true },
	});
	const isAuthUser = computed(() => id === authStore.authId);

	//user ref
	const user = ref<User>();

	//Subscribing to database user document
	onMounted(async () => {
		const { data } = await profileStore.getUser(id);
		user.value = data;
		const channel: string[] = [
			`databases.appData.collections.users.documents.${id}`,
		];
		appWrite.client.subscribe(channel, async () => {
			const { data } = await profileStore.getUser(id);
			user.value = data;
		});
	});
</script>

<template>
	<div v-if="user" class="main-profile cardW">
		<ProfileCard :user="user" />
		<button
			@click="open"
			v-if="isAuthUser"
			class="blu-btn"
			aria-label="Edit your profile"
		>
			<span class="pen"><fai class="fa-icon" icon="pencil"></fai></span>Edit
			Profile
		</button>
	</div>
	<LazyBasePopUp v-if="refValue" class="del-main" @close="close">
		<ProfileEdit v-if="user" @cancel="close" />
	</LazyBasePopUp>
</template>
<style lang="scss">
	.main-profile {
		@include more($lS) {
			flex: 0 0 30%;
		}
		width: 100%;
		min-width: 270px;
		@include zflex(column, nowrap, center, center);

		.blu-btn {
			margin: 16px 0;
			.pen {
				@include zfont(1.125rem, normal, #fff);
				margin: 0 12px 0 0;
			}
		}
	}
</style>
