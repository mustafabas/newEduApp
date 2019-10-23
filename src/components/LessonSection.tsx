import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  View
} from "react-native";
import { colors } from "../constants";



interface Props extends TouchableOpacityProps {
  text: string;
}


export class LessonSection extends Component<Props, {}>{

  static navigationOptions = {
    headerMode:null
  }
  render() {
    const {text,onPress} = this.props;

    return(
      <View style={styles.viewStyle}>
        <Text style = {styles.buttonTextStyle}>
          
        Section-1
        </Text>
        <Text style = {styles.textCenterStyle}>
          burada dersin icerigi hakkinda kisa bilgi

          burada dersin icerigi hakkinda kisa bilgi

          burada dersin icerigi hakkinda kisa bilgi

          </Text>

          <TouchableOpacity onPress={onPress} >
              <Text style= {styles.plusStyle}>
                  +
              </Text>
          </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    viewStyle: {
    flex:1,
    flexDirection : 'row',
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    paddingTop:10,
    paddingBottom:10,
    
    shadowColor: '#828282',
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,
    borderRadius: 5,
    backgroundColor : 'white'
  },
  buttonTextStyle: {
    fontSize: 16,
    flex:.28,
    color :'#c47e7e',
    fontWeight:"600"
  },
  textCenterStyle: {
      flex:0.62,
      color :'#828282',
      fontWeight:"700"
  },
  plusStyle: {
      paddingLeft:10,
      color:'#828282',
      flex:0.1,
      fontSize: 50,
      fontWeight : "300"
  }
});
