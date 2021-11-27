
import {useRouter} from 'next/router';

const CoffeeStore = () =>{

    const router = useRouter();
    return (
        <div>Coffee Store page {router.query.id}</div>
    )
}


export default CoffeeStore; 