import Vue from 'vue'
import Router from 'vue-router'
import SearchConsole from 'admin/views/SearchConsole.vue'
import Settings from 'admin/views/Settings.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'SearchConsole',
            component: SearchConsole
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings
        }
    ]
})
