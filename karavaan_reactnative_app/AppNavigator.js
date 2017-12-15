import { StackNavigator } from "react-navigation";

import HomeComponent from "./component/HomeComponent";
import TripOverviewComponent from "./component/TripOverviewComponent";
import CreateTripComponent from "./component/CreateTripComponent";
import CreateUserComponent from "./component/CreateUserComponent";
import UserListOfTripComponent from "./component/UserListOfTripComponent";

// Add the routes in which you want to be able to use the navigator
// They will only be able to access it if you got there through navigate()
const AppNavigator = StackNavigator({
    Home: { screen: HomeComponent },
    TripOverview: { screen: TripOverviewComponent },
    CreateTrip:{screen:CreateTripComponent},
    CreateUser:{screen:CreateUserComponent},
    UserOverviewOfTrip:{screen:UserListOfTripComponent},
}, {
    headerMode: "none",
});
export default AppNavigator;