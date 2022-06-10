<script setup lang="ts">
import SvgIcon from 'my-lib/svg-icon/index.vue'
import { ref, computed, onUnmounted, onMounted } from 'vue'
import { compile } from 'path-to-regexp'
import Tools from '../Tools/index.vue'
import { useStore } from 'my-lib/utils/store'
import { useInjectRoute, topBarComputed } from 'my-lib/utils/hooks'
const route = useInjectRoute()
const { settings } = useStore()
const { settingsState, toggleSidebarCollapse } = settings
const { enableSidebarCollapse, breadcrumbList } = topBarComputed()
const scrollTop = ref(0)
onMounted(() => {
    window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})
function onScroll() {
    scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
}

function pathCompile(path:string) {
    let toPath = compile(path)
    return toPath(route?.params)
}
</script>

<template>
  <div
    class="topbar-container" :class="{
      'fixed': settingsState.topbar.fixed,
      'shadow': scrollTop
    }" data-fixed-calc-width
  >
    <div class="left-box">
      <div v-if="enableSidebarCollapse" class="sidebar-collapse" :class="{'is-collapse': settingsState.menu.subMenuCollapse}" @click="toggleSidebarCollapse()">
        <el-icon>
          <SvgIcon name="toolbar-collapse" />
        </el-icon>
      </div>
      <el-breadcrumb v-if="settingsState.topbar.enableBreadcrumb && settingsState.mode === 'pc'">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path" :to="index < breadcrumbList.length - 1 ? pathCompile(item.path) : ''">
            {{ item.title }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <Tools />
  </div>
</template>
<style lang="scss" scoped>
.topbar-container {
  position: absolute;
  z-index: 999;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $g-topbar-height;
  background-color: var(--g-toolbar-bg);
  transition: width 0.3s, transform 0.3s, background-color 0.3s, var(--el-transition-box-shadow);
  &.fixed {
    position: fixed;
    &.shadow {
      box-shadow: 0 10px 10px -10px var(--g-box-shadow-color);
    }
  }
  .left-box {
    display: flex;
    align-items: center;
    padding-right: 50px;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);
    mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);
    .sidebar-collapse {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 50px;
      cursor: pointer;
      .el-icon {
        color: var(--el-text-color-primary);
        transition: var(--el-transition-color), var(--el-transition-md-fade);
      }
      &:hover .el-icon {
        color: var(--el-color-primary);
      }
      &.is-collapse .el-icon {
        transform: rotateZ(-180deg);
      }
      & + .el-breadcrumb {
        margin-left: 0;
      }
    }
    :deep(.el-breadcrumb) {
      margin-left: 20px;
      white-space: nowrap;
      .el-breadcrumb__item {
        display: inline-block;
        float: none;
        span {
          font-weight: normal;
        }
        &:last-child span {
          color: #97a8be;
        }
      }
    }
  }
}
// 面包屑动画
.breadcrumb-enter-active {
  transition: all 0.25s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}
</style>
