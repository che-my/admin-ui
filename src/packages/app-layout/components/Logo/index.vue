<script setup name="Logo" lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import imgLogo from '@/assets/images/logo.png'
import { useStore } from 'my-lib/utils/store'
defineProps({
    showLogo: {
        type: Boolean,
        default: true
    },
    showTitle: {
        type: Boolean,
        default: true
    }
})
const { settingsState } = useStore().settings
const title = ref(settingsState.title)
const logo = ref(imgLogo)

console.log(getCurrentInstance())

const to = computed(() => {
    let rtn:any = {}
    if (settingsState.dashboard.enable) {
        rtn.path = settingsState.dashboard.path
    }
    return rtn
})
</script>

<template>
  <router-link :to="to" class="title" :class="{'is-link': settingsState.dashboard.enable}" :title="title">
    <img v-if="showLogo" :src="logo" class="logo">
    <span v-if="showTitle">{{ title }}</span>
  </router-link>
</template>

<style lang="scss" scoped>
.title {
  position: fixed;
  z-index: 1000;
  top: 0;
  width: inherit;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: $g-sidebar-logo-height;
  text-align: center;
  overflow: hidden;
  text-decoration: none;
  &.is-link {
    cursor: pointer;
  }
  .logo {
    width: 30px;
    height: 30px;
    & + span {
      margin-left: 10px;
    }
  }
  span {
    display: block;
    font-weight: bold;
    color: #fff;
    @include text-overflow;
  }
}
</style>
