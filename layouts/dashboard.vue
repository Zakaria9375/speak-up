
<template>
	<div class="dash-layout">
		<NuxtLoadingIndicator color="#0284c7" :height="4" />
		<AppHeader />
		<div class="z-page z-clr board-content">
			<AppNav />
			<div class="dashboard-container">
				<slot></slot>
			</div>
		</div>
		<AppFooter />
		<LazyAppNotification />
		<AppGoBack/>
		<AppGoToTop />
	</div>
</template>

<style lang="scss">
	.dash-layout {
		.board-content {
			@include more(850px) {
				@include zflex;
				align-items: flex-start;
			}
		}
	}
</style>
