import { isString } from 'my-lib/utils/utils/is'
import { reactive } from 'vue'

const keepAlive = {
    keepAliveState: reactive({
        list: []
    }),
    add(name:any) {
        if (isString(name)) {
            // @ts-ignore
            !this.keepAliveState.list.includes(name) && this.keepAliveState.list.push(name)
        } else {
            name.map((v:string) => {
                // @ts-ignore
                v && !this.keepAliveState.list.includes(v) && this.keepAliveState.list.push(v)
            })
        }
    },
    remove(name:any) {
        if (typeof name === 'string') {
            this.keepAliveState.list = this.keepAliveState.list.filter(v => {
                return v !== name
            })
        } else {
            this.keepAliveState.list = this.keepAliveState.list.filter(v => {
                return !name.includes(v)
            })
        }
    },
    clean() {
        this.keepAliveState.list = []
    }
}

export default keepAlive
