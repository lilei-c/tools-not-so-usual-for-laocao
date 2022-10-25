<template>
  <div class="page">
    <div class="left">
      <div class="title">模块列表</div>
      <div class="mod-container">
        <div draggable="true" @dragstart="(e) => drag(e, mod)" class="moditem" v-for="mod in mods" :key="mod.title">
          {{ mod.title }}
        </div>
      </div>
    </div>
    <a-divider class="line" type="vertical" />
    <div class="right">
      <div class="title">自定义页面布局</div>
      <div class="panel" @drop="drop" @dragover="allowDrop">
        <div
          v-for="mod in selectedMods"
          :key="mod.title"
          class="selected-mod-item"
          draggable="true"
          @dragstart="(e) => drag(e, mod)"
          @resize="(e) => resize(e, mod)"
          :style="{
            top: (mod.offsetY || 0) + 'px',
            left: (mod.offsetX || 0) + 'px',
            height: mod.height || defaultHeight,
            width: mod.width || defaultWidth,
          }"
        >
          <div class="title">{{ mod.title }}</div>
          <div class="content">
            <div class="moditem" v-for="item in mod.items">
              <div class="block"></div>
              <div class="moditem-val">{{ item.fakeValue }}</div>
              <div class="moditem-title">{{ item.title }}</div>
              <div class="block"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'

const mods = ref([
  {
    title: '新增产品',
    items: [
      { title: '待办', fakeValue: '1' },
      { title: '待复核', fakeValue: '2' },
    ],
  },
  {
    title: '新增资产定义',
    items: [
      { title: '待办', fakeValue: '3' },
      { title: '待复核(新)', fakeValue: '4' },
    ],
  },
  {
    title: '新增指标项',
    items: [
      { title: '待复核', fakeValue: '3' },
      { title: '待复核(新)', fakeValue: '4' },
      { title: '待复核(配置化)', fakeValue: '5' },
    ],
  },
  {
    title: '新增产品指标',
    items: [
      { title: '待办', fakeValue: '1' },
      { title: '待复核', fakeValue: '2' },
    ],
  },
  {
    title: '生成监控',
    items: [
      { title: '基金待生成', fakeValue: '1' },
      { title: '理财待生成', fakeValue: '2' },
    ],
  },
  {
    title: '新增一事一议',
    items: [
      { title: '待复核', fakeValue: '3' },
      { title: '待复核(新)', fakeValue: '4' },
      { title: '待复核(配置化)', fakeValue: '5' },
    ],
  },
])

const [defaultHeight, defaultWidth] = ['200px', '200px']

const selectedMods = ref([])

const drag = (ev, x) => {
  console.log('拖动:', { ev, x })
  selectedMods.value
  ev.dataTransfer.setData('title', x.title)
  const { offsetX, offsetY } = ev
  console.log({ offsetX, offsetY })
  ev.dataTransfer.setData('offsetX', offsetX)
  ev.dataTransfer.setData('offsetY', offsetY)
}

const drop = (ev) => {
  ev.preventDefault()
  //
  const data = ev.dataTransfer.getData('title')
  const preOffsetX = ev.dataTransfer.getData('offsetX')
  const preOffsetY = ev.dataTransfer.getData('offsetY')
  console.log({ ev, data })
  //
  const theMod = mods.value.find((x) => x.title == data)
  const { offsetX, offsetY, clientX, clientY, layerX, layerY } = ev
  console.log({ preOffsetX, preOffsetY, offsetX, offsetY, ev })
  theMod.offsetX = offsetX - preOffsetX
  theMod.offsetY = offsetY - preOffsetY
  if (!selectedMods.value.some((x) => x.title == theMod.title)) selectedMods.value = [...selectedMods.value, theMod]
  console.log({ selectedMods, theMod })
}
const allowDrop = (ev) => {
  ev.preventDefault()
  const { offsetX, offsetY, clientX, clientY, layerX, layerY } = ev
  console.log({ offsetX, offsetY, clientX, clientY, layerX, layerY, ev })
}

const resize = (e, x) => {
  e.preventDefault()
  console.log(e, x)
  //   const theMod = mods.value.find((x) => x.title == data)
  // const { offsetX, offsetY, clientX, clientY, layerX, layerY } = ev
  // console.log({ preOffsetX, preOffsetY, offsetX, offsetY, ev })
  // theMod.offsetX = offsetX - preOffsetX
  // theMod.offsetY = offsetY - preOffsetY
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  height: 100%;
  .left {
    flex: 0 0 200px;
    padding: 10px;

    .mod-container {
      padding: 4px 8px;
      .moditem {
        padding: 4px 0;
        cursor: move;
      }
    }
  }
  .line {
    height: 100%;
  }
  .right {
    padding: 10px;
    .panel {
      height: 600px;
      width: 800px;
      background-color: #fff;
      margin-top: 10px;
      position: relative;
      .selected-mod-item {
        position: absolute;
        border: 1px solid rgb(240, 232, 232);
        cursor: move;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        resize: both;
        overflow: auto;
        .title {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1;
          color: #666;
          font-size: 16px;
        }
        .content {
          flex: 2 1;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .moditem {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            display: flex;
            height: 100%;
            .moditem-val {
              font-size: 28px;
              font-weight: bold;
              color: rgb(21, 196, 240);
              flex: 3;
              display: flex;
              align-items: center;
            }
            .moditem-title {
              color: #888;
              flex: 3;
              display: flex;
              align-items: center;
            }
            .block {
              flex: 1;
            }
          }
        }
      }
    }
  }
}
</style>
