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
        <article-list :channel = 'channel'></article-list>
        <!-- 文章列表 -->
      </van-tab>
      <!-- 它默认会把你写的其它内容渲染到内容的底部 -->
      <div slot="nav-right" class="van-tab" style="flex: 0 0 8%;"></div>
      <van-icon slot="nav-right" class="wap-nav" name="wap-nav" @click="isChannelEditShow = true" />
    </van-tabs>
    <!-- /文章频道列表 -->
    <!--频道编辑弹窗 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      round
      :overlay="false"
      class="channel-edit-popup"
    >
      <van-nav-bar title="编辑频道">
        <van-icon
          name="cross"
          slot="left"
          size="20"
          @click="isChannelEditShow = false"
        />
      </van-nav-bar>
      <channel-edit
        :user-channels="channels"
        v-model="active"
        @close="isChannelEditShow = false"
      />
    </van-popup>
    <!-- /频道编辑弹窗 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'LoginIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0, // 控制被激活的标签
      channels: [],
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    async loadUserChannels () {
      let channels = []
      if (this.user) {
        // 已登录，请求获取用户频道列表
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 未登录
        const localChannels = getItem('channels')
        if (localChannels) {
          // 使用本地存储的频道列表
          channels = localChannels
        } else {
          // 没有就使用默认推荐的频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
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
  /deep/ .van-tabs {
  .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  .van-tabs__line {
    width: 15px !important;
    background-color: #3296fa;
    bottom: 20px;
  }
}
  .channel-edit-popup {
    border-radius: 10px 10px 0 0;
  }
  .wap-nav {
  position: fixed;
  right: 0;
  background-color: #fff;
  opacity: .8;
  font-size: 26px;
  line-height: 43px;
}
}
</style>
