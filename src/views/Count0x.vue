<template>
  <div class="page">
    <a-textarea
      class="card"
      v-model:value="input"
      placeholder="Autosize height with minimum and maximum number of lines"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
    <a-alert class="card" :message="nums.join(' ')" type="info" />
    <div class="card">
      <div class="title">字节数</div>
      <a-alert class="card" :message="nums.length" type="success" />
    </div>
    <div class="card">
      <div class="title">16进制</div>
      <a-alert class="card" :message="nums.length && count.toString(16)" type="success" />
    </div>
    <div class="card">
      <div class="title">10进制</div>
      <a-alert class="card" :message="nums.length && count.toString(10)" type="success" />
    </div>
    <a-alert class="card" v-if="someError" message="请检查数据正确性" type="error" />
  </div>
</template>

<script setup>
import { splitEvery, sum } from 'ramda'
import { computed, ref } from 'vue'
const input = ref('')

const nums = computed(() => splitEvery(2, input.value.replace(/[\r\n]/g, '').replaceAll(' ', '')))
const count = computed(() => sum(nums.value.map((x) => `0x${x.trim()}`)))
// setInterval(() => {
//   console.log(input.value.replace(/^\s*/g, '').replace(/[\r\n]/g, ''))
//   console.log(nums.value)
// }, 1000)
const someError = computed(() => isNaN(count.value))
</script>

<style scoped>
.page {
  padding: 20px;
}
.card + .card {
  margin-top: 10px;
}

.title {
  color: #666;
}
</style>
