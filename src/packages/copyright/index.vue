<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'my-lib/utils/store'

export default defineComponent({
  name: 'Copyright',
  setup() {
    const { settingsState } = useStore().settings
    return { settingsState }
  },
})
</script>

<template>
  <footer class="copyright">
    Copyright © {{ settingsState.copyright.dates }}
    <a v-if="settingsState.copyright.website" :href="settingsState.copyright.website" target="_blank" rel="noopener">{{ settingsState.copyright.company }},</a>
    <span v-else>{{ settingsState.copyright.company }},</span>
    All Rights Reserved
  </footer>
</template>

<style lang="scss" scoped>
footer {
  margin: 40px 0 20px;
  line-height: 20px;
  text-align: center;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  a {
    text-decoration: none;
    color: var(--el-text-color-secondary);
    transition: var(--el-transition-color);
    &:hover {
      color: var(--el-text-color-primary);
    }
  }
}
</style>

