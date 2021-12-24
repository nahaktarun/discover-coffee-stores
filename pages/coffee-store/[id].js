
import {useRouter} from 'next/router';
import Link from 'next/link';
import CoffeeStoreData from '../../data/coffee-store.json'
import Head from 'next/head';
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
  const {address, name, neighbourhood} = props.CoffeeStore;
    console.log("props:",props);
    return (
      <div>
        <Head>
          <title>{name}</title>
        </Head>
        <Link href="/">
          <a>Back to home</a>
        </Link>
       
        <p>{address}</p>
        <p>{name}</p>
        <p>{neighbourhood}</p>
      </div>
    );
}


export default CoffeeStore; 