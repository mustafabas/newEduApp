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





class UsersAgreementScreen extends Component<Props, {}> {

  static navigationOptions = {
    title: 'Kullanıcı Sözleşmesi',

   
  };


  render() {
   
    return (
     
        <SafeAreaView>
          <ScrollView bounces={true}>

    
            <Text style={{margin:20}}>
            Kullanıcı Sözleşmesi

İşbu sözleşme, “Başkana Mobil Uygulaması” ve “www.baskana.com” web sitesi üzerinden ziyaretçilerine/müşterilerine online olarak destek vermek üzere faydalanmak isteyen kurumsal kullanıcıların yerine getirmesi gereken yükümlülükleri ve tarafların karşılıklı hak ve yükümlülüklerini düzenlemektedir. Başkana Uygulaması Yönetim Paneli’ni kullanmak için lütfen aşağıda yazılı koşulları okuyunuz. Bu koşulları kabul etmediğiniz takdirde Başkana Uygulaması Yönetim Paneli’ni kullanmaktan vazgeçiniz.

Bu Sözleşme, Web sitesinin ve Hizmet dâhilindeki üyeliğinizin yasal kullanım koşullarını belirtmektedir ve “Başkana Uygulaması” ve “www.baskana.com” tarafından önceden bildirimde bulunmaksızın üzerinde değişiklikler yapılabilir, bu tür değişiklikler  “Başkana Uygulaması” ve “www.baskana.com” tarafından Web sitesine konulduğu andan itibaren geçerli sayılacaktır. Bu Sözleşme, Baskana.com’un sitede yayınlanan içerik, Baskana.com’un Gizlilik Politikası ve Web sitesi ile ilgili her türlü duyurunun makul kullanım ilkelerini kapsar.

1.Tanımlar

Bu sözleşmede yer alan aşağıdaki tanımlamalar, ibareler ve kısaltmalar karşılarında gösterilen anlamları ifade edecektir.

Başkana Mobil Uygulaması: Kullanıcılarının sorun ve önerilerini ilgili kurumlara ilettiği mobil uygulamayı,

Baskana.com: www.baskana.com alan adı üzerinden yayın yapan web sitesini,

Website : www.baskana.com ve bağlı sayfaları içeren web sitesini,

Üye Kurum: Baskana.com yönetim paneli hizmeti kullanan kurumları

Yönetim Paneli: https://admin.baskana.com sayfası üzerinden üyelerin kullandıkları yönetim panelini

Kullanıcı: Üye kurumların sorumlu oldukları alanlarla alakalı dilek ve şikayetlerini paylaştıkları mobil uygulamayı kullanan bireyleri

Hizmet: “Başkana Uygulaması” ve “www.baskana.com” üyelere faydalanmaları üzere sunduğu ücretsiz ve ücretli hizmetler ve faydaların tümünü

ifade etmektedir.

Üyelik ve Hizmet Kullanımı Şartları
a) Başkana Mobil Uygulamasını kullanabilmek ve öneri/şikayet gönderimi yapabilmek için Baskana.com tarafından işbu sözleşme çerçevesinde geçici olarak üyelikten uzaklaştırılmış veya üyelikten süresiz yasaklanmış olmamak gerekmektedir. Baskana.com tarafından işbu sözleşme uyarınca geçici olarak üyelikten uzaklaştırılmış veya üyelikten süresiz yasaklanmış olan kullanıcılarının mobil uygulama kayıt işlemlerini tamamlamış olmaları mobil uygulama kullanıcısı olduğu sonucunu doğurmayacaktır.

b) Mobil Uygulama Kullanıcılığı , ilk kaydını gerçekleştirmek isteyen ziyaretçi tarafından kimlik bilgilerin verilmesi ve bilgilerin gönderilmesi suretiyle kayıt işleminin kaydedilmesi tamamlanmış olur.

c) Her bir “Üye” kullanacağı şifre ve kullanıcı adı ile sadece bir tek kişi veya kurum için işlem yapma hakkına sahiptir. Diğer kişi veya kurumların siteden yararlanması ayrıca kayıt işleminin yapılması ve başka bir kullanıcı adı ve şifrenin alınması ile gerçekleştirilir. Aynı üyelik ikinci bir kişi veya kurum tarafından kullanılamaz. “Üye” hesabının başka bir “üye” ya da “kullanıcı” tarafından kullanıldığının tespiti halinde, “Baskana.com”un diğer tüm hakları saklı kalmak kaydıyla, kayıtlı üyenin üyeliği askıya alınabilir veya durdurulabilir.

d) “Kurumsal Üye”lerin; “Yönetim Paneli” üzerindeki paylaştıkları, ekledikleri bilgilerinin; sahte, çalıntı olmaması, üçüncü bir tarafın hiçbir tescil hakkı, telif hakkı vb haklarının çiğnememesi ,yasalara aykırı olmaması (tüketiciyi koruma, haksız rekabet yasası, vb. tüm T.C. kanunları ve yönetmeliklerine) ,pornografi veya çıplaklık içermemesi ,hiçbir virüs veya herhangi bir programa zarar verecek bir programlama özelliği içermemesi ve site üyelerine istenmeyen (spam) mailler gönderme amacıyla kullanmama ilkelerini kabul etmiş sayılırlar.

f) “Kurumsal Üye”ler ekledikleri bilgilerin doğruluğundan sorumludur.  “Baskana.com”, “Üye”lerin “Başkana Uygulaması Yönetim Paneli”ne eklediği bilgilerden sorumlu değildir. Kişilik haklarına saldırı, yanıltıcı bilgiler içeren bilgileri “Baskana.com” , “Başkana Uygulaması Yönetim Paneli”nde yayınlamama veya eklenmiş ise kaldırma hakkına sahiptir.

h) “Kurumsal Üye”ler; “Baskana.com”un yazılı onayı olmadan işbu sözleşmeyi veya bu sözleşmenin kapsamındaki hak ve yükümlülüklerini kısmen veya tamamen herhangi bir üçüncü kişiye devredemez.

f) “Baskana.com” iş bu sözleşmede tanımlı olan hizmetleri daha etkili sağlamak için “Hizmet”lerinde değişiklikler ve/veya yenilemeler yapabilir.

3.”Başkana Uygulaması Yönetim Paneli”nin Kullanım Şartları

a) “Baskana Uygulaması “Kurumsal Üyeler” ve “Mobil Uygulama Kullanıcıları” arasında iletişim kurulmasını sağlayan, kullanıcı tarafından öneri / şikayetlerin , kurumsal üyeler tarafından kullanıcılara destek verildiği çözüm takip uygulamasıdır. ,”Baskana.com”un başka bir sıfatla sorumluluğu bulunmamaktadır. “Baskana.com” “Başkana Uygulaması Yönetim Paneli”nde; “Mobil Uygulama Kullanıcıları”, “Üye Kurumlar”i ile iletişime geçmeyi ve bilgi alışverişi ve iletişim bilgilerini paylaştıkları ortam sunmaktadır.” Baskana.com”un işlettiği “Başkana Uygulaması” üzerinden yapılan işlemlerde taraf sıfatı bulunmadığından yapılan işlemlerden doğan hak ve yükümlülüklere ilişkin herhangi bir bağlılığı olmayacaktır.

b) “Kurumsal Üye”ler hizmet kullanım şartları ve “Başkana Uygulaması Yönetim Paneli”nin kullanım şartları içerisinde yer alan iş bu sözleşme içerisinde yer alan tüm şartlara, kurallara ve mevzuata uygun hareket edeceğini tüm şartları ve kuralları anladığını ve onayladığını kabul eder.

c) “Başkana Uygulaması Yönetim Paneli”nde sunulan “Hizmet”ler, “Kurumsal Üye”ler tarafından yalnızca hukuka uygun amaçlar doğrultusunda site üzerinde kullanılabilir.”Kurumsal Üye”ler site dahilinde yaptığı her işlem ve eylemdeki hukuki ve cezai sorumluluk kendilerine ait olduğunu kabul etmektedir.

“Baskana.com” ;”Kurumsal Üyeler” ve “Mobil Uygulama Kullanıcıları”nın, Mobil Uygulama üzerinde bulunan iletişim ortamından birbirlerine gönderdikleri mesajların içeriğinden sorumlu değildir. ve “Uygulama Kullanıcıları” ve “Kurumsal Üye”lerin işbu sözleşme hükümlerine ve hukuka aykırı olarak gerçekleştirdikleri site üzerindeki faaliyetler nedeniyle üçüncü kişilerin uğradıkları veya uğrayabilecekleri zararlardan dolayı “Baskana.com” doğrudan ve/veya dolaylı olarak hiçbir şekilde sorumlu tutulamaz.

d) “Kurumsal Üye”lerin, “Baskana.com tarafından işletilen “Başkana Uygulaması Yönetim Paneli”nde sunulan “Hizmetler”den yararlanabilmek amacıyla kullandıkları sisteme erişimi sağlayan verilerinin (kullanıcı ismi, şifre v.b) güvenliği, saklanması, üçüncü kişilerin bilgisinden uzak tutulması, kullanılması durumlarıyla ilgili hususlar tamamen “Kurumsal Üye”lerin sorumluluğundadır. “Kurumsal Üye”lerin, bu yöndeki eksik özen ve kusur neticesinde meydana gelmiş kendilerinin ve/veya üçüncü kişilerin uğradığı veya uğrayabileceği zararlardan “Baskana.com”un doğrudan veya dolaylı herhangi bir sorumluluğu yoktur.

e) “Kurumsal Üye”ler tarafından eklenen kişi bilgileri, firma bilgileri, fotoğraflarının ve bilgilerinin doğruluğu hukuka uygunluğu bilgileri ekleyen “Kurumsal Üye”lerin sorumluluğundadır. “Baskana.com” “Kurumsal Üye”lerin eklediği firma, hizmet resimlerinin ve bilgilerinin doğruluğunu hukuka uygunluğunu taahhüt ve garanti etmemektedir.

f) “Uygulama Kullanıcıları” tarafından eklenen kişi bilgileri, fotoğraflarının ve bilgilerinin doğruluğu hukuka uygunluğu bilgileri ekleyen “Uygulama Kullanıcıları”nın sorumluluğundadır. “Baskana.com” “Uygulama Kullanıcıları”lerin eklediği kişisel bilgiler, fotoğraflar doğruluğunu hukuka uygunluğunu taahhüt ve garanti etmemektedir.

g) “Kurumsal Üye”ler , “Baskana.com” tarafından işletilen “Başkana Uygulaması Yönetim Paneli” nin ve bu site üzerinden yapılan ticari işlemlerinin, “Hizmetler”in işleyişini herhangi bir yazılım, alet vb. yoluyla bozma girişiminde bulunmamakla; site üzerinde hiç bir bilgiyi robot, örümcek (spider) gibi otomatik veya manuel bir yöntemle kopyalayarak sistemi istismar etmemekle yükümlüdür.

h) “Kurumsal Üye”, yasaklı ürünlerden herhangi bir ürünü/malı/hizmeti ilan olarak arzedemeyeceği ve “Başkana Uygulaması Yönetim Paneli” aracılığı ile elde ettiği bilgileri kullanmak suretiyle herhangi bir kanuna, ahlaka ve/veya kamu düzenine aykırı amaçla tanıtım, postalama ve benzeri faaliyette de bulunamaz. Aynı şekilde gayrı ciddi, içinde hakaret, müstehcenlik öğeleri barındıran, toplumun ahlak anlayışına ters düşen mesajlar da gönderemez. Bu tür girişimler ve eylemler “Baskana.com” tarafından tespit olunduğu takdirde söz konusu işlemi durdurma hakkı ve üyelikten ihraç hakkı mevcuttur. Bu gibi durumlarda doğabilecek her türlü sorumluluk “Kurumsal Üye”ye aittir, herhangi bir sebeple “Baskana.com”un bu tür eylemler neticesinde uğrayabileceği her tür doğrudan ve/veya dolaylı, maddi ve/veya manevi zararın tazminini talep hakları saklıdır.

i) Sözleşmeye aykırılık hallerinde “Baskana.com”un maddi-manevi zararının tazminini talep hakkı saklıdır. İşbu sözleşme “Başkana Mobil Uygulaması” ve “www.baskana.com” web sitesinin herhangi bir sebeple yayınının durması/durdurulması halinde durma süresince askıda addolunur. Sözleşme, “Başkana Uygulaması Yönetim Paneli”nde yapılan faaliyetin “Baskana.com” tarafından sona erdirilmesi halinde ise kendiliğinden sona erer. “Baskana.com” işini, ticari ortaklığını ve Sözleşme “www.baskana.com” web sitesi alan adını da değiştirmeye, aynı faaliyeti başka bir alan adı üzerinden yürütmeye yetkili olup bu değişikliklerin işbu sözleşmeye herhangi bir etkisi olmayacaktır.

j) “Kurumsal Üye”; “Baskana.com”un,yürürlükteki emredici mevzuat hükümleri gereğince resmi makamlara açıklama yapmakla yükümlü olduğu durumlar içerisinde, resmi makamlarca usulü dairesinde “Kurumsal Üye”lerın bilgilerinin talep edilmesi halinde kullanıcılara ait gizli/özel/ticari bilgileri resmi makamlara açıklamaya yetkili olacağını ve bu sebeple kendisinden her ne nam altında olursa olsun “Baskana.com”dan tazminat talep edilemeyeceğini kabul eder.

Baskana.com un Hak ve Yükümlülükleri
a) “Baskana.com”,”Başkana Uygulaması Yönetim Paneli”de yayınlanan bilgileri kaldırma ve değiştirme hakkına her zaman sahiptir. Mobil Uygulama, yönetim paneli ve sitenin tasarımına, içeriğine “Baskana.com” karar verir. “Kurumsal Üye”lerin ve “Başkana Mobil Uygulaması Kullanıcıları”nın uygulama ve yönetim panelindeki bilgilerin doğruluğundan “Baskana.com” sorumlu değildir.

b) “Baskana.com”, işlettiği “Başkana Mobil Uygulaması” ve “Başkana Mobil Uygulaması Yönetim Paneli” ile “Kurumsal Üye” ve “Kurumsal Üye”lerin mobil uygulama üzerindeki “Kullanıcı” ları buluşturan bir sanal ortam sunmaktadır. “Kurumsal Üye” ve “Mobil Uygulama Kullanıcıları” arasında meydana gelecek anlaşmazlıklarda ” Baskana.com” arabulucu olmaz ve sorumlu değildir.

c) “Baskana.com” Ücretsiz hizmetleri ücretli hale, ücretli hizmetleri de ücretsiz hale getirme , Hizmetlerin ve kapsamlarının bir kısmının veya tamamının geçici veya devamlı olarak kaldırılması hakkına sahiptir. “Kurumsal Üye” ler bu hakları kabul etmiş sayılırlar.

d) “Baskana.com”, dilediği zaman “Kurumsal Üye”lerin üyeliğini sebep göstererek ve ihbarda bulunarak geçiçi veya sürekli olarak yasaklayabilir, belirlenecek sair sınırlamalara tâbi tutabilir, işbu sözleşmeyi tek taraflı olarak feshedebilir.

e) “Baskana.com” ;”Başkana Mobil Uygulaması” ve “Mobil Uygulama Yönetim Paneli” yazılımının her türlü hatadan arınmış olduğunu ve sitede herhangi bir virüs yer alıp almadığı konusunda herhangi bir sorumluluk yüklenmemektedir. Eğer bu sitede yer alan bir herhangi yazılım sebebi ile kullanıcının yazılım ve donanım unsurlarına herhangi bir zarar gelirse “Baskana.com” bu konuda bir sorumluluk yüklenmez.

f) “Baskana.com”, “Başkana Uygulaması Yönetim Paneli”nde yer alan “Kurumsal Üye”lerin bilgilerini veya üyeliğe ilişkin “Kurumsal Üye kullanıcı” bilgilerini, ” Mobil Uygulama Kullanıcı Bilgileri”ni güvenliği, kendi yükümlülüğünü ifa ve bazı istatistikî değerlendirmeler için dilediği biçimde kullanabilir. Bunları bir veritabanı üzerinde tasnif edip muhafaza edebilir.

g) ” Baskana.com “, “Başkana Uygulaması Yönetim Paneli”nde sunulan “Hizmet”leri ve içerikleri her zaman değiştirebilme; “Kurumsal Üye”lerın sisteme yükledikleri bilgileri ve içerikleri “Kurumsal Üye”ler da dahil olmak üzere üçüncü kişilerin erişimine kapatabilme ve silme hakkını saklı tutmaktadır. ” Baskana.com “, bu hakkını hiçbir bildirimde bulunmadan ve önel vermeden kullanabilir. “Kurumsal Üye”ler sistem dahilinde kayıtlı bilgilerinin değiştirilmesi veya düzeltilmesi gerekliliği hasıl olduğunda “Baskana.com” bu hususlarda bilgilendirirler. İlgili bilgilendirme ve bildirim üzerine “Baskana.com”sistem içinde gerekli değişiklikleri yapar. Kurumsal Üye’lerin vermiş olduğu bilgilerde meydana gelen değişiklikleri bildirmemesinden kaynaklanan her türlü zarardan dolayı sorumluluk ” Kurumsal Üye”ye ait olacaktır.”Baskana.com”un bu hususlarda herhangi bir sorumluluğu bulunmamaktadır.

6.Diğer Hükümler

6.1 Fikri Mülkiyet Hakları

a) “Web sitesi”nde yer alan tasarımlar, metinler, görsel çalışmalar html kodları “Baskana.com”tarafından oluşturulmuştur. İzinsiz kullanılamaz. İzinsiz kullanıldığı tespit edildiği takdirde “Baskana.com” zararın karşılanması için hukuki yoldan girişimlerde bulunma hakkını kullanır.

b)”www.baskana.com” (tasarım, metin, image, html kodu ve diğer kodlar da dahil ve fakat bunlarla sınırlı olmamak kaydıyla) tüm elemanları (Baskana.com’un telif haklarına tabi çalışmalar) “Baskana.com”a ait ve/veya “Baskana.com” tarafından üçüncü bir kişiden alınan lisans hakkı altında kullanılmaktadır.”Kullanıcılar”; “Baskana.com” hizmetlerini, “Baskana.com” bilgilerini ve “Baskana.com”un telif haklarına tabi çalışmalarını yeniden satamaz, paylaşamaz, dağıtamaz, sergileyemez veya başkasının “Baskana.com”un hizmetlerine erişmesine veya kullanmasına izin veremez, aksi takdirde lisans verenler de dahil üçüncü kişilerin uğradıkları zararlardan dolayı “Baskana.com”dan talep edilen tazminat miktarını, mahkeme masrafları ve avukatlık ücreti de dahil olmak üzere karşılamakla yükümlü olacaklardır.Kullanıcılar “Baskana.com” un telif haklarına tabi çalışmalarını çoğaltamaz, dağıtamaz veya bunlardan türemiş çalışmalar yapamaz veya hazırlayamaz.

c) “Baskana.com”un; ” Baskana.com hizmetleri, ” Baskana.com ” bilgileri, ” Baskana.com ” telif haklarına tabi çalışmaları, ” Baskana.com ” ticari markaları, ” Baskana.com ” ticari görünümü veya ” www.baskana.com web sitesi” vasıtasıyla sahip olduğu her tür maddi ve fikri mülkiyet hakları da dahil tüm malvarlığı, ayni ve şahsi hak, ticari bilgi, lisans ve know-how a yönelik tüm hakları saklıdır.

6.2.Gizlilik Politikası

“Baskana.com”, “Başkana Uygulaması Yönetim Paneli”nde “Kurumsal Üye”ler ile ilgili bilgileri işbu sözleşmenin EK-1 bölümünde yer alan ve sözleşmenin ayrılmaz bir parçası olan Gizlilik Politikası kapsamında kullanabilir. “Baskana.com” ” Kullanıcı”lara ait gizli bilgileri işbu sözleşmenin 3.i maddesinde belirtilen durumlar haricinde üçüncü kişi ve kurumlara kullandırılmaz.

6.3.Sözleşme Değişiklikleri

“Baskana.com” tamamen kendi takdirine bağlı ve tek taraflı olarak işbu sözleşmeyi uygun göreceği herhangi bir zamanda “Web site”de ilan ederek değiştirebilir. İşbu sözleşmenin değişen hükümleri, ilan edildikleri tarihte geçerlilik kazanacak, geri kalan hükümler aynen yürürlükte kalarak hüküm ve sonuçlarını doğurmaya devam edecektir. İşbu sözleşme, “Üye”nin tek taraflı beyanları ile değiştirilemez.

6.4.Mücbir Sebepler

Hukuken mücbir sebepler sayılan doğal afet, savaş, grev, internet altyapı arızaları, elektrik kesintisi ve kötü hava koşulları da dahi bunlarla sınırlı olmamak kaydıyla ilgili tarafın makul kontrolü haricinde ve “Baskana.com”un gerekli özeni göstermesine rağmen önleyemediği,kaçınılamayacak olaylar ve buna benzer şartlarda “Baskana.com” tarafından yürütülen Ücretli ve ücretsiz ”Başkana Mobil Uygulaması” ve  “Başkana Uygulaması Yönetim Paneli” “Hizmetler”ini istediği düzeyde yapmasına engel olacak koşullarda “Baskana.com” “Hizmet”ini yerine getirememe ve/veya hizmetini eksik yerine getirme sebebiyle yükümlü değildir.

6.5.Sözleşmenin Feshi

İşbu sözleşme “Kurumsal Üye”nin “Başkana Uygulaması Yönetim Paneli”ne üye olduğu sürece yürürlükte kalacak ve taraflar arası hüküm ve sonuçlarını doğurmaya devam edecektir.” “Kurumsal Üye”lerin üyelik süresinin dolması geçici veya kalıcı olarak üyeliğinin durdurulması hallerinde sona erer.

“Baskana.com”, “Kurumsal Üye”lerin işbu sözleşme, ekleri, site içinde yer alan kullanıma, üyeliğe ve “Hizmet”lere ilişkin benzeri kuralları ihlal etmeleri durumunda ve özellikle aşağıda sayılan hallerde sözleşmeyi tek taraflı olarak feshedebilecek ve “Üye”ler fesih sebebiyle “Baskana.com”un uğradığı tüm zararları tazmin etmekle yükümlü olacaktır:

a) “Kurumsal Üye”lerin, herhangi bir yöntem kullanarak sitenin işleyişini manipüle edecek davranışlarda bulunması

b) “Kurumsal Üye”lerin kendisi için oluşturulmuş kullanıcı profilini başkasına devretmesi veya kullanıma açması

c) “Kurumsal Üye”lerin üçüncü kişilerin haklarına tecavüz eden ve/veya etme tehlikesi bulunan fillerde bulunması

d) “Kurumsal Üye”lerın “Web site”ye virüs bulaştırmak suretiyle “Başkana Uygulaması Yönetim Paneli”ni çalışmaz hale getirmeleri veya buna teşebbüs etmeleri.

7.Uygulanacak Hukuk ve Yetki

İşbu sözleşmenin uygulanmasında, yorumlanmasında ve bu sözleşme dahilinde doğan hukuki ilişkilerin yönetiminde Türk Hukuku uygulanacaktır. İşbu sözleşmeden dolayı doğan veya doğabilecek her türlü ihtilafın hallinde Malatya Mahkemeleri ve İcra Daireleri yetkilidir.
            </Text>
            </ScrollView>
        </SafeAreaView>
    );
  }
}


export default connect()(UsersAgreementScreen);
