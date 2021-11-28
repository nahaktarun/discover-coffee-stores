
import {useRouter} from 'next/router';
import Link from 'next/link';

const CoffeeStore = () =>{

    const router = useRouter();
    return (
      <div>
        Coffee Store page {router.query.id}
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
    );
}


export default CoffeeStore; 