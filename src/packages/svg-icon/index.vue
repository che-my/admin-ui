<template>
  <Icon v-if="name.indexOf('ep:') === 0" :icon="name" :style="transformStyle" />
  <svg v-else :style="transformStyle" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { Icon } from '@iconify/vue'

declare type flipType = ''|'horizontal'|'vertical'|'both'

export default defineComponent({
  name: 'SvgIcon',
  components: { Icon },
  props:{
    name: {
      type: String,
      required: true
    },
    flip: {
      type: String as PropType<flipType>,
      validator(value:any) {
        return ['', 'horizontal', 'vertical', 'both'].includes(value)
      },
      default: ''
    },
    rotate: {
      type: Number,
      validator(value) {
        return value >= 0 && value <= 360
      },
      default: 0
    }
  },
  setup(props) {
    const transformStyle = computed(() => {
      let style:any = []
      const flip = props.flip
      if (flip) {
        switch (flip) {
          case 'horizontal':
            style.push('rotateY(180deg)')
            break
          case 'vertical':
            style.push('rotateX(180deg)')
            break
          case 'both':
            style.push('rotateX(180deg)')
            style.push('rotateY(180deg)')
            break
        }
      }
      if (props.rotate !== 0) {
        style.push(`rotate(${props.rotate}deg)`)
      }
      return `transform: ${style.join(' ')};`
    })
    return { transformStyle }
  }
})
</script>



