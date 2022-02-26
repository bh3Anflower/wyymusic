
<template>
  <div class="box">
    <!--hade 头部区域  -->
    <div class="hade">
      <van-search v-model="value" shape="round" background="#4fc08d" placeholder="请输入搜索关键词" />
      <van-button type="primary" size="large">登录</van-button>

      <div class="Sidebar">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item title="首页" to="/home/songhome" />
          <van-sidebar-item title="我创建的歌单" to="/home/mycreation" />
          <van-sidebar-item title="我收藏的歌单" to="/home/mycollection" />
        </van-sidebar>
      </div>
    </div>
    <!-- content 内容区域 -->
    <div class="content">
      <router-view></router-view>
    </div>

    <!-- 播放器组件 -->
    <PlayMusic class="play"></PlayMusic>
  </div>
</template>

<script>
import PlayMusic from '@/components/PlayMusic/PlayMusic.vue'

export default {
  name: 'Home',
  components: { PlayMusic },
  data() {
    return {
      value: '仅限搜索音乐',
      // 侧边栏选取
      activeKey: 0
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  position: relative;
  display: flex;
  width: 1225px;
  height: 600px;
  margin: 0 20%;
  margin-top: 50px;
  box-shadow: 1px 4px 5px black;
  .hade {
    flex: 1;
    // 侧边栏样式
    .Sidebar .van-sidebar {
      width: 100%;
    }
  }
  .content {
    overflow: auto;
    flex: 3;
  }
  .play {
    position: absolute;
    bottom: 0.3%;
    left: 0.3%;
  }
}
</style>
