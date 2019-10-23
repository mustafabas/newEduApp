import React, { Component } from 'react';
import { View, StatusBar, TextInput, Text,TextInputProps } from 'react-native';
import { colors } from "../constants";

interface Props extends TextInputProps {

    text : string;
    error?:any
}


export class FloatingLabelInput extends Component<Props,{}> {
  state = {
    isFocused: false,
    value : ''
  };

  handleFocus = () => this.setState({ isFocused: true
                                                        });
  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { text,error } = this.props;
    const { isFocused } = this.state;
    const  ischanged  = this.props.onChangeText

    return (
      <View style={{ paddingTop: 18 }}>
        <Text style={{position: 'absolute',
      left: 0,
      top: (!isFocused && (this.state.value=="")) ? 18 : 0,
      fontSize: (!isFocused && this.state.value=="") ? 20 : 14,
      color: !isFocused ? '#aaa' : '#aaa'}}>
          {text}
        </Text>

        <TextInput
           
         {...this.props}

          style={{ height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: error ? colors.accent : colors.borderColor}}
        
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          
          blurOnSubmit
          placeholder="mal"
          value = {this.state.value}
          
          onChangeText={text1 => this.setState({value : text1})}

        />
      </View>
    );
  }
}
