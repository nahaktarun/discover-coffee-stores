import { createApi } from "unsplash-js";
// initialize unsplash api

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});



const getUrlForCoffeeStores = (latLong, query,limit) =>{
return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

// ll = 43.65267326999575%2C-79.39545615725015
const getListOfCoffeeStorePhotos = async () =>{
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
    
  });
  //  console.log("photos", photos);
  const unsplashResults = photos.response.results;
  //  console.log(unsplashResults);

  return unsplashResults.map(
    (results) => results.urls["small"]
  );
  
}
export   const fetchCoffeeStores = async (latLong ='43.65267326999575%2C-79.39545615725015', limit = 6) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_AUTHORIZATION,
    },
  };

  const response = await fetch( getUrlForCoffeeStores(latLong, "coffee store", limit)
    ,
    options
  );
  const data = await response.json();

  console.log(data);
  return data.results.map((result, idx) =>{
    return {
      ...result,
      imageUrl:photos[idx],
    }
  });
};
