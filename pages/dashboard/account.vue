<script lang="ts" setup>
	definePageMeta({
		layout: "profile",
	});
	const {
		refValue: deleteAccount,
		open: openDelete,
		close: closeDelete,
	} = useToggle();
	const appWrite = useAppWrite();
	const authStore = useAuthStore();
	const authUser = computed(() => authStore.authUser);
	const authAccount = computed(() => authStore.authAccount);
	function deleteMyAccount() {
		authStore.deleteAccount();
	}
	onMounted(() => {
		appWrite.client.subscribe("account", () => authStore.getAuthUser());
	});
	console.log(await appWrite.account.get());
</script>

<template>
	<div class="account-page z-page p-48">
		<div class="container">
			<div class="account-content">
				<div class="sides">
					<AccountPassword />
					<AccountDevices />
				</div>
				<div class="elements">
					<AccountName v-if="authUser" :name="authUser.name" />
					<AccountEmail
						v-if="authAccount"
						:email="authAccount.email"
						:status="authAccount.emailVerification"
					/>
					<AccountPhone
						v-if="authAccount"
						:phone="authAccount.phone"
						:status="authAccount.phoneVerification"
					/>
					<div class="acc-delete">
						<div class="info-delete">
							<span>Delete your account</span>
							<p>
								If you delete your account, your personal information and your
								data will be wiped from our servers. This action cannot be
								undone!
							</p>
						</div>

						<div class="form-act">
							<button type="button" class="nobtn del-btn" @click="openDelete">
								Delete Account
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Transition name="fade">
		<LazyBasePopUp class="del-main" v-if="deleteAccount" @close="closeDelete">
			<div class="del-content">
				<p>Are you sure you want to delete your account?</p>
				<div class="form-act">
					<button @click="closeDelete" class="gh-btn">Cancel</button>
					<button @click="deleteMyAccount" class="red-sm-btn">Confirm</button>
				</div>
			</div>
		</LazyBasePopUp>
	</Transition>
</template>
<style lang="scss">
	.account-page {
		background-color: #f7f7f7;
		.container {
			.account-content {
				padding: 8px;
				.sides {
					@include between($smS, $mS) {
						@include zflex;
						gap: 10px;
					}
				}
				@include zflex(row, wrap, center, flex-start);
				column-gap: 16px;
				.elements {
					background-color: #fff;
					flex: 1;
					padding: 16px;
					max-width: 100%;
					border: 1px solid #ccc;
					border-radius: 8px;
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
					.acc-delete {
						.info-delete {
							padding-right: 16px;
							span {
								@include zfont(1.325rem, 500, $gra2clr);
								margin-right: 16px;
							}
							p {
								@include zfont(1.125rem, 400, $wdark);
								line-height: 1.4;
							}
						}
						.form-act {
							.del-btn {
								@include zfont(1.25rem, 500, #333);
								border: 1px solid #999;
								padding: 8px 16px;
								border-radius: 8px;
								&:hover {
									background-color: #bf280d;
									border: 1px solid #bf280d;
									color: #fff;
								}
							}
						}
					}
				}
			}
		}
	}

	.del-content {
		p {
			@include zfont(1.5rem, 400, #333);
			padding: 16px;
		}
	}
</style>
