<script setup>
const currentYear = new Date().getFullYear();
</script>
<template>
	<MainNav />
	<slot></slot>
	<MainFooter />
</template>
