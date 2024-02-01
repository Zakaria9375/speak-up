<script lang="ts" setup>
	const authStore = useAuthStore();
	const signWithGoogle = () => {
		authStore.googleLogin()
	};
</script>

<template>
	<div>
		<button type="button" class="nobtn google-btn" @click="signWithGoogle">
			<img src="/static/signIn/google.png" alt="google" /> Continue with Google
		</button>
	</div>
</template>
<style lang="scss">
.google-btn {
	@include zfont(1.375rem, 500, #666);
	margin-top: 16px;
	padding: 12px 16px;
	border-radius: 8px;
	cursor: pointer;
	@include zflex;
	background-color: #fff;
	border: 1px solid #999;
	&:hover {
		background-color: $bluclr;
		color: #fff;
	}
	img {
		margin-right: 10px;
		width: 20px;
	}
}

</style>