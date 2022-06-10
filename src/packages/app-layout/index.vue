<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Layout from './components/Layout.vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { emitList, useGlobalMitt, useLayout, useProvideRoute } from 'my-lib/utils/hooks'
import { useStore } from "my-lib/utils/store";
export default defineComponent({
  name: 'AppLayout',
  components:{
    Layout
  },
  props: {
    route: {
      type: Object as PropType<RouteLocationNormalizedLoaded>,
      default: () => {}
    },
    logo: {
      type: String,
      default: ""
    },
    user: {
      type: Object,
      default: ()=> {
        return {
          account: "",
          avatar: "",
        }
      }
    }
  },
  emits: emitList,
  setup(props) {
    useGlobalMitt()
    useProvideRoute(props.route)
    const { setLogo } = useStore().settings
    setLogo(props.logo)
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


