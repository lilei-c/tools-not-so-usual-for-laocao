<template>
  <Layout />
</template>

<script setup>
import Layout from './layouts/Index.vue'
import { useRouter } from 'vue-router'
import { useStore } from './store/layout'
const router = useRouter()
const { addTab } = useStore()

router.beforeResolve((route) => {
  const { path, name } = route
  addTab({ path, name })
})
</script>
