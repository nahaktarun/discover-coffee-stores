
import {useRouter} from 'next/router';
import Link from 'next/link';
import CoffeeStoreData from '../../data/coffee-store.json'
import Head from 'next/head';
import styles from "../../styles/coffee-store.module.css";
import Image from 'next/image';
import cls from "classnames";
export function getStaticProps({params}) {

  return{
    props: {
      CoffeeStore: CoffeeStoreData.find(CoffeeStore => {
        return CoffeeStore.id.toString() === params.id;
      })
    }
  }
}

export function getStaticPaths () {

  const paths = CoffeeStoreData.map((CoffeeStore)=>{
    return{
      params:{
        id: CoffeeStore.id.toString(),
      }
    }
  })
  return {
    paths,
    fallback: false,
  }
}

const CoffeeStore = (props) =>{

  const router = useRouter();
  if(router.isFallback){
    return <div>Loading...</div>
  }
  const {address, name, neighbourhood, imgUrl} = props.CoffeeStore;
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
                <a>Back to home</a>
              </Link>
            </div>
            <div className={styles.nameWrapper}>
              <h1 className={styles.name}>{name}</h1>
            </div>
            <Image
              src={imgUrl}
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
                <p className={styles.text}>{address}</p>
             
            </div>
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt=""
              />
                <p className={styles.text}>{neighbourhood}</p>
             
            </div>
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/star.svg" width="24" height="24" alt=""/>
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