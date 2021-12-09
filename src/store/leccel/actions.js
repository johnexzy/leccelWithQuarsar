
import axios from "axios"
/**
         * get latest music and return commit
         * @param {commit} commit Commit
         * @return commit
         */
export async function getLatestMusic ({ commit }) {
  return commit('setLatestMusic', await axios.get(`/api/v1/music/limit/10`))
}

/**
 * get latest movies and return commit
 * @param {commit} commit Commit
 * @return commit
 */
export async function getLatestMovie ({ commit }) {
  return commit('setLatestMovie', await axios.get(`/api/v1/videos/limit/10`))
}

/**
 * get latest Series and return commit
 * @param {commit} commit Commit
 * @return commit
 */
export async function getLatestSeries ({ commit }) {
  return commit('setLatestSeries', await axios.get(`/api/v1/series/limit/9`))
}

/**
 * get popular music and return commit
 * @param {commit} commit Commit
 * @return commit
 */
export async function getPopularMusic ({ commit }) {
  return commit('setPopularMusic', await axios.get(`/api/v1/music/popular/10`))
}

/**
 * get popular video and return commit
 * @param {commit} commit Commit
 * @return commit
 */
export async function getPopularVideo ({ commit }) {
  return commit('setPopularVideo', await axios.get(`/api/v1/videos/popular/10`))
}

/**
 * get popular Series and return commit
 * @param {Commit} commit Commit
 * @return commit
 */
export async function getPopularSeries ({ commit }) {
  return commit('setPopularSeries', await axios.get(`/api/v1/series/popular/10`))
}

export async function fetchNews ({ commit, dispatch }) {
  try {
    await axios.get("/blog/wp-json/wp/v2/posts?per_page=3").then((res) => {
      commit("addNews", res.data)
      // dispatch("fetchCat")
      dispatch("fetchStickyNews")
    })
  } catch (error) {
    console.error(error);
  }
}
export async function fetchStickyNews ({ commit }) {
  try {
    await axios.get("/blog/wp-json/wp/v2/posts?sticky=true&per_page=1").then((res) => {
      commit("setStickyNews", res.data)
      // dispatch("fetchCat")
    })
  } catch (error) {
    console.error(error);
  }
}
export async function fetchCat ({ commit, dispatch }) {
  try {
    await axios.get("/blog/wp-json/wp/v2/categories").then((res) => {
      commit("setCat", res.data)
      dispatch("fetchNews")
    })
  } catch (error) {
    console.error(error);
  }
}

