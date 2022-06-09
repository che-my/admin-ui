import { reactive } from 'vue'
import { useStore } from 'my-lib/utils/store'

const user = {
    userState: reactive({
        user: localStorage.user || '',
        account: localStorage.account || '',
        token: localStorage.token || '',
        failure_time: localStorage.failure_time || '',
        permissions: []
    }),
    isLogin() {
        let retn = false
        if (this.userState.token) {
            if (new Date().getTime() < this.userState.failure_time * 1000) {
                retn = true
            }
        }
        return retn
    },
    setUser(data: any) {
        localStorage.setItem('user', data)
        localStorage.setItem('account', data.account)
        localStorage.setItem('token', data.token)
        localStorage.setItem('failure_time', data.failure_time)
        user.userState.user = data
        user.userState.account = data.account
        user.userState.token = data.token
        user.userState.failure_time = data.failure_time
    },
    logout() {
        return new Promise(resolve => {
            const { route, menu } = useStore()
            localStorage.removeItem('account')
            localStorage.removeItem('token')
            localStorage.removeItem('failure_time')
            localStorage.removeItem('user')
            user.userState.user = ''
            user.userState.account = ''
            user.userState.token = ''
            user.userState.failure_time = ''
            route.removeRoutes()
            menu.setActived(0)
            resolve(true)
        })
    }
}

export default user
