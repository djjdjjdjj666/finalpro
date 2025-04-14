import {createRouter,createWebHistory} from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import Container from '../components/Container.vue'
import Site_models from '@/components/Site_models.vue'
import Add from '@/components/Add.vue'
import Delete from '@/components/Delete.vue'
import Login from '@/components/Login.vue'

const router = createRouter({
	history:createWebHistory(), //hash模式
	routes:[

        { path: '/', redirect: '/container/mainmenu/learn' }, // 重定向到 /container/mainmenu

		{
			path:'/container',
			component:Container,
            children:[
                {
                    path:'mainmenu', component:MainMenu, children:[
                        // { path: '', redirect: 'person' }, // 默认跳转
                        { path:'learn', component:Site_models, meta:{ requiresAuth:false } },
                        { path:'entertain', component:Site_models, meta:{ requiresAuth:false } },
                        { path:'tool', component:Site_models, meta:{ requiresAuth:false } },
                        { path:'add', component:Add, meta:{ requiresAuth:true } },
                        { path:'delete', component:Delete, meta:{ requiresAuth:true } }
                    ], 
                    meta:{ requiresAuth:false }
                },

                {
                    path:'login', component:Login, meta:{ requiresAuth:false }
                }
            ]
		},

	]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if( to.meta.requiresAuth && !token ){
        next({path:'/container/login'})
    }else{
        next()
    }

})


export default router