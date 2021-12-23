
import {useRouter} from 'next/router';
import Link from 'next/link';
import CoffeeStoreData from '../../data/coffee-store.json'

export function getStaticProps({params}) {

  return{
    props: {
      CoffeeStore: CoffeeStoreData.find(CoffeeStore => {
        return CoffeeStore.id === 0;
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
    ]
  }
}

const CoffeeStore = () =>{

    const router = useRouter();
    return (
      <div>
        Coffee Store page {router.query.id}
        <Link href="/" >
          <a>Back to home</a>
        </Link>
        <Link href="/coffee-store/dynamic" >
          <a>Go To dynamic page..</a>
        </Link>
      </div>
    );
}


export default CoffeeStore; 