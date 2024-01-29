<template>
	<footer id="footer">
		Copyright ©
		<NuxtLink to="/" class="logo-wrap">
			<div class="logo">
				<img src="/static/svg/logo.svg" alt="website logo" />
				<span>Speak up </span>
			</div> </NuxtLink
		>. <span class="rights"> All rights reserved.</span>
	</footer>
</template>

<style lang="scss">
	#footer {
		@include zflex;
		background-color: #333;
		height: 70px;
		color: #ccc;
		padding: 17px 0;
		text-align: center;
		border-top: solid 1px #555;
		&,
		a,
		span.rights {
			@include zfont(1.25rem, 500, #ccc);
		}
		span.rights {
			margin-left: 8px;
			@include less(450px) {
				display: none;
			}
		}

		.logo {
			padding: 0 0 0 8px;
			@include zflex;
			img {
				display: inline-block;
				width: 32px;
				height: 32px;
			}
			span {
				margin-left: 8px;
				@include zfont(1.25rem, 500, #ccc);
			}
		}
	}
</style>
