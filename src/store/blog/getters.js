/*
export function someGetter (state) {
}
*/

/**
 * Fetch All Posts~
 * @param {*} state
 * @returns
 */
export function FeaturedPosts (state){
  return state.featuredPosts.posts
}
/**
 * Fetch All Posts~
 * @param {*} state
 * @returns
 */
export function FeaturedPostsMeta (state){
  return state.featuredPosts
}
/**
 * Fetch Sticky Post~
 * @param {*} state
 * @returns
 */
export function StickyPost (state){
  return state.stickyPost
}

/**
 * Fetch post by slug
 * @return {Object} object
 */
export function Post (state){
  return state.post
}
/**
 * Loading state for Posts
 * @param {*} state
 * @returns
 */
export function LoadingFeaturedPosts (state) {
  return state.loadingFeaturedPosts
}
/**
 * Loading state for Posts
 * @param {*} state
 * @returns
 */
export function LoadingStickyPost (state) {
  return state.loadingStickyPost
}
/**
 * Fetch All categories
* @param {*} state
 * @returns
 */
export function Categories (state) {
  return state.categories
}

/**
 * Fetch Posts by Categories
 * @param {*} state
 * @returns
 */
export function PostsByCategories (state) {
  return state.postsByCategories
}

/**
 * Show Loading for Posts by Categories
 * @param {*} state
 * @returns
 */
export function LoadingPostsByCategories (state) {
  return state.loadingPostsByCategories
}

/**
 * Show Loading for Categories
 * @param {*} state
 * @returns
 */
export function LoadingCategories (state) {
  return state.loadingCategories
}
