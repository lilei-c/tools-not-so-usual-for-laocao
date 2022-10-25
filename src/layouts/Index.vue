<template>
  <a-layout style="min-height: 100vh" has-sider>
    <AsideBar />
    <a-layout>
      <HeaderX />
      <TabsNav />
      <a-layout-content>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <KeepAlive>
              <component :is="Component" />
            </KeepAlive>
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import AsideBar from './AsideBar.vue'
import HeaderX from './HeaderX.vue'
import TabsNav from './TabsNav.vue'
</script>
