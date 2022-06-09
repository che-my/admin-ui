import { SFCInstallWithContext } from 'element-plus/es/utils'
import { Message, Notify } from 'element-plus'
// import { Admin } from "@/admin";
import { Emitter, EventType } from 'mitt'
import { Hotkeys } from 'hotkeys-js'

// import Echo from "laravel-echo";
// import { EchoProp } from "@/utils/laravel-echo";
// import { AxiosInstance } from "axios";
//

declare global {
  interface Window {
    monaco: any
    require: any
    MonacoEnvironment: any
    'vue3-sfc-loader': any
    Vue: any
    VueRouter: any
    appConfig: any
    Pusher: any
    // $admin: Admin;
    // $store: any;
    // $http: AxiosInstance;
    $message: SFCInstallWithContext<Message>
    $notification: SFCInstallWithContext<Notify>
    $mitt: Emitter<Record<EventType, unknown>>
    $hotkeys: Hotkeys
    // $utils: Record<string, any>;
    // createAdmin(): Admin;
    // Echo:Echo;
    // echo(config?:EchoProp): Echo,
    registerComponent(dom: string, template: string): void
  }
}
