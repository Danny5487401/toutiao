<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      :key="index"
      v-for="(item, index) in suggestions"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSuggestions } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    q: {
      handler: debounce(async function () {
        const q = this.q
        if (!q) {
          return
        }
        const { data } = await getSuggestions(q)
        this.suggestions = data.data.options
      }, 200),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    highlight (str) {
      return str.toLowerCase().replace(
        this.q.toLowerCase(),
        `<span style="color: red;">${this.q}</span>`
      )
    }
  }
}
</script>

<style scoped lang="less"></style>
