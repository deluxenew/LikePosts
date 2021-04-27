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

    const SERVER_URL = 'http://localhost:3000';


    export default {
        name: 'App',
        components: {PostCard},
        data() {
            return {
                posts: [],
            }
        },
        computed: {},
        methods: {
            async getPosts() {
                let response = await fetch(SERVER_URL + '/posts');
                if (response.ok) {
                    let dataFromServer = await response.json();
                    this.posts = dataFromServer
                } else {
                    alert("Ошибка HTTP: " + response.status);
                }
            },
            async setLike(id) {
                const idx = this.posts.findIndex(el => el.id === id)

                if (idx > -1) {
                    let newPost = this.posts[idx]

                    newPost.like = this.intToStr(this.posts[idx], parseInt(this.posts[idx].like) + 1)

                    let response = await fetch(SERVER_URL + '/posts/' + id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(newPost)
                    });

                    this.posts.splice(idx, 1, await response.json())
                }
            },
            intToStr(post, like) {
                if (typeof post.like == 'string') return like.toString()
                else return like
            }
        },

        async mounted() {
            await this.getPosts()
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/styles.scss";
</style>

