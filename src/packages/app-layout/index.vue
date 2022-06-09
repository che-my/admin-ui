<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElConfigProvider } from 'element-plus'
import Layout from './components/Layout.vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import useGlobalMitt, { emitList } from 'my-lib/utils/hooks/useGlobalMitt'
import useLayout from 'my-lib/utils/hooks/useLayout'
import { useProvideRoute } from 'my-lib/utils/hooks/useRoute'
export default defineComponent({
  name: 'AppLayout',
  components:{
    ElConfigProvider,Layout
  },
  props: {
    route: {
      type: Object as PropType<RouteLocationNormalizedLoaded>,
      default: () => {}
    }
  },
  emits: emitList,
  setup(props) {
    useGlobalMitt()
    useProvideRoute(props.route)
    return useLayout()
  },
})
</script>

<template>
  <el-config-provider :locale="lang" :size="elementSize" :button="{autoInsertSpace: true}">
    <Layout :style="{ '--g-main-sidebar-actual-width': mainSidebarActualWidth, '--g-sub-sidebar-actual-width': subSidebarActualWidth }">
      <slot />
    </Layout>
  </el-config-provider>
</template>


