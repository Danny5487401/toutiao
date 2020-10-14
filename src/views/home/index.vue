<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 文章频道列表 -->
    <!-- 标签页组件有一个功能,只有你第一次查看标签页的时候才渲染里面的内容 -->
    <van-tabs v-model="active">
      <van-tab :title="channel.name" v-for= "channel in channels" :key = 'channel.id' >
        <!-- 文档列表 -->
        <article-list :chanel = 'channel'></article-list>
        <!-- 文章列表 -->
      </van-tab>

    </van-tabs>
    <!-- /文章频道列表 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'

export default {
  name: 'LoginIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0, // 控制被激活的标签
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    // .van-icon {
    //   font-size: 16px;
    // }
    // .van-button__text {
    //   font-size: 14px;
    // }
  }
}
</style>
