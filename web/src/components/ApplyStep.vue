<script setup lang="ts">
defineOptions({
    name: 'ApplyStepComponent'
})

const props = defineProps<{
    current: number
}>()
</script>

<template>
    <a-steps
        :current="props.current"
        :items="[
            {
                title: '挑选用户名',
                description: '就是自己设置一个啦~',
                subTitle: '只能设置一次呢'
            },
            {
                title: '设置账号信息',
                description: '设置密码和昵称',
                subTitle: '要保管好哦'
            },
            {
                title: '键入邀请码',
                description: '效验邀请码',
                subTitle: '小朋友不可以乱注册哦'
            }
        ]"
    />
</template>
