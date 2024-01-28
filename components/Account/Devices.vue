<script lang="ts" setup>
	const { refValue, open, close } = useToggle();
	const accountStore = useAccountStore();
	const devices = await accountStore.getAllSessions();
	function deleteDevice(id: string) {
		accountStore.deleteSession(id);
		close();
	}
</script>

<template>
	<div class="acc-card">
		<h2 class="card-title">Devices</h2>
		<div class="card-icon">
			<img src="/static/account/device.png" alt="devices Icon" />
		</div>
		<div class="card-content">	
			<p>Review your logged in devices.</p>
			<button type="button" @click="open" class="nobtn">
				Manage Devices >
			</button>
		</div>
	</div>
	<LazyBasePopUp class="del-main" v-if="refValue" @close="close">
		<div class="msg">
			<h1>Your devices</h1>
			<p>Where you're signed in</p>
			<div class="devices">
				<div v-for="device in devices" class="device">
					<div class="device-main">
						<div class="type">
							<fai
								:icon="
									device.deviceName === 'desktop'
										? 'laptop'
										: 'mobile-screen-button'
								"
								class="fa-icon"
							></fai>
							<div v-if="device.current" class="current">
								<fai icon="circle-check" class="c-icon" />Current
							</div>
						</div>
						<div class="info">
							<div>{{ device.osName }}</div>
							<div>{{ device.countryName }}</div>
							<div>{{ device.clientName }}</div>
							<BaseDate
								:isoTimestamp="device.$createdAt"
								:act="true"
								forma="ll"
								class="datee"
							/>
						</div>
					</div>

					<div class="logout">
						<button type="button" @click="deleteDevice(device.$id)" aria-label="Log out from this device">
							<fai icon="arrow-right-from-bracket" class="fai"/>Sign out
						</button>
					</div>
				</div>
			</div>
		</div>
	</LazyBasePopUp>
</template>
<style lang="scss">
	.msg {
		padding: 16px;
		h1 {
			text-align: center;
			padding-bottom: 8px;
			margin: 0;
			@include zfont(1.375rem, 500, $dark);
		}
		p {
			text-align: center;
			@include zfont(1.125rem, 400, #333);
			margin: 0;
			padding-bottom: 16px;
		}
		.devices {
			@include zflex(row, wrap, center);
			gap: 16px;
			.device {
				width: 200px;
				height: 172px;
				padding: 12px;
				margin: 8px;
				border: 0.5px solid #eee;
				border-radius: 8px;
				.device-main {
					@include zflex;
					gap: 8px;
					align-items: flex-end;
					.type {
						@include zflex(column);

						.fa-icon {
							@include zfont(2.65rem, normal, $bluclr);
							padding: 16px;
						}
						.current {
							@include zfont(0.875rem, 300, $bdclr);
							padding: 4px 0 0;
							.c-icon {
								@include zfont(0.875rem, 300, $bluclr);
								margin-right: 4px;
							}
						}
					}
					.info {
						text-align: center;
						line-height: 1.3;
						.datee {
							font-size: 0.875rem !important;
							padding-top: 4px;
							opacity: 0.8;
						}
					}
				}
				.logout {
					@include zflex;
					padding: 16px 4px 0;
					.fai {
						margin-right: 8px;
					}
					button {
						@include zbtn(#fafafa, 8px 12px);
						@include zfont(1rem, 400, $dark);
						box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
							rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
					}
				}
			}
			@include less($smS) {
				justify-content: center;
			}
		}
	}
</style>
