import React, {Component} from "react";
import {Container, Header, Title, Content, Footer, FooterTab, Button, Body, Text, Left, Icon, Right, Spinner} from "native-base";
import RestaurantList from "./List";
import RestaurantDetail from "./Detail";
import * as actions from "../actions";
import {connect} from "react-redux";
import {LIST, DETAIL, LOAD} from "../index";

class Main extends Component {
    render() {

        let return_btn;
        let body;

        switch (this.props.page) {
            case DETAIL:
                return_btn = (
                    <Content>
                        <Button full primary onPress={this.props.returnToList}>
                            <Left><Icon name ="arrow-back" /></Left>
                            <Text>BACK</Text>
                        </Button>
                    </Content>
                );
                body = <RestaurantDetail/>;
                break;

            case LIST:
                body = (
                    <Content>
                        <Button full primary onPress={this.props.fetchData}>
                            <Text>FIND RESTAURANTS NEARBY</Text>
                        </Button>

                        <RestaurantList/>
                    </Content>
                );
                break;

            case LOAD:
                body = <Spinner color='blue'/>;
                break;

            default:
                body = <Text>ERROR LOADING APP</Text>;

        }

        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                    <Title>{this.props.selectedItem ? this.props.selectedItem.name :"RESTAURANT LIST"}</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content>
                    {return_btn}
                    {body}
                </Content>

                <Footer>
                    <FooterTab>
                        <Button full><Text>&copy; Christine Tamkican</Text></Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.page,
        selectedItem: state.selectedItem
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(actions.getGeolocationList()),
        returnToList: () => dispatch(actions.backToList())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);