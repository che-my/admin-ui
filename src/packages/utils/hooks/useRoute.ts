import { inject, provide } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export function useProvideRoute(route:RouteLocationNormalizedLoaded) {
    provide('currentRoute', route)
}

export function useInjectRoute() {
    return inject<RouteLocationNormalizedLoaded>('currentRoute')
}