export function setMusic(state, res) {
  // state.allMusic = res.data
  state.allMusicMeta = res.data.meta
  state.allMusic = res.data.data.map(m => ({
    ...m,
    images: m.images.map(x => `https://app.leccel.net/${x}`)
  }));
}

/**
 * Set's LatestMusic Array from Commit
 * @param {Object} state $Store.state.latestMusic
 * @param {Object} res
 */
export function setLatestMusic(state, res) {
  state.latestMusic = res.data.map(v => ({
    ...v,
    images: v.images.map(x => `https://app.leccel.net/${x}`)
  }));
}

/**
 * Set's LatestMovie Array from Commit
 * @param {Object} state $Store.state.latestMovie
 * @param {Object} res
 */
export function setLatestMovie(state, res) {
  state.latestMovies = res.data.map(v => ({
    ...v,
    images: v.images.map(x => `https://app.leccel.net/${x}`),
    videos: v.videos.map(y => ({
      video_url: `https://app.leccel.net/${y.video_url}`,
      video_bytes: y.video_bytes
    }))
  }));
}

/**
 * Set's latestSeries Array from Commit
 * @param {Object} state $Store.state.latestSeries
 * @param {Object} res
 */
export function setLatestSeries(state, res) {
  state.latestSeries = res.data.map(series => ({
    ...series,

    images: series.images.map(x => `https://app.leccel.net/${x}`)
  }));
}

/**
 * Set's popularMusic Array from Commit
 * @param {Object} state $Store.state.popularMusic
 * @param {Object} res
 */
export function setPopularMusic(state, res) {
  state.popularMusic = res.data.map(m => ({
    ...m,
    images: m.images.map(x => `https://app.leccel.net/${x}`)
  }));
}

/**
 * Set's popularVideo Array from Commit
 * @param {Object} state $Store.state.popularVideo
 * @param {Object} res
 */
export function setPopularVideo(state, res) {
  state.popularVideo = res.data.map(v => ({
    ...v,
    images: v.images.map(x => `https://app.leccel.net/${x}`),
    videos: v.videos.map(y => ({
      video_url: `https://app.leccel.net/${y.video_url}`,
      video_bytes: y.video_bytes
    }))
  }));
}

/**
 * Set's popularSeries Array from Commit
 * @param {Object} state $Store.state.popularSeries
 * @param {Object} res
 */
export function setPopularSeries(state, res) {
  state.popularSeries = res.data.map(series => ({
    ...series,

    images: series.images.map(x => `https://app.leccel.net/${x}`)
  }));
}

export function addNews(state, news) {
  state.news = news.map(n => ({
    ...n,
    excerpt: n.excerpt.rendered.replace("app.leccel.net", "leccel.net"),
    categories: n.categories.map((c, i) => state.cat.find(x => x.id === c))
  }));
}
export function setStickyNews(state, news) {
  state.sticky_news = news.map(n => ({
    ...n,
    excerpt: n.excerpt.rendered.replace("app.leccel.net", "leccel.net"),
    categories: n.categories.map((c, i) => state.cat.find(x => x.id === c))
  }))[0];
}
export function setCat(state, cat) {
  state.cat = cat;
}

// export function appendCat(state){
//   state.sticky = state.sticky
// }
