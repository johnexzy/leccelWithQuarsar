import { blogApi } from "src/boot/axios";
// import axios from 'axios'
/*
export function someAction (context) {
}
*/
export async function fetchStickyPost({ commit }) {
  // alert("john")
  try {
    commit("setLoadingStickyPost");
    // console.log('url', process.env.BLOG_API)
    await blogApi.get(`/posts?sticky=require&number=1`).then(response => {

      commit("setStickyPost", response.data);
      commit("setLoadingStickyPost");

      // console.log(response.data)
    });
  } catch (error) {
    commit("setLoadingStickyPost");

    console.log(error);
  }
}
export async function fetchFeaturedPosts({ commit }) {
  // alert("john")
  try {
    commit("setLoadingFeaturedPosts");
    // console.log('url', process.env.BLOG_API)
    await blogApi.get(`/posts?number=4`).then(response => {

      commit("setFeaturedPosts", response.data);
      commit("setLoadingFeaturedPosts");

      // console.log(response.data)
    });
  } catch (error) {
    commit("setLoadingFeaturedPosts");

    console.log(error);
  }
}
export async function fetchPost({ commit, dispatch }, slug) {
  // alert("john")
  try {
    commit("setLoadingPost");
    // console.log('url', process.env.BLOG_API)
    await blogApi.get(`/posts/slug:${slug}`).then(response => {
      console.log(response.data)
      commit("setPost", response.data);
      commit("setLoadingPost");
      dispatch("fetchRelatedPost")
      // console.log(response.data)
    });
  } catch (error) {
    commit("setLoadingPost");

    console.log(error);
  }
}
export async function fetchRelatedPost({ commit }) {
  // alert("john")
  try {
    commit("setLoadingFeaturedPosts");
    // console.log('url', process.env.BLOG_API)
    await blogApi.get(`/posts?number=4`).then(response => {
      commit("setFeaturedPosts", response.data);
      commit("setLoadingFeaturedPosts");

      // console.log(response.data)
    });
  } catch (error) {
    commit("setLoadingFeaturedPosts");

    console.log(error);
  }
}
export async function fetchCategories({ commit }) {
  try {
    commit("setLoadingCategories");
    await blogApi.get(`/categories`).then(response => {
      commit("setCategories", response.data.categories);
      commit("setLoadingCategories");

      // console.log(response.data)
    });
  } catch (error) {
    commit("setLoadingCategories");

    console.log(error);
  }
}

export async function fetchPostsByCategories(
  { commit },
  slug = "entertainment",
) {
  try {
    commit("setLoadingPostsByCategories");
    await blogApi.get(`/posts?category=${slug}&number=100`).then(response => {
      commit("setPostsByCategories", response.data);
      commit("setLoadingPostsByCategories");

      // console.log(response.data)
    });
  } catch (error) {
    commit("setLoadingCategories");

    console.log(error);
  }
}
// export async function fetchFeedRecommendation ({ commit }) {
//   try {
//     await blogApi.get(`/user/recommended`).then(response => {
//       commit('setUserFeedRecommendation', response.data)
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
