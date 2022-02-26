<template>
  <div class="box" @click="SongListInfo(id)">
    <van-image width="100%" height="250px" :src="picUrl" />
    <a href="#">{{ title }}</a>
  </div>
</template>

<script>
export default {
  name: 'HotSongList',
  props: {
    // 歌单 id
    id: {
      type: Number,
      default: ''
    },
    //歌单标题
    title: '',
    // 歌单封面
    picUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    SongListInfo(id) {
      this.$router.push('/home/songlistinfo/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
a {
  color: #333;
  padding-top: 20px;
  white-space: nowrap; // 强制一行显示文本
  overflow: hidden; //超出部分隐藏
  text-overflow: ellipsis; // 用省略号代替超出的文字
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 225px;
  height: 300px;
  padding: 0 10px;
  padding-bottom: 20px;
}
</style>
