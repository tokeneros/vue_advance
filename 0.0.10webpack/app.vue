<!-- webpack会将其编译成Render函数的形式 -->
<template>
    <div>Hello {{ name }}</div>
</template>

<script>
    export default {
        // data： function(){ 上下两个es 6语法一样
        data() {
            return {
                name: 'Vue.js'
            }
        }
    }
</script>

<!-- extract-text-webpack-plugin配置了，会同意提取并打包在main.css -->
<style scoped>
    div {
        color: #f60;
        font-size: 24px;
    }
</style>