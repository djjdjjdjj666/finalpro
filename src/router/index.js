import {createRouter,createWebHistory} from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import Container from '../components/Container.vue'
import Person from '@/components/Person.vue'
import Site_models from '@/components/Site_models.vue'
import Add from '@/components/Add.vue'

const router = createRouter({
	history:createWebHistory(), //hash模式
	routes:[

        { path: '/', redirect: '/container/mainmenu' }, // 重定向到 /container/mainmenu

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
                        { path:'add', component:Add, meta:{ requiresAuth:true } }
                    ], 
                    meta:{ requiresAuth:false }
                }
            ]
		},

	]
})
export default router