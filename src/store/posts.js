const SERVER = process.env.VUE_APP_SERVER
export default {
   namespaced: true,
   state: {
      posts: [],
   },
   getters: {
      GET_POSTS(state) {
         return state.posts;
      },
   },
   mutations: {
      POSTS_MUTATION(state, posts) {
         state.posts = posts;
      },
      LIKE_MUTATION(state, {id, body}) {
         const idx = state.posts.findIndex(el => el.id === id)
         if (idx > -1) {
            let newPost = state.posts[idx]
            newPost.like = body.like
            state.posts.splice(idx, 1, newPost)
         }
      }
   },
   actions: {
      async FETCH_POSTS_ACTION({commit}) {
         let response = await fetch(SERVER + '/posts');
         let dataFromServer = await response.json();

         commit('POSTS_MUTATION', dataFromServer);
      },
      async SET_LIKE_ACTION({commit}, {id, body}) {
         await fetch(SERVER + '/posts/' + id, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
         });

         commit('LIKE_MUTATION', {id, body});
      }
   },
};
