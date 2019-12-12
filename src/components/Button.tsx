import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,ActivityIndicator
} from "react-native";
import { colors } from "../constants";



interface Props extends TouchableOpacityProps {
  text: string;
  loading : boolean;
  IsDisabled : boolean;
}

// export class Button extends Component<Props, {}> {
//   render() {
//     const { text } = this.props;
//     return (
//       <TouchableOpacity {...this.props} style={styles.buttonStyle}>
//         <Text style={styles.buttonTextStyle}>{text}</Text>
//       </TouchableOpacity>
//     );
//   }
// }

export class Button extends Component<Props, {}>{
  render() {
    const {text, loading,IsDisabled } = this.props;
    console.log(loading)
    if(loading)
    {
      return(

        <TouchableOpacity  {...this.props} style={[styles.buttonStyle,this.props.style]}>
  
         
        <ActivityIndicator color="white"/>
  
      </TouchableOpacity>
      );
    }
    else{

    return(

      <TouchableOpacity  {...this.props} disabled={IsDisabled} style={[styles.buttonStyle,{backgroundColor:IsDisabled ? '#b09295' : '#db5c6b',shadowColor : IsDisabled ? '#b09295' : '#db5c6b'},this.props.style]}>

       
        <Text style = {styles.buttonTextStyle}>
          {text}

        </Text>

    </TouchableOpacity>
    );
  }

  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#db5c6b',
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    shadowColor: "#db5c6b",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,
    borderRadius: 5,
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: "700",
    fontSize: 16,
    fontFamily:'OpenSans-Regular'
  }
});
