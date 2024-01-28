<template>
	<div>
		<NuxtLoadingIndicator color="#0284c7" :height="4" />
		<AppHeader />
		<slot></slot>
		<AppFooter />
	</div>
</template>
