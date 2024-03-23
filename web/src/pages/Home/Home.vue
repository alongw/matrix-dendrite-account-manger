<script setup lang="ts">
import MatrixLogoComponent from '@/components/MatrixLogo.vue'

defineOptions({
    name: 'HomePage'
})
</script>

<template>
    <div class="home">
        <div class="logo">
            <matrix-logo-component />
        </div>
        <div class="item">
            <div class="title">
                <h1>Neko's Home Account Manager</h1>
            </div>
            <div class="sub-title">
                <h2>基于 Matrix Dendrite 的账户管理器</h2>
            </div>
            <div class="button-group">
                <a-button type="link" size="large" @click="$router.push('/user')">
                    立即开始
                </a-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.home {
    .logo {
        margin: 25px auto;
        width: 100%;
        max-width: 30%;
    }

    .item {
        text-align: center;
    }
}

@media screen and (max-width: 500px) {
    .home {
        .logo {
            max-width: 70%;
        }

        .item {
            .title {
                h1 {
                    font-size: 24px;
                }
            }

            .sub-title {
                h2 {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
