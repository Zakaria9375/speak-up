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
