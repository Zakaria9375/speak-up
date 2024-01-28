<template>
	<div class="loader-page">
<span class="loader">Loading</span>	</div>
</template>
<style lang="scss">
.loader-page {
	@include zflex;
	background-color: #fff;
}
.loader {
  color: #263038;
  display: inline-block;
  position: relative;
  font-size: 48px;
  box-sizing: border-box;
}
.loader::after {
  content: '';  
  width: 5px;
  height: 5px;
  background: currentColor;
  position: absolute;
  bottom: 10px;
  right: -5px;
  box-sizing: border-box;
  animation: animloader 1s linear infinite;
}

@keyframes animloader {
  0% {
    box-shadow: 10px 0 rgba(0, 0, 0, 0), 20px 0 rgba(0, 0, 0, 0);
  }
  50% {
    box-shadow: 10px 0 #263038, 20px 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 10px 0 #263038, 20px 0 #263038;
  }
}
</style>