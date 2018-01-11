import React, {Component} from "react";
import { List } from "native-base";
import Item from "./Item";
import { connect } from "react-redux";

class List extends Component {
    render() {

        const restaurants = this.props.restaurants.map((item) => {
            return (
                <Item {...item} key={item.id}/>
            );
        });

        return (
            <List>
                {restaurants}
            </List>
        );
    }
}

function mapStateToProps(state){
    return {
        restaurants: state.restaurants
    };
}

export default connect(mapStateToProps)(List);