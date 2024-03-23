<script setup lang="ts">
import NavComponent from '@/components/Nav.vue'

defineOptions({
    name: 'App'
})
</script>
<template>
    <a-config-provider
        :theme="{
            token: {
                colorPrimary: '#F9638E',
                colorLink: '#F9638E',
                colorLinkHover: '#FCA1BB',
                colorLinkActive: '#F9638E'
            }
        }"
    >
        <div class="app">
            <div class="nav">
                <nav-component />
            </div>
            <div class="content">
                <router-view />
            </div>
        </div>
    </a-config-provider>
</template>

<style scoped lang="less">
.app {
    display: flex;
    flex-direction: column;

    .content {
        margin: 0 auto;
        padding: 15px;
        flex: 1;
        width: 100%;
        max-width: 1200px;
    }
}
</style>
