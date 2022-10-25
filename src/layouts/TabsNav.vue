<template>
  <router-view>
    <a-tabs
      :activeKey="activeTab"
      type="editable-card"
      class="tabs"
      hide-add
      @tabClick="router.push"
      @edit="onEdit"
      v-show="tabs.length"
    >
      <a-tab-pane v-for="pane in tabs" :key="pane.path" :tab="pane.name" :closable="pane.closable">
      </a-tab-pane> </a-tabs
  ></router-view>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { findIndex, propEq } from 'ramda'
import { useStoreRefs, useStore } from '../store/layout'
const { tabs, activeTab } = useStoreRefs()
const { delTab } = useStore()

const router = useRouter()

const onEdit = (targetKey, action) => {
  if (action === 'remove') {
    const index = findIndex(propEq('path', targetKey), tabs.value)
    if (index < 0) return
    if (targetKey == activeTab.value && tabs.value.length > 1) {
      // 关闭选中的tab后, 依次尝试选中右/左侧的tab
      if (index < tabs.value.length - 1) router.push(tabs.value[index + 1].path)
      if (index == tabs.value.length - 1) router.push(tabs.value[index - 1].path)
    }
    delTab(targetKey)
    // 关掉最后一个tab, 这里可以选择去主页, 或者啥也不做
    if (tabs.value.length <= 0) router.push('/')
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  background-color: #fff;
  padding-top: 6px;
}
:deep(.ant-tabs-nav-list) {
  padding-left: 16px;
}
</style>
