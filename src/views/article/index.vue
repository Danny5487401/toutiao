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
      @click="onFollow"
      :loading="isFollowLoading"
      >
       {{article.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>
    <div class="markdown-body"
    v-html="article.content"
    ref="article-content"
    >
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
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
      article: {},
      isFollowLoading: false // 关注用户按钮的 loading 状态
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
      // 数据改变影响视图更新（DOM数据）不是立即的
      // 所以如果需要在修改数据之后马上操作被该数据影响的视图 DOM，需要把这个代码放到 $nextTick 中

      // this.$nextTick 是 Vue 提供的一个方法
      // 参考文档：
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    handlePerviewImage () {
      // 1. 获取文章内容 DOM 容器
      const articleContent = this.$refs['article-content']

      // 2. 得到所有的 img 标签
      const imgs = articleContent.querySelectorAll('img')

      const imgPaths = [] // 收集所有的图片路径

      // 3. 循环 img 列表，给 img 注册点击事件
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          // 4. 在事件处理函数中调用 ImagePreview() 预览
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index // 起始位置
          })
        }
      })
    },
    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 已关注，取消关注
        await deleteFollow(this.article.aut_id)
        // this.article.is_followed = false
      } else {
        // 没有关注，添加关注
        await addFollow(this.article.aut_id)
        // this.article.is_followed = true
      }
      // 更新关注状态
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
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
