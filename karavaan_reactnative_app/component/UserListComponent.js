import React from 'react';
import {
    Container,
    Tab,
    List,
    ListItem,
    Content,
    Left,
    Body,
    Icon,
    Text,
    Thumbnail,
    SwipeRow,
    Button,
    View,
    Right
} from 'native-base';

import '../ServiceWrapper.js';
import {Alert} from "react-native";

export default class UserListComponent extends React.Component {

    //Properties
    // - navigation (object) : Navigation object
    // - sourceFunc (function) : A function that will fetch the array of users
    // - observerFunc (function) : Function that registers a callback to the ObserverService. Takes one argument, (component)

    // - isPicker (bool) : If true, this component will act as a Picker
    // - pickerFunc (function) : Function to execute when a user has been clicked

    constructor(props) {
        super(props);
        if (this.props.observerFunc !== undefined) this.props.observerFunc(this);
    }

    executePickerFunc(user) {
        if (this.props.isPicker) this.props.pickerFunc(user);
    }

    removeUser(userId) {
        let removeUserFunc = this.props.removeUserFunc;
        Alert.alert(
            'Delete User',
            'Are you sure you want to delete this user? All data will be lost',
            [
                {
                    text: 'No', onPress: () => {
                    }, style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        try {
                            removeUserFunc(userId);
                        }
                        catch (error) {
                            alert(error);
                        }
                    }
                },
            ],
            {cancelable: false}
        );
    }

    render() {

        return (
            <Content>
                <List dataArray={this.props.sourceFunc()} renderRow={(user) =>
                    <ListItem key={user.userId} button={this.props.isPicker}
                              onPress={() => this.executePickerFunc(user)} icon>
                        <Left>
                            <Icon style={{fontSize: 25}} name="person"/>
                        </Left>
                        <Body>
                        <Text style={{fontSize: 18}}>{user.name}</Text>
                        </Body>
                        <Right>
                            {this.props.removeUserFunc !== undefined &&
                            <Button transparent onPress={() => this.removeUser(user.id)}>
                                <Icon style={{color:'rgba(0,0,0,0.4)'}} name="trash"/>
                            </Button>
                            }
                        </Right>
                    </ListItem>
                }/>
            </Content>
        );
    }
}
