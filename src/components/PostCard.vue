<template>
    <div class="card">
        <div class="poster">
            <div class="image" :style="`background-image: url(${currentImagePath})`">
                <div class="tag">
                    #{{ post.tag }}
                </div>
            </div>
        </div>

        <div class="title">
            {{post.name}}
        </div>

        <div class="description">
            {{post.description}}
        </div>

        <div class="card-footer">
            <div class="date">
                {{post.date}}
            </div>

            <div class="like" @click="$emit('like', post.id)">
                <div class="icon">
                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.67974 13L6.6607 12.0109C2.87569 8.76087 0.400879 6.57065 0.400879 3.88587C0.400879 1.69565 2.1478 0 4.40425 0C5.64166 0 6.87906 0.565217 7.67974 1.4837C8.48041 0.565217 9.71781 0 10.9552 0C13.2117 0 14.9586 1.69565 14.9586 3.88587C14.9586 6.57065 12.4838 8.76087 8.69878 12.0109L7.67974 13Z" fill="#EB5757"/>
                    </svg>
                </div>

                <div class="counter">
                    {{post.like}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const IMG_PATH = '/images/';

    export default {
        name: "PostCard",
        props: {

            post: {
                type: Object,
                default: () => {
                    return {
                        id: 0,
                        name: '',
                        description: '',
                        tag: '',
                        date: '',
                        image: '',
                        like: 0,
                    }
                }
            }
        },
        computed: {
           currentImagePath() {
               return IMG_PATH + this.post.image
           }
        },
        data() {
            return {
                isLiked: false,
            }
        },
    }
</script>

