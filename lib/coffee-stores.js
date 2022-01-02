import { createApi } from "unsplash-js";
// initialize unsplash api

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});



const getUrlForCoffeeStores = (latLong, query,limit) =>{
return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

// ll = 43.65267326999575%2C-79.39545615725015

export   const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.AUTHORIZATION,
    },
  };

  const response = await fetch( getUrlForCoffeeStores("43.65267326999575%2C-79.39545615725015", "coffee store", 6)
    ,
    options
  );
  const data = await response.json();

  console.log(data);
  return data.results;
};
