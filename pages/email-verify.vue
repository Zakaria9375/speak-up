<script lang="ts" setup>
	definePageMeta({
		layout: "just-footer",
	});
const accountStore = useAccountStore()
const route = useRoute()
const router = useRouter()
const verified = ref(false)
async function verifyEmail(token:string) {
	await accountStore.verifyEmail(token)
	verified.value = true
	router.push("/auth/login")
}
onMounted(() => {
	const token = route.query.secret?.toString()
	if(token) {
		verifyEmail(token)
	}
})
</script>
<template>
	<BaseLoading class="p-page" v-if="!verified" />
	<div v-else class="p-page v-page p-23">
		<div class="container">
			<div class="photo">
				<img src="/static/email-verify/confirmed.png" alt="verified email" />
			</div>
			<p class="v-text">Your acccount has been Verified</p>
		</div>
	</div>
</template>
<style lang="scss">
.v-page {
	@include zflex(column);
	.container {
		@include zflex(column);
		.photo {
			max-width: 300px;
			max-height: 500px;
		}
		.v-text {
			@include zfont(2rem, 500, #666);
		}
	}
}
</style>
