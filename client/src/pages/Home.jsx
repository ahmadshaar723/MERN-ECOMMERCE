
import Hero from '../components/Hero'
import LatestProduct from '../components/LatestProduct'
import NewsLetter from '../components/NewsLetter'
import Offer from '../components/Offer'
import PopularProducts from '../components/PopularProducts'

const Home = () => {
  return (
    <>
    <Hero/>
    <PopularProducts/>
    <Offer/>
    <LatestProduct/>
    <NewsLetter/>
    </>
  )
}

export default Home