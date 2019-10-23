import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,ViewProps,
} from 'react-native';

import {
  SafeAreaView
} from 'react-navigation'
import { Input, Button, FloatingLabelInput,LessonSection } from "../../../components";
import stylesNew from "../../AuthScreens/Login/styles";
import DeviceInfo from 'react-native-device-info';
import {NavigationScreenProps,NavigationScreenProp,NavigationScreenComponent,NavigationStackScreenOptions} from 'react-navigation'
import { Header } from 'react-native-elements';

interface NavStateParams {
  someValue: string
}

export interface HomeScreenProps {
  navigationScreen:  NavigationScreenComponent<{}>
  navigation :  NavigationScreenProp<any,any>
};


const MyStatusBar = ({ ...props}) => (
  <View style={[styles.statusBar, { backgroundColor:'green' }]}>
    <StatusBar translucent backgroundColor={'green'} {...props} />
  </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT ;

var HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT ;
var hasNotchTmp = false

DeviceInfo.hasNotch().then(hasNotch => {

  if (hasNotch) {
    hasNotchTmp = hasNotch

    HEADER_SCROLL_DISTANCE -=30
  }
  
  
  
  
  
    })

export default class App extends Component<HomeScreenProps,{}> {

  constructor(props : any) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      position : 0
    };



  }

  _renderScrollViewContent() {

  }

  static navigationOptions = (
    screenProps: NavigationScreenProps
  ) => {
    return { 

      headerStyle : {
          // height : screenProps.navigation.getParam('headerHeight'),
          // backgroundColor:'#d67676'
      },
        header: null 
    }
  }  

  componentDidMount(){

  }

 componentWillMount() {

 


 
  
  
  }

  


  _increaseCount = (pos : number) => {
    this.setState({position : pos })

  };


  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.

    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE ],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const textOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 200],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [hasNotchTmp ? 0 : 0, 0, hasNotchTmp ?  20 :  5],
      extrapolate: 'clamp',
    });

    

    return (
      <SafeAreaView  style={
        styles.fill}>

        {/* <View style={{backgroundColor: '#772ea2'}}>
        {/* <MyStatusBar backgroundColor="black" barStyle="light-content" /> */}

  <StatusBar barStyle="light-content" backgroundColor="green" />


        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >
          
        

          <View style={{  justifyContent: "center",
    padding: 20,
    margin:10,
    shadowColor: '#969696',backgroundColor: 'white',
    
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,
    borderRadius: 5}}>
      
              <Text style={{fontSize:20}}>What will i learn</Text>
              <Text style={{fontSize:12,color:'#919191',marginTop:5}}>
Designed web pages for commercial applications, maintaining web pages for
companies. Utilized through knowledge of Internet Aplications, web page design and
HTML programming to create and maintain interactive, multi-page web sites.
Demonstrated strong skills in object-oriented programming and the use of abstract data types.
Create databases, modifying existing databases and database management systems or directing programmers and analysts to make changes.
Developing mobile applications with React Native and designing databases.</Text>
          </View>
          <View style={{  justifyContent: "center",
    padding: 20,
    marginBottom:10,
    shadowColor: '#969696',backgroundColor: 'white',
    marginLeft:10,marginRight:10,
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,
    borderRadius: 5}}>
      
              <Text style={{fontSize:20}}>What will i learn</Text>
              <Text style={{fontSize:12,color:'#919191',marginTop:5}}>bir kasaba + bir açıköğretim üniversitesi mezunu olarak oy haklarımdan feragat edip kanada vatandaşlığı almayı planlıyorum. ielts puanım 7.5, yaştan da hala yırtar pozisyondayım, meslek de kabul edilebilir kategoride, onlar da express entry için uygunsunuz diyor zaten, geriye bir tek kanada hükümetinden ya da eyaletlerden birinden davet almak kalıyor. 3 sene kalıcı oturma izni sonrası vatandaşlığı da alınca orada oy kullanırım artık. zira burada kullandıklarımın bi boka yaramamasının ağırlığından kurtulmanın yanı sıra yukardaki gibi kafatası boşluğunda cerahat ihtiva eden insan artıklarından biraz uzaklaşmış olur da huzur bulurum belki.</Text>
          </View>
          <Text style={[stylesNew.headText,{marginLeft:30}]}>Dersler</Text>
          <LessonSection onPress={()=>this.props.navigation.navigate('Video')} ></LessonSection>
          <LessonSection></LessonSection>
          <LessonSection></LessonSection>
          <LessonSection></LessonSection>
          <Button  onPress={()=>this.props.navigation.navigate('SignUpSecond')}> </Button>
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={require('../../../assets/edu-1.jpg')}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ]
            },
          ]}
        >
          <Header backgroundColor="#d67676"
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>
          {/* <Text style={styles.title}>Title</Text> */}
        </Animated.View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#d67676',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    borderWidth:0,

  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: undefined,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28: 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -15,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 25  ,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {

    backgroundColor : 'red'
  },
});