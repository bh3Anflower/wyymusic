<template>
  <div>
    <!-- @ended 播放结束时，自动触发 -->
    <audio :src="musicUrl" autoplay controls @ended="playNext"></audio>
  </div>
</template>

<script>
// 导入共享文件
import Bus from '@/EventBus.js'

export default {
  name: 'PlayMusic',
  data() {
    return {
      musicId: '', // 歌曲id
      musicUrl: '', // 歌曲地址
      musicIdList: [], // id 列表
      musicBr: ''
    }
  },
  created() {
    Bus.$on('getId', (id, idList) => {
      this.musicId = id
      this.musicIdList = idList
      this.PMusic()
    })
  },
  methods: {
    async PMusic() {
      const { data: res } = await this.$http.get('/song/url?id=' + this.musicId)
      this.musicUrl = res.data[0].url
      this.musicBr = res.data[0].br
      console.log(res)
    },
    // ended 事件， 播放结束时。
    async playNext() {
      //  1. 将 当前播放的 id(this.musicId), 在 id 列表（this.musicIdList）, 中进行比配，得到 当前id(this.musicId) 在 id 列表（this.musicIdList） 中的索引 +1 ，的到下一项索引
      let nextIndex = this.musicIdList.indexOf(this.musicId) + 1

      // 2. 再重新 到 id 列表（this.musicIdList） 中查找，得到 下一首 id 字符串，存储在 返回的新数组（nextId） 中
      // 将返回的新数组（nextId）的第一项 ,重新赋值给 当前id(this.musicId)
      let nextId = this.musicIdList.filter((currentId, index) => {
        if (index === nextIndex) return currentId
      })
      this.musicId = nextId[0]

      // 3 .再次调用 PMusic () 播放下一首音乐
      this.PMusic()
    }
  }
}
</script>

<style lang="less" scoped></style>
