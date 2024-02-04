<script lang="ts" setup>
	const props = defineProps({
		phone: { type: String, required: false, default: "" },
		status: { type: Boolean, required: true },
	});
	const accountStore = useAccountStore();
	const { refValue, open, close } = useToggle();

	const form = ref({
		phone: props.phone,
		password: "",
	});
	const token = ref("");
	async function updatePhone() {
		const data = { ...form.value };
		await accountStore.updatePhone(data);
	}
	function verifyPhone() {
		open();
		accountStore.createPhoneVerification();
	}
	function onPhoneVerify() {
		accountStore.verifyPhone(token.value);
		close();
	}
</script>

<template>
	<div class="account-phone">
		<AccountCard
			:verify="!status"
			:phone="phone"
			@saving="updatePhone"
			@verify="verifyPhone"
		>
			<template #display>
				<div class="display-info">
					<div class="dis-name">
						<span>phone</span>
						<p>{{ phone }}</p>
					</div>
					<p class="status">{{ status ? "Verified" : "Not Verified" }}</p>
				</div>
			</template>
			<template #edit>
				<BaseInput
					type="text"
					placeholder="+37100012345"
					required
					title="Phone"
					nom="phone"
					v-model="form.phone"
				/>
				<p class="helper">Country code with a leading + is a must</p>
				<BaseInput
					type="password"
					required
					title="Password"
					nom="password"
					v-model="form.password"
				/>
				<p class="helper">
					Password is Required. If you signed with google and you do not have
					password. please make password first
				</p>
			</template>
		</AccountCard>
		<Transition name="fade">
			<LazyBasePopUp class="del-main" v-if="refValue" @close="close">
				<div class="phone-verify">
					<form @submit.prevent="onPhoneVerify">
						<BaseInput
							type="password"
							required
							title="SMS Pin Code"
							nom="token"
							v-model="token"
							placeholder="######"
						/>
						<p class="helper">Please, enter the code you have recieved</p>

						<div class="form-act">
							<button type="button" @click="close" class="gh-btn">
								Cancel
							</button>
							<button type="submit" class="blu-sm-btn">Confirm</button>
						</div>
					</form>
				</div>
			</LazyBasePopUp>
		</Transition>
	</div>
</template>
<style lang="scss"></style>
