import {fetchCoffeeStores} from "../../lib/coffee-stores";
const getCoffeeStoreByLocation = async (req, res) =>{

    // configure latLong and limit
    try{

        const {latLong, limit} = req.query 
        const response = await fetchCoffeeStores(latLong, limit);
        res.status(200);
        res.json(response);
    }
    catch(err){
        console.log("there is an error", err);
        res.status(500);
        res.json({message: 'somthing went wrong', err});
    }
    // return 


}

export default getCoffeeStoreByLocation;
