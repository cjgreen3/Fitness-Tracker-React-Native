import React from "react";
import {StyleSheet} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileView from "./ProfileView";
import TodayView from "./TodayView";
import ExerciseView from "./ExerciseView";
import Icon from "react-native-vector-icons/FontAwesome5";



class TabsView extends React.Component {
  constructor() {
    super();
    this.state = {
      color: "#900",
      size: 10
    };
  }

   
  render() {
 
    return (
      <Tab.Navigator>
      <Tab.Screen name="TodayView"
      options={{
        unmountOnBlur: true,
        tabBarLabel: 'Today',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="sun" size={30} color="#900" />
        )
        
      }}
      >
        
      {(props) => ( <TodayView {...props} 
                   username={this.props.username}
                  accessToken={this.props.accessToken}
                />
      )}
      </Tab.Screen>
      <Tab.Screen name="ExerciseView"
       options={{
        unmountOnBlur: true,

        tabBarLabel: 'Exercises',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="walking" size={30} color="#900" />
        )
        
      }}
      
      >
        {(props) => ( <ExerciseView {...props} 
                  accessToken={this.props.accessToken}
                  revokeAccessToken={this.props.revokeAccessToken}

                />
      )}
      </Tab.Screen>

      <Tab.Screen name="ProfileView"
      options={{
        unmountOnBlur: true,
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="users" size={30} color="#900" />
        )
      }}
      >
      {(props) => ( <ProfileView {...props} username={this.props.username}
                  accessToken={this.props.accessToken}
                  revokeAccessToken={this.props.revokeAccessToken}
                />
      )}
      </Tab.Screen>

      </Tab.Navigator>
    );
  }
}
const Tab = createBottomTabNavigator();


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bigText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 5,
  }
});

export default TabsView;
