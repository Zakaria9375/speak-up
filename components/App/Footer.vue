<template>
	<footer id="footer">
		Copyright ©
		<NuxtLink to="/" class="logo-wrap">
			<div class="logo">
				<img src="/static/svg/logo.svg" alt="website logo" />
				<span>Speak up</span>
			</div> </NuxtLink
		>. All rights reserved.
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
		@include zfont(1.25rem, 500, #ccc);
		@include less($xsmS) {
			font-size: 1.125rem;
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
			@include less($xsmS) {
				img {
					display: none;
				}
				span {
					margin: 0;
				}
			}
		}
	}
</style>
