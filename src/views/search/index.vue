<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow"  :q = "searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
     v-else-if="searchText"
    :q = "searchText"
    @search="onSearch" />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history
    v-else
    :search-histories="searchHistories"
    @search="onSearch"
    @update-histories="searchHistories = $event"
    />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: [] // 搜索历史数据
    }
  },
  computed: {},
  watch: {
    // 监视搜索历史记录的变化，存储到本地存储
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  created () {
    this.loadSearchHistories()
  },
  mounted () {},
  methods: {
    onSearch (searchText) {
      // 把输入框设置为你要搜索的文本
      this.searchText = searchText

      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项删除
        this.searchHistories.splice(index, 1)
      }

      // 把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchText)

      // 如果用户已登录，则把搜索历史记录存储到线上
      //    提示：只要我们调用获取搜索结果的数据接口，后端会给我们自动存储用户的搜索历史记录
      // 如果没有登录页，则把搜索历史记录存储到本地
      // setItem('search-histories', this.searchHistories)

      // 展示搜索结果
      this.isResultShow = true
    },
    async loadSearchHistories () {
      // 因为后端帮我们存储的用户搜索历史记录太少了（只有4条）
      // 所以我们这里让后端返回的历史记录和本地的历史记录合并到一起
      // 如果用户已登录
      const searchHistories = getItem('search-histories') || []
      // if (this.user) {
      //   const { data } = await getSearchHistories()
      //   // 合并数组： [...数组, ...数组]
      //   // 把 Set 转为数组：[...Set对象]
      //   // 数组去重：[...new Set([...数组, ...数组])
      //   searchHistories = [...new Set([
      //     ...searchHistories,
      //     ...data.data.keywords
      //   ])]
      // }
      this.searchHistories = searchHistories
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
