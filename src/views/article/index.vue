<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <h1  class="title">文章你好发家史法拉激烈对抗撒娇的撒大了刷卡记录</h1>
    <van-cell center class="user-info">
      <van-image
      slot="icon"
      round
      fit="cover"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
      class="avator"
      />
      <div slot="title" class="name"> 天涯西欧i啊大神</div>
      <div slot="label" class="pubdate"> 14小时前</div>
      <van-button
      type="info"
      round
      size="small"
      class="follow-btn"
      icon="plus"
      >
       关注</van-button>
    </van-cell>
    <div class="markdown-body">
      <p>hdsadadsdas</p>
      <p>dsadsadasd132132</p>
      <ul>
        <li>d121654</li>
        <li>d121654</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getArticleById
} from '@/api/article'
import './github-markdown.css'
// 在组件中获取动态路由参数：
//    方式一：this.$route.params.articleId
//    方式二：props 传参，推荐
//      this.articleId

export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArtcitle()
  },
  mounted () {},
  methods: {
    async loadArtcitle () {
      const { data } = await getArticleById(this.articleId)
      console.log(data)
    }
  }
}
</script>

<style scoped lang="less">
.title{
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}
.user-info{
  .name{
    font-size: 12px;
    color: #333333;
  }
  .pub-date{
    font-size: 12px;
    color: #111;
  }
  .avator{
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .follow-btn{
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
ul {
  list-style: unset;
}
</style>
