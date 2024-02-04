<script lang="ts" setup>
	const props = defineProps({
		email: { type: String, required: true },
		status: { type: Boolean, required: true },
	});
	const accountStore = useAccountStore();
	const form = ref({
		email: props.email,
		password: "",
	});
	const { refValue, open, close } = useToggle();
	function updateEmail() {
		const data = { ...form.value };
		accountStore.updateEmail(data);
	}
	function verifyEmail() {
		open();
		accountStore.createEmailVerification();
	}
</script>

<template>
	<div class="account-phone account-email">
		<AccountCard
			:verify="!status"
			:phone="email"
			@saving="updateEmail"
			@verify="verifyEmail"
		>
			<template #display>
				<div class="display-info">
					<div class="dis-name">
						<span>email</span>
						<p>{{ email }}</p>
					</div>
					<p class="status">{{ status ? "Verified" : "Not Verified" }}</p>
				</div>
			</template>
			<template #edit>
				<BaseInput
					type="email"
					required
					title="email"
					nom="email"
					v-model="form.email"
				/>
				<BaseInput
					type="password"
					required
					title="Password"
					nom="password"
					v-model="form.password"
				/>
				<p class="helper">Password is Required for your own security</p>
			</template>
		</AccountCard>
	</div>
	<Transition name="fade">
		<LazyBasePopUp class="del-main" v-if="refValue" @close="close">
			<div class="res-msg">
				<div class="res-photo">
					<img src="/static/email/msg-r.png" alt="new massage" />
				</div>
				<p class="v-text">
					An email has been sent to you. Please, check your email to complete
					verification process.
				</p>
			</div>
		</LazyBasePopUp>
	</Transition>
</template>
<style lang="scss">
	.res-msg {
		@include zflex(column);
		.res-photo {
			@include zflex(column);
			img {
				max-width: 250px;
				max-height: 250px;
			}
		}
		.v-text {
			text-align: center;
		}
	}
</style>
