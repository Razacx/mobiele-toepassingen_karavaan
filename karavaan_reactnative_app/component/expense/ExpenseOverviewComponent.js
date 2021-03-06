import React from "react";
import {PaymentListComponent} from "./PaymentListComponent";
import {
    Body, Button, Container, Fab, Footer, H3, Header, Icon, Left, Right, Subtitle, Tab, Tabs, Text,
    Title, View
} from "native-base";
import * as ExpenseType_1 from "../../domain/ExpenseType";
import {BillItemListComponent} from "./BillItemListComponent";
import UserListComponent from "../UserListComponent";
import {DebtListComponent} from "./DebtListComponent";
import {Alert} from "react-native";
import {ShareListComponent} from "./ShareListComponent";

export class ExpenseOverviewComponent extends React.Component {

    // Properties
    // - tripId (via navigation)
    // - expenseId (via navigation)

    constructor(props) {
        super(props);
        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;
        global.observerService.addExpenseCallback(tripId, expenseId, () => {
            this.forceUpdate();
            this.props.navigation.state.params.onChange();
        } );

    }

    navigateParticipantAdd() {
        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;

        let returnUser = (user) => {
            global.service.addParticipantToExpenseById(tripId, expenseId, user.id);
            global.saveService();
        };

        this.props.navigation.navigate("TripUserPicker", {
            tripId: tripId,
            returnUser: returnUser.bind(this)
        });
    }

    navigateAddPayment() {
        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;

        this.props.navigation.navigate("AddPayment", {
            tripId: tripId,
            expenseId: expenseId
        });
    }

    navigateAddBillItem() {
        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;

        this.props.navigation.navigate("AddBillItem", {
            tripId: tripId,
            expenseId: expenseId
        });
    }

    navigateAddShare() {
        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;

        this.props.navigation.navigate("AddShare", {
            tripId: tripId,
            expenseId: expenseId
        });
    }

    removeExpense() {
        Alert.alert(
            'Delete Expense',
            'Are you sure you want to delete this expense? All data will be lost',
            [
                {
                    text: 'No', onPress: () => {
                    }, style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        try {
                            let tripId = this.props.navigation.state.params.tripId;
                            let expenseId = this.props.navigation.state.params.expenseId;
                            global.service.removeExpenseFromTripById(tripId, expenseId);
                            global.saveService();
                            this.props.navigation.goBack();
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

        let tripId = this.props.navigation.state.params.tripId;
        let trip = global.service.getTripById(tripId);
        let expenseId = this.props.navigation.state.params.expenseId;
        let expense = global.service.getExpenseById(tripId, expenseId);

        let addPaymentMarginBottom = expense.expenseType === ExpenseType_1.ExpenseType.EvenExpense ? 10 : 0;

        return (

            <Container>

                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{expense.description}</Title>
                    <Subtitle>{expense.category}</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => this.removeExpense()} transparent>
                            <Icon active name="trash"/>
                        </Button>
                    </Right>
                </Header>

                <Tabs>
                    <Tab heading="Overview">

                        <View style={{flexDirection: 'row', margin:10}}>
                            <H3 style={{flex: 1}}>Total: {trip.convertToActiveCurrency(expense.expenseAmount).toFixed(2).toString()} {trip.activeCurrency}</H3>
                            {expense.expenseType !== ExpenseType_1.ExpenseType.EvenExpense && <H3>Unpaid: {trip.convertToActiveCurrency(expense.expenseUnpaid).toFixed(2).toString()} {trip.activeCurrency}</H3>}
                        </View>

                        <H3 style={{marginLeft:10, marginBottom:10}}>Payments</H3>
                        <PaymentListComponent tripId={tripId} expenseId={expenseId}/>
                        <Button style={{alignSelf:'center', marginBottom: addPaymentMarginBottom}} onPress={() => this.navigateAddPayment()}><Text>Add Payment</Text></Button>

                        {expense.expenseType === ExpenseType_1.ExpenseType.BillExpense && <H3 style={{marginLeft: 10, marginBottom: 10}}>Bill Items</H3>}
                        {expense.expenseType === ExpenseType_1.ExpenseType.BillExpense && <BillItemListComponent tripId={tripId} expenseId={expenseId}/>}
                        {expense.expenseType === ExpenseType_1.ExpenseType.BillExpense &&
                        <Button style={{alignSelf:'center', marginBottom: 10}} onPress={() => this.navigateAddBillItem()}><Text>Add BillItem</Text></Button>}

                        {expense.expenseType === ExpenseType_1.ExpenseType.ShareExpense && <H3 style={{marginLeft: 10, marginBottom: 10}}>Shares</H3>}
                        {expense.expenseType === ExpenseType_1.ExpenseType.ShareExpense && <ShareListComponent tripId={tripId} expenseId={expenseId}/>}
                        {expense.expenseType === ExpenseType_1.ExpenseType.ShareExpense &&
                        <Button style={{alignSelf:'center', marginBottom: 10}} onPress={() => this.navigateAddShare()}><Text>Add Share</Text></Button>}

                    </Tab>

                    <Tab heading="Debts">
                        <DebtListComponent tripId={tripId} expenseId={expenseId}/>
                    </Tab>

                    <Tab heading="Participants">
                        <UserListComponent
                            sourceFunc={() => global.service.getParticipantsByExpenseId(tripId, expenseId)}
                            observerFunc={(component) => global.observerService.addExpenseCallback(tripId, expenseId, () => component.forceUpdate())}
                        />
                        {expense.expenseType === ExpenseType_1.ExpenseType.EvenExpense &&
                        <Fab postion="bottomRight" style={{backgroundColor: "#5067FF"}}
                             onPress={() => this.navigateParticipantAdd()}>
                            <Icon name="md-add"/>
                        </Fab>}
                    </Tab>
                </Tabs>

            </Container>

        );
    }


}