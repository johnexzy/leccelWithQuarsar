// import something here
import carouselImage from '../components/utils/carousel/carouselImage'
import share from '../components/utils/share/share'
import comments from '../components/utils/comments/comments'
import Nav from '../components/layout/Nav'
import Footer from '../components/layout/Footer'
import series from '../components/pages/series/series'
import movies from '../components/pages/movies/movies'
import music from '../components/pages/music/music'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({Vue }) => {
  // something to do
  Vue.component('carousel-img', carouselImage)
  Vue.component('share', share)
  Vue.component('comment', comments)
  Vue.component('Footer', Footer)
  Vue.component('NavBar', Nav)
  Vue.component('music-index', music)
  Vue.component('series-index', series)
  Vue.component('movies-index', movies)
}
