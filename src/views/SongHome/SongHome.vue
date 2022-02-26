<template>
  <van-list v-model="loading" :finished="finished" finished-text="为了保护服务器，仅限 200 条数据 ，没有更多了" @load="onLoad">
    <div class="HotSOng">
      <HotSongList class="SongList" v-for="item in songList" :key="item.id" :id="item.id" :title="item.name" :picUrl="item.picUrl"></HotSongList>
    </div>
  </van-list>
</template>

<script>
import HotSongList from '@/components/HotSongList/HotSongList.vue'

export default {
  name: 'SongHome',
  // 注册组件
  components: {
    HotSongList
  },
  data() {
    return {
      songList: [],
      loading: false, // 是否正在加载下一页，为 true 不会，反之触发 onLoad 事件，每当加载完成要将 loading 改为 false
      finished: false // 所有数据是否加载完毕。true(已全部加载)
    }
  },

  //  在内存中创建组件完毕后，发生请求
  created() {
    this.initHotList()
  },
  methods: {
    async initHotList() {
      if (this.songList.length === 200) {
        // 为了保证服务器仅限 200 条数据 ，证明没有更多数据了，修改 finished：true
        this.finished = true
      }

      const { data: res } = await this.$http.get('/personalized?limit=' + (this.songList.length + 9))
      this.songList = res.result
    },
    // 下滑 懒加载
    onLoad() {
      this.initHotList()
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.HotSOng {
  display: flex;
  flex-wrap: wrap;
}
</style>
