import React, { Component } from "react";
import {
  View,

  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity, SafeAreaView
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import { loginUserService } from "../../../redux/actions/LoginActions";
import {Input,Text} from 'react-native-elements'
import {  Button, FloatingLabelInput } from "../../../components";
import styles from "./styles";
import { AppState } from "../../../redux/store";
import { connect } from "react-redux";
import ProgressCircle from 'react-native-progress-circle'
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}





class UsersPrivacyScreen extends Component<Props, {}> {

  static navigationOptions = {
    title: 'Gizlilik Sözleşmesi',

   
  };


  render() {
   
    return (
     
        <SafeAreaView>
          <ScrollView bounces={true}>

    
            <Text  style={{margin:20,fontSize:16,fontFamily:'Roboto-Regular'}}>
            Gizlilik Politikası ve Kullanım Koşulları
Burada belirtilen gizlilik politikası ve kullanım koşulları; Komut Teknolojisi'nin Google Play Store ve IOS App Store'da yayınlanan bütün mobil uygulamaları için geçerlidir. Bu uygulamaları mobil cihazınıza yükleyerek, bu metinde yer alan gizlilik politikasını ve kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız bu uygulamaları mobil cihazınıza yüklemeyiniz.

Uygulamalarımızda, Girilen Veriler şifreli sunucularda sadece sizlerin görebileceği şekilde depolanır ve 3. şahıs yada kurumlar ile paylaşılmaz.


Telefon Kullanım İzinleri,Uygulamımızdan bulunan kısayol arama işlemi için gerekli olan izinlerin tarafınızdan sağlanmış olması gerekir.Verilen bu izin sadece Uygulamadas kayıtlı olan müşterilerinizin kısayol aramlarında kullanılmaktadır ve müşterilerinize ait kişisel veriler sadece size özel veritabnlarında şifreli olarak saklanır.


İnternet Kullanım İzinleri,Uygulamımızdan Verilerin Şifreli sunuculara gönderilebilmesi için gerekli olan izindir ve kullanıcıların bunu tanımlaması gerekir. bu izinler telefonunuzdan isteğiniz dışında bir bilgiyi transfer etmek için kullanılmaz. Verilen internet erişim izni sadece uygulama içersinde dolduracağınız formlara ait veri ve fotoğraf transferi için kullanılmaktadır.


Kamera Kullanımı: Mobil Uygulamalarımızda kamera kullanımı sadece uygulama içersinden göndermek istediğiniz fotoğraflar için kullanılmaktadır. kullanıcı bilgisi dışında kullanımı söz konusu değildir. Mobil uygulamada çekilen fotoğraflar kullanıcıya ait şifreli ortamda saklanır ve sadece kendisinin ve bağlı olduğu kurumun erişimine açıktır. Fotoğraflar 3. şahıs yada kurumlar ile kullanıcı bilgisi dışında paylaşılmaz.


Uygulamalarımız, size ait herhangi bir kişisel bilgiyi toplamaz ve sizden bu yönde bir talepte bulunmaz.

Komut Teknolojisi, kaliteli ve yararlı uygulamalar yayınlamak için her zaman gereken özeni ve duyarlılığı gösterecektir. Buna rağmen, uygulamalarımızda yer alan içeriklerin beklentilerinizi karşılayacağı, size yararlı olacağı veya kesin doğru bilgiler içereceğine dair hiçbir taahhütte bulunmamaktayız. Uygulamaları olduğu gibi sunmaktayız. Bu sebeple, uygulamalarımızdan kaynaklı yaşanacak herhangi bir olumsuz durum için Komut Teknolojisi'ni sorumlu tutamayacağınızı kabul etmektesiniz. 

Komut Teknolojisi, bu uygulamaların güvenliği konusunda alınabilecek tüm önlemleri almak için gereken ölçüde çaba sarf eder ve Google Play Geliştirici Programı Politikaları sözleşmesi kapsamındaki yükümlülüklerini yerine getirir. Bununla birlikte; internet ve dijital ortamlar yeterli düzeyde güvenli alanlar değildir. Bu yüzden size yüzde yüz güvenli bir hizmet sunacağımız konusunda herhangi bir garantide bulunmamaktayız.
Uygulamalarımız sadece Google Play Store ve IOS App Store'da yer almaktadır. Bu uygulamaların bizim bilgimiz dışında başka bir android yada IOS mağazasında yer alması durumunda, buradan yapılacak yüklemelerden Komut Teknolojisi sorumlu tutulamaz.

Bu uygulamalarda, üçüncü taraflara ait reklamlar ve linkler yer alabilir. Bu üçüncü taraflara ait reklamların ve linklerin niteliğinden, içeriğinden, güvenliğinden veya bunlardan kaynaklı oluşabilecek zararlardan Komut Teknolojisi'ni sorumlu tutamayacağınızı kabul etmektesiniz. Google tarafından yayınlanan reklamlara ilişkin ayarlarınızı nasıl düzenleyeceğinizi, reklam ayarları sayfasından öğrenebilirsiniz.

Bu uygulamalarda yer alan sesli, yazılı ve görsel öğelerden ve yazılımlardan oluşan bütün içeriğe ilişkin her türlü telif hakkı Komut Teknolojisi’ne aittir. Herhangi bir uygulamamızı veya bu uygulamaların telif haklarıyla korunan içeriğini; kopyalama, çoğaltma, yeniden yayımlama, parçalarına ayırma, tekrar kamuya sunma vb. eylemlerde bulunmayacağınızı kabul etmektesiniz.

Burada belirtilen koşullarla ilgili görüş ve önerilerinizi, info@komutteknolojisi.com mail adresinden bize iletebilirsiniz.

Komut Teknolojisi; bu Gizlilik Politikası ve Kullanım Koşulları metninde değişiklik yapabilir. Yapılan değişiklikler anında yürürlüğe girecektir. Değişiklik yaptığımız tarihi, "son güncelleme tarihi" olarak en alt kısımda belirtiriz. 

            </Text>
            </ScrollView>
        </SafeAreaView>
    );
  }
}


export default connect()(UsersPrivacyScreen);
