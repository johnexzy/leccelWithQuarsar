export function someGetter (/* state */) {
}
/**
         *
         * @param {Object} state states oject
         * @returns {Array} latestmusic
         */
export function LatestMusic (state) {
  return state.latestMusic
}
export function AllMusic(state) {
  return state.allMusic;
}
export function AllMusicMeta(state) {
  return state.allMusicMeta;
}
/**
 * Returns Popular music
 * @param {Object} state states oject
 * @returns {Array} popular music
 */
export function PopularMusic (state) {
  return state.popularMusic
}

/**
 * Returns Latest movies
 * @param {Object} state states oject
 * @returns {Array} latest movies
 */
export function LatestMovies (state) {
  return state.latestMovies
}

/**
 * Returns Popular movies
 * @param {Object} state states oject
 * @returns {Array} popular movies
 */
export function PopularMovies (state) {
  return state.popularVideo
}

/**
 * Returns Popular series
 * @param {Object} state states oject
 * @returns {Array} popular series
 */
export function PopularSeries (state) {
  return state.popularSeries
}

/**
 * Returns Latest series
 * @param {Object} state states oject
 * @returns {Array} latest series
 */
export function LatestSeries (state) {
  return state.latestSeries
}

export function News (state) {
  return state.news
}
export function Categories(state) {
  return state.cat
}
export function StickyNews(state) {
  return state.sticky_news
}
