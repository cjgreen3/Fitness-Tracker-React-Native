import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Card } from 'react-native-elements';

class TodayView extends React.Component {
  constructor() {
    super();
    this.state = {
      goalDailyActivity: 0.0,
      dailyActivity: 0.0,
      activities: []

    }
    this.computeDailyActivity = this.computeDailyActivity.bind(this);


  }
  componentDidMount() {
    this.getGoalDailyActivity();
    this.getActivities();
   
  }

  getGoalDailyActivity(){
    fetch("http://cs571.cs.wisc.edu:5000/users/" + this.props.username,{
      headers: { "x-access-token": this.props.accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          goalDailyActivity: res.goalDailyActivity,
        });
      });
  }

  getActivities(){
          fetch("http://cs571.cs.wisc.edu:5000/activities/",{
            method: "GET",
            headers: { "x-access-token": this.props.accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.activities);

        this.setState({
          activities: res.activities,

        });
        this.printActivities();
      });
      console.log(this.state.activities);
  }


computeDailyActivity(){
  var returnVal = 0;
  for(var i = 0; i < this.state.activities.length; i++){
    returnVal += this.state.activities[i].duration;
  
  }
  return returnVal;

}

 printActivities(){

   console.log(this.state.activities);
  let today = new Date();
  //var dailyActivity = this.state.dailyActivity;
   var exerciseObj = [];
   for(var i = 0; i < this.state.activities.length; i++){
    var curDate = new Date(this.state.activities[i].date);
    curDate = new Date(curDate.getTime() - (curDate.getTimezoneOffset() * 60000));
     if(curDate.toString().includes(today.toString().substring(0,16))){
      // dailyActivity += this.state.activities[i].duration;
      // this.setDailyActivity(dailyActivity);
      exerciseObj.push(
       
       <Card>
           <Text style={styles.medText}>
           {this.state.activities[i].name}
           <View style={styles.spaceSmall}></View>
           </Text>
           <Text style={styles.smallText}>
           Duration (minutes): {this.state.activities[i].duration}
           <View style={styles.spaceSmall}></View>
 
           </Text>
           <Text style={styles.smallText}>
           Calories Burned: {this.state.activities[i].calories}
           <View style={styles.spaceSmall}></View>
           </Text>
 
           <Text style={styles.smallText}>
           Date:  {this.state.activities[i].date}
           <View style={styles.spaceSmall}></View>
           </Text>
 
         </Card>
      )
    
     }
     }
     return exerciseObj;

 }
  
  render() {

    return (
      <View style={styles.container}>
           <Icon
            name="cog"
            size={40}
            color="#900"
            style={{ marginRight: 20 }}
          />
        <Text style={styles.bigText}>TodayView</Text>
        <Card>
        <Text style={styles.smallText}>Goals</Text>
        <Text style={styles.smallText}>Daily Activity: {this.computeDailyActivity()}</Text>
        <Text style={styles.smallText}>Goal Daily Activity: {this.state.goalDailyActivity}</Text>
        </Card>

      
        <Icon
            name="walking"
            size={40}
            color="#900"
            style={{ marginRight: 20 }}
          />
      <Text style={styles.medText}>Exercises
      </Text>
      <View>
      {this.printActivities()}
      </View>
      
      </View>


    );
  }
}

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
  }, 
  medText: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 5,
  },
  spaceSmall: {
    width: 20, // or whatever size you need
    height: 10,
  },
  smallText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 5,
  }
});

export default TodayView;
