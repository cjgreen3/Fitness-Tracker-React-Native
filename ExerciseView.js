import React from "react";
import { TouchableOpacity, TextInput,Button, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
//import DateTimePickerModal from '@react-native-modal-datetime-picker';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Card } from 'react-native-elements';


class ExerciseView extends React.Component {
  constructor() {
    super();
    this.state = {
      activities: [],
      modalVisible: false,
      editModalVisible: false,
      show: true,
      mode: 'date',
      exerciseName: "",
      duration: 0.0,
      calories: 0.0,
      id: 0,
      date: new Date()


    };

  }


  
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
    
  }
  setEditModalVisible = (visible) => {
    this.setState({ editModalVisible: visible });
    
  }

  componentDidMount(){
      var date = new Date();
      var json = JSON.stringify(date);
      var dateStr = JSON.parse(json);
      //var date = new Date(dateStr).toISOString();
      console.log(date);
      this.setState({date: date});
      this.getActivities();      

  }


 
setShow(visible){
  this.setState({ show: visible });
}
setDate(date){
  this.setState({date: date});
}
setMode(mode){
  this.setState({mode: mode});
}
setId(id){
  this.setState({id: id});
}

onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    this.setShow(Platform.OS === 'ios');
    this.setDate(currentDate);
  };

showMode = (currentMode) => {
    this.setShow(true);
    this.setMode(currentMode);
  };

showDatepicker = () => {
    this.showMode('date');
  };

showTimepicker = () => {
    this.showMode('time');
  };

  handleSaveProfile(visible) {
    this.setModalVisible(visible);

    fetch("http://cs571.cs.wisc.edu:5000/activities/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.props.accessToken,
      },
      body: JSON.stringify({
        name : this.state.exerciseName,
        calories : this.state.calories,
        duration: this.state.duration,
        date : this.state.date
        
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Your exercise has been updated!");
        this.getActivities();

      })
      .catch((err) => {
        alert(
          "Something went wrong! Verify you have filled out the fields correctly."
        );
      });
  }

  getActivities(){
    console.log("Token " + this.props.accessToken);
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
        });
   
  }

  handleEdit1(id){
    this.setEditModalVisible(true);
    this.setId(id);

  }
  handleEdit2(){
    var id = this.state.id;
    fetch("http://cs571.cs.wisc.edu:5000/activities/"+ id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.props.accessToken,
      },
      body: JSON.stringify({
        name : this.state.exerciseName,
        calories : this.state.calories,
        duration: this.state.duration,
        date : this.state.date
        
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Your exercise has been updated!");
        this.getActivities();

        this.setEditModalVisible(false);

      })
      .catch((err) => {
        alert(
          "Something went wrong! Verify you have filled out the fields correctly."
        );
      });
  }
  handleDelete(id){
    
   fetch("http://cs571.cs.wisc.edu:5000/activities/" + id, {
    method: "DELETE",
    headers: {
          "Content-Type": "application/json",
          "x-access-token": this.props.accessToken,
        }
      })
         .then((res) => res.json())
         .then((res) => {
          alert("Exercise has been deleted!");
          this.getActivities();
         })
         .catch((err) => {
           alert("Something went wrong!");
         
       });

  }





printActivities(){

return this.state.activities.map((activity, id) => 
(
<Card key={id}>
    <Text style={styles.medText}>
    {activity.name}
    <View style={styles.spaceSmall}></View>
    </Text>
    <Text style={styles.smallText}>
    Duration (minutes): {activity.duration}
    <View style={styles.spaceSmall}></View>
    </Text>
    <Text style={styles.smallText}>
    Calories Burned: {activity.calories}
    <View style={styles.spaceSmall}></View>
    </Text>
    <Text style={styles.smallText}>
    Date:  {activity.date}
    <View style={styles.spaceSmall}></View>
    </Text>
    <Button onPress={()=>this.handleEdit1(activity.id)} title="Edit" color="#942a21"/>
    <View style={styles.spaceSmall}></View>
    <Button onPress={()=>this.handleDelete(activity.id)} title="Delete" color="#942a21"/>

  </Card>
  )
);

}
 

  render() {
    const { modalVisible } = this.state;
    //const { show } = this.state;

    return (
      <View style={styles.centeredView}>
        <Icon
            name="walking"
            size={40}
            color="#900"
            style={{ marginRight: 20 }}
          />
        <Text style={styles.bigText}>Exercise</Text>
        <Text style={styles.smallText}>Lets get to work! Record your exercises below</Text>
        


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Exercise Details</Text>
            <View>
              <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>
                Exercise name
            </Text>
            </View>
            <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Jogging"
            placeholderTextColor="#d9bebd"
            onChangeText={(exerciseName) => this.setState({ exerciseName: exerciseName })}
            value={this.state.exerciseName}
            />
            <View style={styles.spaceSmall}></View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}> Duration (minutes) </Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="0"
            placeholderTextColor="#d9bebd"
            onChangeText={(duration) =>
              this.setState({
                duration: !duration
                  ? 0
                  : parseFloat(duration),
              })
            }
            value={this.state.duration + ""}
            autoCapitalize="none"
          />
          <View style={styles.spaceSmall}></View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories Burnt</Text>
           <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="0"
            placeholderTextColor="#d9bebd"
            onChangeText={(calories) =>
              this.setState({
                calories: !calories
                  ? 0
                  : parseFloat(calories),
              })
            }
            value={this.state.calories + ""}
            autoCapitalize="none"
          />
          <View style={styles.spaceSmall}></View>
          <View>
            <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>
            {this.state.date.toLocaleString()}
          </Text>
            </View>
            <View style={styles.spaceSmall}></View>
          <View>
                <View>
                <Button  onPress={this.showDatepicker} title="Set date" color="#942a21"/>
                </View>
                <View style={styles.spaceSmall}></View>
                <View>
                <Button  onPress={this.showTimepicker} title="Set time" color="#942a21" />
                </View>
                {this.state.show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={this.state.mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange}
                  />
                )}
          </View>
            <View style={styles.spaceSmall}></View>
            <View style={styles.spaceSmall}></View>
            <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>
            Looks good! Ready to save your work?
          </Text>
            <View style={styles.spaceSmall}></View>
            <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Save Exercise"
                  accessibilityHint="Save your exercise with all the specified information"
                  onPress={() => this.handleSaveProfile(!modalVisible)}>
                  <View>
                    <Text>Save Exercise</Text>
                  </View>
            </TouchableOpacity>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.handleSaveProfile(!modalVisible)}
            >
              <Text style={styles.textStyle}>SAVE EXERCISE</Text>
            </Pressable> */}
            <View style={styles.spaceSmall}></View>
            <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Nevermind!"
                  accessibilityHint="Close the pop to add an exercise"
                  onPress={() => this.setModalVisible(!modalVisible)}>
                  <View>
                    <Text>Nevermind</Text>
                  </View>
            </TouchableOpacity>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Nevermind</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.editModalVisible}
        onRequestClose={() => {
          this.setEditModalVisible(!editModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Exercise Details</Text>
            <View>
              <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>
                Exercise name
            </Text>
            </View>
            <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Jogging"
            placeholderTextColor="#d9bebd"
            onChangeText={(exerciseName) => this.setState({ exerciseName: exerciseName })}
            value={this.state.exerciseName}
            />
            <View style={styles.spaceSmall}></View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}> Duration (minutes) </Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="0"
            placeholderTextColor="#d9bebd"
            onChangeText={(duration) =>
              this.setState({
                duration: !duration
                  ? 0
                  : parseFloat(duration),
              })
            }
            value={this.state.duration + ""}
            autoCapitalize="none"
          />
          <View style={styles.spaceSmall}></View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories Burnt</Text>
           <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="0"
            placeholderTextColor="#d9bebd"
            onChangeText={(calories) =>
              this.setState({
                calories: !calories
                  ? 0
                  : parseFloat(calories),
              })
            }
            value={this.state.calories + ""}
            autoCapitalize="none"
          />
          <View style={styles.spaceSmall}></View>
          <View>
            <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>
            {this.state.date.toLocaleString()}
          </Text>
            </View>
            <View style={styles.spaceSmall}></View>
          <View>
                <View>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Open Date Picker"
                  accessibilityHint="Allows to select the date of your exercise"
                  onPress={this.showDatepicker}>
                  <View>
                    <Text>Set date</Text>
                  </View>
                </TouchableOpacity>
                {/* <Button  
                accessible={true}
                accessibilityLabel="Open Date Picker"
                accessibilityHint="Allows to select the date of your exercise"
                onPress={this.showDatepicker} title="Set date" color="#942a21"/> */}
                </View>
                <View style={styles.spaceSmall}></View>
                <View>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Open Time Picker"
                  accessibilityHint="Allows to select the time of your exercise"
                  onPress={this.showTimepicker}>
                  <View>
                    <Text>Set time</Text>
                  </View>
                </TouchableOpacity>
                  
                {/* <Button  
                accessible={true}
                accessibilityLabel="Open Time Picker"
                accessibilityHint="Allows to select the time of your exercise"
                onPress={this.showTimepicker} title="Set time" color="#942a21" /> */}
                </View>
                {this.state.show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={this.state.mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange}
                  />
                )}
          </View>
            <View style={styles.spaceSmall}></View>
            <View style={styles.spaceSmall}></View>
            <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>
            Looks good! Ready to save your work?
          </Text>
            <View style={styles.spaceSmall}></View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.handleEdit2()}
            >
              <Text style={styles.textStyle}>SAVE EDIT EXERCISE</Text>
            </Pressable>
            <View style={styles.spaceSmall}></View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.setEditModalVisible(!this.state.editModalVisible)}
            >
              <Text style={styles.textStyle}>Nevermind</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() =>this.setModalVisible(true) }
        accessible={true}
        accessibilityLabel="Add Exercise"
        accessibilityHint="Opens pop up for adding exercise"
      >
        <Text style={styles.textStyle}>Add Exercise</Text>
      </Pressable>
      {this.getActivities}
        {this.printActivities()}

      
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
  smallText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5
  },
  input: {
    width: 200,
    padding: 10,
    margin: 5,
    height: 40,
    borderColor: "#c9392c",
    borderWidth: 1,
  },
  spaceSmall: {
    width: 20, // or whatever size you need
    height: 10,
  },
  button: {
    padding: 10,
    elevation: 2
  },
  buttonOpen: {

    backgroundColor: "#942a21",
  },
  buttonClose: {
    backgroundColor:"#942a21",
  },
  medText: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 5
  }

});

export default ExerciseView;
