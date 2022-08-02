import React from "react";
import { StyleSheet, Text} from "react-native";



class Exercise extends React.Component {
  constructor() {
    super();

  }
  render() {
    return (

        <View>
        <Text style={styles.smallText}> {this.props.activity.name}</Text>
        <Text style={styles.smallText}> {this.props.activity.calories}</Text>
        <Text style={styles.smallText}> {this.props.activity.date.toLocaleString()}</Text>
        <Text style={styles.smallText}> {this.props.activity.duration}</Text>

        </View>

    );
  }
}
const styles = StyleSheet.create({
    smallText: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 5,
      }
});

export default Exercise;
