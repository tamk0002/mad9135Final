import {LOAD_RESTAURANTS, GET_DETAIL, BACK, LOAD_DATA} from "./actions";
import {LIST, DETAIL, LOAD} from "./index";

export default function reducers(state, action) {
    let newState = Object.assign({}, state);

    switch(action.type) {

        case LOAD_DATA:
            newState = Object.assign({}, loadData(newState, action.id));
            break;

        case LOAD_RESTAURANTS:
            newState = Object.assign({},loadRestaurants(newState, action.restaurants));
            break;

        case GET_DETAIL:
            newState = Object.assign({}, getRestaurantDetail(newState, action.id));
            break;

        case BACK:
            newState = Object.assign({}, backToList(newState));
            break;

        default:
            return state;
    }

    return newState;
}

function loadData(newState){

    newState.page = LOAD;

    return newState;
}

function loadRestaurants(newState, restaurants){

    newState.page = LIST;

    newState.restaurants = restaurants;
    return newState;
}

function getRestaurantDetail(newState, id){

    newState.page = DETAIL;

    restaurant = newState.restaurants.find(item => item.id == id ? true: false);
    newState.selectedItem = restaurant;
    return newState;
}

function backToList(newState){

    newState.page = LIST;

    newState.selectedItem = undefined;
    return newState;
}