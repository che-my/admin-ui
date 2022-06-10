<script setup lang="ts">
import SvgIcon from 'my-lib/svg-icon/index.vue'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'my-lib/utils/store'
const reload = inject('reload')
const router = useRouter()
const { settings, user } = useStore()
const { settingsState, setColorScheme } = settings
const { userState } = user
import { useFullscreen } from '@vueuse/core'
import { mitts } from 'my-lib/utils/hooks'
import { eventMitt } from "my-lib/utils";
const { isFullscreen, toggle } = useFullscreen()
const userCommand = (command:string) => {
    eventMitt.emit(mitts.toolsCommand, command)
}
const toggleScreen = () => {
    toggle()
}

const onSearchClick = () => {
    eventMitt.emit('global-search-toggle')
}

const onThemeClick = () => {
    eventMitt.emit('global-theme-toggle')
}

</script>

<template>
  <div class="tools">
    <div class="buttons">
      <slot />
      <span v-if="settingsState.topbar.enableNavSearch" class="item" @click="onSearchClick">
        <el-icon>
          <SvgIcon name="search" />
        </el-icon>
      </span>
      <span v-if="settingsState.mode === 'pc' && settingsState.topbar.enableFullscreen" class="item" @click="toggleScreen">
        <el-icon>
          <SvgIcon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
        </el-icon>
      </span>
      <span v-if="settingsState.topbar.enablePageReload" class="item" @click="reload()">
        <el-icon>
          <SvgIcon name="toolbar-reload" />
        </el-icon>
      </span>
      <span v-if="settingsState.topbar.enableColorScheme" class="item" @click="setColorScheme(settingsState.app.colorScheme === 'dark' ? 'light' : 'dark')">
        <el-icon>
          <SvgIcon v-show="settingsState.app.colorScheme === 'light'" name="ep:sunny" />
          <SvgIcon v-show="settingsState.app.colorScheme === 'dark'" name="ep:moon" />
        </el-icon>
      </span>
      <span v-if="settingsState.topbar.enableAppSetting" class="item" @click="onThemeClick">
        <el-icon>
          <SvgIcon name="toolbar-theme" />
        </el-icon>
      </span>
    </div>
    <el-dropdown class="user-container" size="default" @command="userCommand">
      <div class="user-wrapper">
        <el-avatar size="small">
          <el-icon>
            <SvgIcon name="ep:user-filled" />
          </el-icon>
        </el-avatar>
        {{ userState.account }}
        <el-icon>
          <SvgIcon name="ep:caret-bottom" />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="user-dropdown">
          <el-dropdown-item v-if="settingsState.dashboard.enable" command="dashboard">控制台</el-dropdown-item>
          <el-dropdown-item command="setting">个人设置</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.tools {
  display: flex;
  align-items: center;
  padding: 0 20px;
  white-space: nowrap;
  .buttons {
    margin-right: 20px;
    .item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      width: 34px;
      cursor: pointer;
      vertical-align: middle;
      .el-icon {
        color: var(--el-text-color-primary);
        transition: var(--el-transition-color);
      }
    }
    .item-pro {
      display: inline-block;
      width: auto;
      padding: 0 10px;
      transform-origin: right center;
      animation: pro-text 3s ease-out infinite;
      @keyframes pro-text {
        0%,
        20% {
          transform: scale(1);
        }
        50%,
        70% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }
      .el-icon {
        vertical-align: middle;
      }
      .title {
        padding-left: 5px;
        font-weight: bold;
        font-size: 14px;
        background-image: linear-gradient(to right, #ffa237, #fc455d);
        /* stylelint-disable-next-line property-no-vendor-prefix */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
:deep(.user-container) {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  .user-wrapper {
    .el-avatar {
      vertical-align: middle;
      margin-top: -2px;
      margin-right: 4px;
    }
  }
}
</style>
