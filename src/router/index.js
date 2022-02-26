import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入所需组件
import Home from '@/Home/Home.vue'
import SongHome from '@/views/SongHome/SongHome.vue'
import MyCollection from '@/views/MyCollection/MyCollection.vue'
import MyCreation from '@/views/MyCreation/MyCreation.vue'
import SongListInfo from '@/components/SongListInfo/SongListInfo.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 重定向路由规则
    { path: '/', redirect: 'home/songhome' },
    {
      path: '/home',
      redirect: 'home/songhome',
      component: Home,
      children: [
        { path: 'songhome', component: SongHome },
        { path: 'mycollection', component: MyCollection },
        { path: 'mycreation', component: MyCreation },

        // 歌单详情路由规则
        { path: 'songlistinfo/:id', component: SongListInfo, props: true }
      ]
    }
  ]
})

export default router
