<template>
  <div class="songBox">
    <!-- 歌单 -->
    <div class="listInfo">
      <van-image class="coverImg" width="17rem" fit="cover" :src="coverImg" />
      <h2>{{ listName }}</h2>
      <h4>歌曲介绍：</h4>
      <p>{{ description }}</p>
      <h4>{{ trackCount }} 首歌</h4>
      <van-icon class="back" name="revoke" size="1.5rem" @click="Back" />
    </div>

    <!-- 歌曲列表 -->
    <div class="songInfo">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <table v-for="(item, index) in songsList" :key="item.id">
          <tr @dblclick="playMusic(item.id)">
            <td>{{ index + 1 }}</td>
            <td><van-image class="songImg" width="4rem" fit="cover" :src="item.al.picUrl" /></td>
            <td>{{ item.name }}</td>
            <td>{{ item.ar[0].name }}</td>
            <td>{{ item.al.name }}</td>
            <td>音乐时长</td>
          </tr>
        </table>
      </van-list>
    </div>
  </div>
</template>

<script>
// 导入共享文件
import Bus from '@/EventBus.js'

export default {
  name: 'SongListInfo',
  props: ['id'],
  data() {
    return {
      // 歌单信息
      listName: '', // 歌单名称
      description: '', // 歌单介绍
      trackCount: '', // 歌曲数目
      trackIds: [], // 所有歌曲
      arrAllSongId: [], // 转存 trackIds 所有歌曲 id
      coverImg: '', // 歌单封面

      // 每首歌曲信息
      songsList: [], // 由 songsId 提供 id ，获得的歌曲
      songsId: [], // 每次截取 arrAllSongId 的 id
      loading: false,
      finished: false

      // 播放器参数
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    // 1. 请求获取歌单详情信息
    async getInfo() {
      const { data: res } = await this.$http.get('/playlist/detail?id=' + this.id)
      // 转存 歌单数据
      this.listName = res.playlist.name
      this.description = res.playlist.description
      this.trackCount = res.playlist.trackCount
      this.trackIds = res.playlist.trackIds
      this.coverImg = res.playlist.coverImgUrl
      console.log(res)

      // 遍历 trackIds 数组，的到 全部 id，赋值给 arrAllSongId  转存
      this.trackIds.forEach(item => this.arrAllSongId.push(item.id))
    },

    // 懒加载歌曲列表
    async onLoad() {
      // 截取完所有id 后， thsi.finished = false   提示没有更多
      if ((this.songsId.length = this.arrAllSongId.length)) {
        this.finished = true
      }

      // 每次加载 截取全部 id(arrAllSongId) ，截取从 0 开始，每次 n + 10 个数据。
      this.songsId = this.arrAllSongId.slice(0, this.songsId.length + 10)

      const { data: res } = await this.$http.get('/song/detail?ids=' + this.songsId)
      this.songsList = res.songs
      this.loading = false
    },

    // 播放音乐
    playMusic(id) {
      Bus.$emit('getId', id, this.songsId)
    },
    Back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.songBox {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // 歌单信息样式
  .listInfo {
    position: relative;
    .coverImg {
      float: left;
      margin: 0 1rem 1rem;
    }

    h2 {
      margin-top: 0;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
    }
    .van-icon {
      position: absolute;
      right: 26px;
      bottom: 20px;
      box-shadow: 1px 3px 5px #333;
    }
  }

  // 歌曲信息样式
  table {
    :hover {
      background-color: #dedede;
    }
    tr {
      text-align: center;

      :nth-child(1) {
        width: 50px;
      }
      :nth-child(2) {
        width: 100px;
      }
      :nth-child(3) {
        width: 200px;
      }
      :nth-child(4) {
        width: 100px;
      }
      :nth-child(5) {
        width: 300px;
      }
      :nth-child(6) {
        width: 100px;
      }
    }
  }
}
</style>
