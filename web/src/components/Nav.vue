<script setup lang="ts">
defineOptions({
    name: 'NavComponent'
})
</script>

<template>
    <div class="nav">
        <div class="item">
            <div class="title">
                <p @click="$router.push('/user')">Neko's Home Account Manager</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.nav {
    display: flex;
    align-items: center;
    background-color: #fff;
    height: 60px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .item {
        margin: 0 auto;
        width: 100%;
        max-width: 1200px;
        .title {
            p {
                font-size: 16px;
                font-weight: bold;
                display: inline-block;
                cursor: pointer;
                margin-bottom: 0;
            }
        }
    }
}

@media screen and (max-width: 1230px) {
    .nav {
        .item {
            padding: 0 15px;
        }
    }
}
</style>
