import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner'
import Card from '../components/card'
import useTrackLocation from '../hooks/use-track-location'
import { fetchCoffeeStores } from '../lib/coffee-stores'
import styles from '../styles/Home.module.css'
// import coffeeStoresData from '../data/coffee-store.json';
export async function getStaticProps(context){


  const coffeeStores = await  fetchCoffeeStores();

return {
  props: {
    coffeeStores,
  },
};

}
export default function Home(props) {
  console.log(props);
  const {handleTrackLocation, latLong, locationErrorMsg, isFindingLocation}  = useTrackLocation();
  
  console.log({latLong});
  console.log({locationErrorMsg});
  const handleOnBannerBtnClick = () =>{
    handleTrackLocation();
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Cafe Near Me</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        
        {/* Something went wrong : {locationErrorMsg} */}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            alt="heroimage"
            width={700}
            height={400}
          />
        </div>
        {props.coffeeStores.length > 0 && (
          <div>
            <h2 className={styles.heading2}>Toronto Stores</h2>

            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imageUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

