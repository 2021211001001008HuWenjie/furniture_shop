<template>
	<div>首页</div>
</template>

<script setup>
import axios from 'axios'

axios.get("/adminapi/user/home").then(res => {
	console.log(res.data)
})
</script>

<style>
</style>