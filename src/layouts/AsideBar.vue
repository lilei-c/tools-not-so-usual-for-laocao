<template>
  <div>
    <div
      class="fixed-stuff"
      :style="{
        width: realMenuWidth,
        overflow: 'hidden',
      }"
    ></div>
    <a-layout-sider
      class="layout-sider-cus"
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }"
      :collapsedWidth="collapsedMenuWidth"
      :width="expandMenuWidth"
      :collapsed="menuCollapsed"
      :trigger="null"
      collapsible
    >
      <!-- <div class="logo">
        <MenuUnfoldOutlined v-if="menuCollapsed" class="trigger" @click="toggle" />
        <MenuFoldOutlined v-else class="trigger" @click="toggle" />
      </div> -->
      <a-menu :selectedKeys="selectedKeys" :selectable="false" theme="dark" mode="inline">
        <a-menu-item v-for="item in routes" :index="item.path" :key="item.path" @click="this.$router.push(item.path)">
          <component :is="item.icon" />
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { routes } from '../router'
import { useStore, useStoreRefs } from '../store/layout'

const toggle = useStore().toggleMenuCollapsed

//
const { menuCollapsed, selectedKeys, expandMenuWidth, collapsedMenuWidth, realMenuWidth } = useStoreRefs()
</script>

<style lang="scss" scoped>
.layout-sider-cus {
  overflow: hidden;
}

.fixed-stuff {
  transition: width 0.2s;
}

.logo {
  padding: 16px;
  color: #fff;
}

:deep(.ant-layout-sider-children) {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

// ant-menu ant-menu-root ant-menu-inline ant-menu-dark
:deep(.ant-menu-dark) {
  overflow: hidden auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 100%, 0.2);
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgb(0 21 41 / 5%);
    -webkit-box-shadow: inset 0 0 5px hsl(0deg 0% 100% / 5%);
  }
  &::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.15);
    border-radius: 3px;
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgb(0 21 41 / 5%);
    -webkit-box-shadow: inset 0 0 5px rgb(37 37 37 / 5%);
  }
}
</style>
