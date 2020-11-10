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
    <h1  class="title">{{article.title}}</h1>
    <van-cell center class="user-info">
      <van-image
      slot="icon"
      round
      fit="cover"
      :src="article.aut_photo"
      class="avator"
      />
      <div slot="title" class="name">{{article.aut_name}}</div>
      <div slot="label" class="pubdate"> {{article.pubdate | relativeTime}}</div>
      <van-button
      :type="article.is_followed ? 'default' :'info' "
      round
      size="small"
      class="follow-btn"
      :icon="article.is_followed ? '' :'plus'"
      >
       {{article.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>
    <div class="markdown-body" v-html="article.content">
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
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}
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
      this.article = data.data
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
