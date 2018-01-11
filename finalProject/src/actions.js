import axios from "axios";

export const LOAD_DATA = "LOAD_DATA";
export const LOAD_RESTAURANTS = "LOAD_RESTAURANTS";
export const GET_DETAIL = "GET_RESTAURANT_DETAIL";
export const BACK = "BACK_TO_LIST";

export function loadData(){
    return {
        type: LOAD_DATA
    };
}

export function loadRestaurants(data){
    return {
        type: LOAD_RESTAURANTS,
        restaurants: data
    };
}

export function getRestaurantDetail(id){
    return {
        type: GET_DETAIL,
        id: id
    };
}

export function backToList(){
    return {
        type: BACK
    };
}

export function getGeolocationList() {
    return (dispatch)=> {

        dispatch(loadData());

        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(fetchRestaurantData(position.coords.latitude, position.coords.longitude));
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    };
}

export function fetchRestaurantData(lat, long) {
    return (dispatch) => {

        const API_KEY = "AIzaSyBx0qDH9ViB9dqx_hwFb5nNE8yIwpgVRDM";

        let url = "https://api.yelp.com/v3/businesses/search?term=restaurants&latitude="+lat+"&longitude="+long+"&sort_by=distance";


        axios.get(url, {headers: {Authorization: "Bearer " + API_KEY}})
            .then((response)=> {
                if (response.status != 200) {
                    throw Error(response.statusText);
                }
                return response;

            }).then((response) => {
            dispatch(loadRestaurants(response.data.businesses));
        });
    };
}