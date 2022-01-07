
import {useRouter} from 'next/router';
import Link from 'next/link';
import CoffeeStoreData from '../../data/coffee-store.json'
import Head from 'next/head';
import styles from "../../styles/coffee-store.module.css";
import Image from 'next/image';
import cls from "classnames";
import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { StoreContext } from '../../store/store-context';
export async function getStaticProps({params}) {
  
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((CoffeeStore) => {
        return CoffeeStore.fsq_id.toString() === params.id;
      })
  return {
    props: {
      CoffeeStore: findCoffeeStoreById
        ? findCoffeeStoreById
        : "4baa31def964a52037523ae3",
    },
  };
}

export async function getStaticPaths () {
const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((CoffeeStore)=>{
    return{
      params:{
        id: CoffeeStore.fsq_id.toString(),
      }
    }
  })
  return {
    paths,
    fallback: true,
  }
}

const CoffeeStore = (props) =>{

  const router = useRouter();
  if(router.isFallback){
    return <div>Loading...</div>
  }
  const {location, name, neighbourhood, imageUrl} = props.CoffeeStore;
    console.log("props:",props);

    const handleUpVoteButton = () =>{
      console.log("Upvote");
    }
    return (
      <div>
        <Head>
          <title>{name}</title>
        </Head>
        <div className={styles.container}>
          <div className={styles.col1}>
            <div className={styles.backToHomeLink}>
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            </div>
            <div className={styles.nameWrapper}>
              <h1 className={styles.name}>{name}</h1>
            </div>
            <Image
              src={
                imageUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
              width={600}
              height={360}
              alt={name}
              className={styles.storeImg}
            ></Image>
          </div>
          <div className={cls("glass", styles.col2)}>
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt=""
              />
              <p className={styles.text}>{location.address || ""}</p>
            </div>
            {location.neighborhood && (
              <div className={styles.iconWrapper}>
                <Image
                  src="/static/icons/nearMe.svg"
                  width="24"
                  height="24"
                  alt=""
                />
                <p className={styles.text}>{location.neighborhood}</p>
              </div>
            )}
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/star.svg"
                width="24"
                height="24"
                alt=""
              />
              <p className={styles.text}>1</p>
            </div>
            <button
              className={styles.upvoteButton}
              onClick={handleUpVoteButton}
            >
              Up Vote !
            </button>
          </div>
        </div>
      </div>
    );
}


export default CoffeeStore; 