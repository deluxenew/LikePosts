<template>
   <div id="app" class="wrapper">
      <div class="card-list">
         <post-card
            v-for="item in posts"
            :key="item.id"
            :post="item"
            @like="setLike"
         />
      </div>
   </div>
</template>

<script>
    import PostCard from "@/components/PostCard";
    import {FETCH_POSTS_ACTION, SET_LIKE_ACTION} from "@/constants/actions-names";
    import {GET_POSTS} from "@/constants/getters-names";

    export default {
        name: 'App',
        components: {PostCard},
        computed: {
            posts() {
                return this.$store.getters[GET_POSTS]
            },
        },
        data() {
            return {
                url: process.env.VUE_APP_SERVER,
                title: process.env.VUE_APP_SERVER
            }
        },
        methods: {
            getPosts() {
                try {
                    this.$store.dispatch(FETCH_POSTS_ACTION)
                } catch (err) {
                    console.log(err);
                }
            },
            setLike(id) {
                const idx = this.posts.findIndex(el => el.id === id)
                if (idx > -1) {
                    let newPost = this.posts[idx]
                    newPost.like = this.intToStr(this.posts[idx], parseInt(this.posts[idx].like) + 1)
                    try {
                        this.$store.dispatch(SET_LIKE_ACTION, {id, body: newPost})
                    } catch (err) {
                        console.log(err);
                    }
                }
            },
            intToStr(post, like) {
                if (typeof post.like == 'string') return like.toString()
                else return like
            }
        },
        mounted() {
            console.log(this.url);
            this.getPosts()
        }
    }
</script>

<style lang="scss">
   @import "~/src/assets/scss/styles.scss";
</style>

