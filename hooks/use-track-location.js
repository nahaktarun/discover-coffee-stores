import { useContext, useState } from "react"
import { ACTION_TYPES, StoreContext } from "../store/store-context";
function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals).toFixed(
    decimals
  );
}
const useTrackLocation = () =>{
    const [ locationErrorMsg, setLocationErrorMsg] = useState('');
    // const [latLong, setLatLong] = useState('');
    const [isFindingLocation, setIsFindingLocation] = useState(false);
    
    const { dispatch } = useContext(StoreContext);
    const success = (position) =>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // setLatLong(`${round(latitude,2)},${round(longitude,2)}`);

        dispatch({
          type: ACTION_TYPES.SET_LAT_LONG,
          payload: { latLong: `${round(latitude, 2)},${round(longitude, 2)}` },
        });
        setLocationErrorMsg('');
        setIsFindingLocation(false);
    }
    const error = ( )=>{
        setIsFindingLocation(false);
        setLocationErrorMsg('Unable to retrieve your location');
    }
    const handleTrackLocation = ()=>{
        setIsFindingLocation(true);
        if (!navigator.geolocation){
            setLocationErrorMsg('GeoLocation is not supported by your browser');
            setIsFindingLocation(false);
        }
        else{
           
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }
    return {
      
        handleTrackLocation,
        locationErrorMsg,
        isFindingLocation
    }
}

export default useTrackLocation;