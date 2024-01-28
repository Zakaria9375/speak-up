<script lang="ts" setup>
	const emit = defineEmits(["cancel"]);
	const authStore = useAuthStore();
	const profileStore = useProfileStore();

	//5 refs for 5 changes in profile fields
	const activeUser = ref<User>(authStore.authUser);
	const newRandomPhoto = ref(activeUser.value?.avatar);
	const selectedFile = ref<File>();
	const newBio = ref(activeUser.value?.bio);
	const userLocation = ref(activeUser.value?.country);

	//saving functions
	function save() {
		if (selectedFile.value) {
			profileStore.updatePhoto(selectedFile.value, activeUser.value);
		}
		if (newBio.value !== activeUser.value?.bio) {
			profileStore.updateBio(activeUser.value.$id, newBio.value);
		}
		if (userLocation.value !== activeUser.value?.country) {
			profileStore.updateLocation(activeUser.value.$id, userLocation.value);
		}
		if (newRandomPhoto.value !== activeUser.value?.avatar) {
			profileStore.updateAvatar(activeUser.value, newRandomPhoto.value);
		}
		emit("cancel");
	}

	//file from desktop
	function savefileValue(file: File) {
		selectedFile.value = file;
	}

	//random img preview
	function changeImg(load: any) {
		newRandomPhoto.value = load.webformatURL;
	}

	//Subscibing to profile changes
	onMounted(async () => {
		const appWrite = useAppWrite();
		const channel: string[] = [
			`databases.appData.collections.users.documents.${activeUser.value?.$id}`,
			"account",
		];
		appWrite.client.subscribe(channel, async () => {
			await authStore.getAuthUser();
		});
	});
</script>
<template>
	<div>
		<div v-if="activeUser" class="profile-update">
			<div class="photo-profile">
				<img :src="newRandomPhoto" :alt="activeUser.name" class="img-update" />
			</div>

			<section class="update">
				<div class="info">
					<h2>{{ activeUser.name }}</h2>
				</div>
				<form @submit.prevent="save">
					<div class="inputs">
						<div class="file-input">
							<BaseInputFile
								title="Update photo"
								@fileValue="savefileValue"
								helper="Allowed file extension: jpg, png, gif, svg with maximum 5
								mega-byte"
							/>
						</div>
						<ProfileRandomAvatar @hit="changeImg" />
						<BaseInput nom="location" title="Location" v-model="userLocation" />
						<BaseInput
							nom="bio"
							title="Bio"
							:isTextarea="true"
							placeholder="Write about yourself"
							v-model="newBio"
							:maxlength="256"
						/>
						<div class="text-counter">{{ newBio.length }} / 256</div>
					</div>

					<div class="form-act">
						<button
							type="button"
							class="gh-btn"
							@click="emit('cancel')"
							aria-label="Cancel editing profile"
						>
							cancel
						</button>
						<button
							type="submit"
							class="blu-sm-btn"
							aria-label="Save profile changes"
						>
							Save
						</button>
					</div>
				</form>
			</section>
		</div>
	</div>
</template>
<style lang="scss">
	.profile-update {
		position: relative;

		.photo-profile {
			position: absolute;
			top: -100px;
			border-radius: 50%;
			left: calc(50% - 60px);
			.img-update {
				border-radius: 50%;
				max-width: 100%;
				width: 120px;
				height: 120px;
			}
		}
		section.update {
			padding: 36px 8px 8px;
			.info {
				@include zflex;
				h2 {
					margin-bottom: 12px;
					margin-top: 0;
				}
			}
		}
	}
</style>
