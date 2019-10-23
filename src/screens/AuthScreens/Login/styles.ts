import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg,
    justifyContent: "center"
  },
  headStyle: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor
  },
  headText: {
    fontSize: 18,
    fontWeight: "700"
  },
  inputContainer: {
    justifyContent: "center",
    padding: 5,
    marginBottom:10,
    shadowColor: '#adadad',backgroundColor: 'white',
    marginLeft:10,marginRight:10,
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,
    borderRadius: 5
  },
  signupLink: {
    flexDirection: "row",
    justifyContent: "center"
  },
  linkText: {
    color: colors.primary,
    fontWeight: "700"
  },forgotPassword:{

    color:'#c0c0c0',

    marginRight:15,
    fontFamily:'OpenSans-Regular'
    
}
});

export default styles;
