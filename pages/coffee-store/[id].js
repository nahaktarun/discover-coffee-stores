
import {useRouter} from 'next/router';
import Link from 'next/link';
import CoffeeStoreData from '../../data/coffee-store.json'

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
  return {
    paths:[
      {
        params: {id: "0"}
      },
      {
        params: {id: "1"}
      }
      ,
      {
        params: {id: "300"}
      }
    ],
    fallback: false,
  }
}

const CoffeeStore = (props) =>{

    const router = useRouter();
    console.log("props:",props);
    return (
      <div>
        Coffee Store page {router.query.id}
        <Link href="/" >
          <a>Back to home</a>
        </Link>
        <Link href="/coffee-store/dynamic" >
          <a>Go To dynamic page..</a>
        </Link>
        <p>{props.CoffeeStore.address}</p>
        <p>{props.CoffeeStore.name}</p>
      </div>
    );
}


export default CoffeeStore; 