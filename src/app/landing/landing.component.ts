import { environment } from './../../environments/environment';
import { LandingService } from './../services/landing.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SHA1 } from '../utilities/hash.js';
import { ClipboardService } from 'ngx-clipboard';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as htmltoimage from 'html-to-image'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})


export class LandingComponent implements OnInit {

  allBranchList = [];

  openAccountResult: any;

  clientId = '5f7f011a47f0d5f7f011a47f125f7f';
  clientSecrete = 'TsaZuyUjIrxJgbrAkuV4B9weLTQXgA';

  bvnDetails: any;
  bvnCheck: any;
  stateBranchDetails = [];

  imageUrl = '';
  signatureUrl = '';

  isSpinning = false;
  isLoadingOne = false;
  sectionShow = true;
  sectionShow1 = false;
  sectionShow2 = false;
  showImage1 = false;
  showImage2 = false;
  showUploadDocument = true;
  uploadBtn = true;
  verifiedButton = true;
  verifiedButton2 = false;
  verifiedButton3 = false;
  submitFormButton = true;
  submitFormButton2 = false;

  requestCardShow = '';
  selectDeliveryTypeShow = '';

  bvnForm: FormGroup;
  addForm: FormGroup;
  multipleUploadForm: FormGroup;

  passwordVisible = false;
  password?: number;
  getBvnField: any;

  // form binding
  formFirstName: any;
  formLastName: any;
  formMiddleName: any;
  formDob: any;
  formPhoneNumber: any;
  accountNumberdetail: any;
  formBinding = {
    gender: '',
    uniqueKey: 'E6A9C647-B9E1-446A-A7F6-C33EDFEBFDB1',
    profileAlert: 'YES',
    appId: 'website',
    addressNo: ''
  };

  // Binding State
  stateArray = [
      {value: "23", name: "Abia"},
      {value: "04", name: "Adamawa"},
      {value: "01", name: "Akwa Ibom"},
      {value: "02", name: "Anambra"},
      {value: "03", name: "Bauchi"},
      {value: "32", name: "Bayelsa"},
      {value: "05", name: "Benue"},
      {value: "06", name: "Borno"},
      {value: "07", name: "Cross River"},
      {value: "09", name: "Delta"},
      {value: "33", name: "Ebonyi"},
      {value: "24", name: "Edo"},
      {value: "34", name: "Ekiti"},
      {value: "25", name: "Enugu"},
      {value: "08", name: "FCT"},
      {value: "35", name: "Gombe"},
      {value: "10", name: "Imo"},
      {value: "26", name: "Jigawa"},
      {value: "11", name: "Kaduna"},
      {value: "12", name: "Kano"},
      {value: "13", name: "Katsina"},
      {value: "27", name: "Kebbi"},
      {value: "28", name: "Kogi"},
      {value: "14", name: "Kwara"},
      {value: "15", name: "Lagos"},
      {value: "36", name: "Nasarawa"},
      {value: "16", name: "Niger"},
      {value: "17", name: "Ogun"},
      {value: "18", name: "Ondo"},
      {value: "29", name: "Osun"},
      {value: "19", name: "Oyo"},
      {value: "20", name: "Plateau"},
      {value: "21", name: "Rivers"},
      {value: "22", name: "Sokoto"},
      {value: "30", name: "Taraba"},
      {value: "31", name: "Yobe"},
      {value: "37", name: "Zamfara"}
  ];
  selectedValueState = null;
  stateArray2 = [
    {value: "23", name: "Abia"},
    {value: "04", name: "Adamawa"},
    {value: "01", name: "Akwa Ibom"},
    {value: "02", name: "Anambra"},
    {value: "03", name: "Bauchi"},
    {value: "32", name: "Bayelsa"},
    {value: "05", name: "Benue"},
    {value: "06", name: "Borno"},
    {value: "07", name: "Cross River"},
    {value: "09", name: "Delta"},
    {value: "33", name: "Ebonyi"},
    {value: "24", name: "Edo"},
    {value: "34", name: "Ekiti"},
    {value: "25", name: "Enugu"},
    {value: "08", name: "FCT"},
    {value: "35", name: "Gombe"},
    {value: "10", name: "Imo"},
    {value: "26", name: "Jigawa"},
    {value: "11", name: "Kaduna"},
    {value: "12", name: "Kano"},
    {value: "13", name: "Katsina"},
    {value: "27", name: "Kebbi"},
    {value: "28", name: "Kogi"},
    {value: "14", name: "Kwara"},
    {value: "15", name: "Lagos"},
    {value: "36", name: "Nasarawa"},
    {value: "16", name: "Niger"},
    {value: "17", name: "Ogun"},
    {value: "18", name: "Ondo"},
    {value: "29", name: "Osun"},
    {value: "19", name: "Oyo"},
    {value: "20", name: "Plateau"},
    {value: "21", name: "Rivers"},
    {value: "22", name: "Sokoto"},
    {value: "30", name: "Taraba"},
    {value: "31", name: "Yobe"},
    {value: "37", name: "Zamfara"}
  ];
  selectedValueState2 = null;

  cityArray = [
    {
      value: "0001",
      name: "ABA"
    },
    {
      value: "0002",
      name: "ABADAN"
    },
    {
      value: "0003",
      name: "ABAGANA"
    },
    {
      value: "0004",
      name: "ABAJI"
    },
    {
      value: "0005",
      name: "ABAK"
    },
    {
      value: "0006",
      name: "ABAKALIKI"
    },
    {
      value: "0007",
      name: "ABEOKUTA"
    },
    {
      value: "0008",
      name: "ABI"
    },
    {
      value: "0009",
      name: "ABIRIBA"
    },
    {
      value: "0010",
      name: "ABOHMABAISE"
    },
    {
      value: "0011",
      name: "ABRAKA"
    },
    {
      value: "0012",
      name: "ABUA/ODIAL"
    },
    {
      value: "0013",
      name: "ABUJA"
    },
    {
      value: "0014",
      name: "ABULOMA"
    },
    {
      value: "0015",
      name: "ADAMAWA"
    },
    {
      value: "0016",
      name: "ADAVI"
    },
    {
      value: "0017",
      name: "ADO-EKITI"
    },
    {
      value: "0018",
      name: "ADO-ODO/OTA"
    },
    {
      value: "0019",
      name: "ADOR"
    },
    {
      value: "0020",
      name: "AFIJIO"
    },
    {
      value: "0021",
      name: "AFIKPO"
    },
    {
      value: "0022",
      name: "AGAIE"
    },
    {
      value: "0023",
      name: "AGAJE"
    },
    {
      value: "0024",
      name: "AGASKI"
    },
    {
      value: "0025",
      name: "AGATU"
    },
    {
      value: "0026",
      name: "AGBARA"
    },
    {
      value: "0027",
      name: "AGBARHO"
    },
    {
      value: "0028",
      name: "AGBOR"
    },
    {
      value: "0029",
      name: "AGEGE"
    },
    {
      value: "0030",
      name: "AGENEBODE"
    },
    {
      value: "0031",
      name: "AGO IWOYE"
    },
    {
      value: "0032",
      name: "AGUATA"
    },
    {
      value: "0033",
      name: "AGWARA"
    },
    {
      value: "0034",
      name: "AHIARA MBAISE"
    },
    {
      value: "0035",
      name: "AHIAZUMBAISE"
    },
    {
      value: "0036",
      name: "AHOADA"
    },
    {
      value: "0037",
      name: "AIJUMU"
    },
    {
      value: "0038",
      name: "AIYEDADE"
    },
    {
      value: "0039",
      name: "AIYEDUN-EKITI"
    },
    {
      value: "0040",
      name: "AIYEKIRE"
    },
    {
      value: "0041",
      name: "AIYEPE"
    },
    {
      value: "0042",
      name: "AIYETORO"
    },
    {
      value: "0043",
      name: "AJAH"
    },
    {
      value: "0044",
      name: "AJAOKUTA"
    },
    {
      value: "0045",
      name: "AJEROMI/IFELODUN"
    },
    {
      value: "0046",
      name: "AJILETE"
    },
    {
      value: "0047",
      name: "AJINGI"
    },
    {
      value: "0048",
      name: "AKAMKPA"
    },
    {
      value: "0049",
      name: "AKINYELE"
    },
    {
      value: "0050",
      name: "AKKO"
    },
    {
      value: "0051",
      name: "AKOKO"
    },
    {
      value: "0052",
      name: "AKOKO-EDO"
    },
    {
      value: "0053",
      name: "AKPABUYO"
    },
    {
      value: "0054",
      name: "AKUKUTORU"
    },
    {
      value: "0055",
      name: "AKURE"
    },
    {
      value: "0056",
      name: "AKUTE"
    },
    {
      value: "0057",
      name: "AKWANGA"
    },
    {
      value: "0058",
      name: "ALADJA"
    },
    {
      value: "0059",
      name: "ALAGBADO"
    },
    {
      value: "0060",
      name: "ALBASU"
    },
    {
      value: "0061",
      name: "ALEIRO"
    },
    {
      value: "0062",
      name: "ALIERO"
    },
    {
      value: "0063",
      name: "ALIMOSHO"
    },
    {
      value: "0064",
      name: "ALKALERI"
    },
    {
      value: "0065",
      name: "AMAOKWE"
    },
    {
      value: "0066",
      name: "AMSTERDAM"
    },
    {
      value: "0067",
      name: "AMUWO ODOFIN"
    },
    {
      value: "0068",
      name: "ANAOCHA"
    },
    {
      value: "0069",
      name: "ANDONI/OPOBO"
    },
    {
      value: "0070",
      name: "ANINRI"
    },
    {
      value: "0071",
      name: "ANIOCHA"
    },
    {
      value: "0072",
      name: "ANKA"
    },
    {
      value: "0073",
      name: "ANKPA"
    },
    {
      value: "0074",
      name: "ANYIGBA"
    },
    {
      value: "0075",
      name: "APA"
    },
    {
      value: "0076",
      name: "APAPA"
    },
    {
      value: "0077",
      name: "ARAMOKO"
    },
    {
      value: "0078",
      name: "ARDO KOLA"
    },
    {
      value: "0079",
      name: "AREWA DANDI"
    },
    {
      value: "0080",
      name: "ARGUNGU"
    },
    {
      value: "0081",
      name: "AROCHUKWU"
    },
    {
      value: "0082",
      name: "ASA"
    },
    {
      value: "0083",
      name: "ASABA"
    },
    {
      value: "0084",
      name: "ASARI TORU"
    },
    {
      value: "0085",
      name: "ASHAKA"
    },
    {
      value: "0086",
      name: "ASKIRA"
    },
    {
      value: "0087",
      name: "ATAKUMOSA"
    },
    {
      value: "0088",
      name: "ATIBA"
    },
    {
      value: "0089",
      name: "ATIGBO"
    },
    {
      value: "0090",
      name: "ATLANTA"
    },
    {
      value: "0091",
      name: "AUCHI"
    },
    {
      value: "0092",
      name: "AUCHI, EDO BRANCH"
    },
    {
      value: "0093",
      name: "AUGIE"
    },
    {
      value: "0094",
      name: "AUYO"
    },
    {
      value: "0095",
      name: "AWE"
    },
    {
      value: "0096",
      name: "AWKA"
    },
    {
      value: "0097",
      name: "AYAMELUM"
    },
    {
      value: "0098",
      name: "AYANGBA"
    },
    {
      value: "0099",
      name: "AYEDAADE"
    },
    {
      value: "0100",
      name: "AYEDIRE"
    },
    {
      value: "0101",
      name: "AZARE"
    },
    {
      value: "0102",
      name: "BABURA"
    },
    {
      value: "0103",
      name: "BACITA"
    },
    {
      value: "0104",
      name: "BADAGRY"
    },
    {
      value: "0105",
      name: "BADE"
    },
    {
      value: "0106",
      name: "BAGUDO"
    },
    {
      value: "0107",
      name: "BAGWAI"
    },
    {
      value: "0108",
      name: "BAKASSI"
    },
    {
      value: "0109",
      name: "BAKORI"
    },
    {
      value: "0110",
      name: "BAKURA"
    },
    {
      value: "0111",
      name: "BALANGA"
    },
    {
      value: "0112",
      name: "BALI"
    },
    {
      value: "0113",
      name: "BAMA"
    },
    {
      value: "0114",
      name: "BANGALORE"
    },
    {
      value: "0115",
      name: "BANGKOK"
    },
    {
      value: "0116",
      name: "BARAKIN/LADI"
    },
    {
      value: "0117",
      name: "BARCELONA"
    },
    {
      value: "0118",
      name: "BARUTEN"
    },
    {
      value: "0119",
      name: "BASSA"
    },
    {
      value: "0120",
      name: "BATAGARAWA"
    },
    {
      value: "0121",
      name: "BATSARI"
    },
    {
      value: "0122",
      name: "BAUCHI"
    },
    {
      value: "0123",
      name: "BAURE"
    },
    {
      value: "0124",
      name: "BAYO"
    },
    {
      value: "0125",
      name: "BEBEJI"
    },
    {
      value: "0126",
      name: "BEIJING"
    },
    {
      value: "0127",
      name: "BEKWARA"
    },
    {
      value: "0128",
      name: "BENDE"
    },
    {
      value: "0129",
      name: "BENIN CITY"
    },
    {
      value: "0130",
      name: "BERLIN"
    },
    {
      value: "0131",
      name: "BIASE"
    },
    {
      value: "0132",
      name: "BICHI"
    },
    {
      value: "0133",
      name: "BIDA"
    },
    {
      value: "0134",
      name: "BILLIRI"
    },
    {
      value: "0135",
      name: "BINDAWA"
    },
    {
      value: "0136",
      name: "BININ GWARI"
    },
    {
      value: "0137",
      name: "BINJI"
    },
    {
      value: "0138",
      name: "BINNIWA"
    },
    {
      value: "0139",
      name: "BIRINIWA"
    },
    {
      value: "0140",
      name: "BIRNI KUDU"
    },
    {
      value: "0141",
      name: "BIRNI MAGAJI"
    },
    {
      value: "0142",
      name: "BIRNI-GWARI"
    },
    {
      value: "0143",
      name: "BIRNIN KEBBI"
    },
    {
      value: "0144",
      name: "BIRNIN KUDU"
    },
    {
      value: "0145",
      name: "BIU"
    },
    {
      value: "0146",
      name: "BODINGA"
    },
    {
      value: "0147",
      name: "BOGORO"
    },
    {
      value: "0148",
      name: "BOKI"
    },
    {
      value: "0149",
      name: "BOKKOS"
    },
    {
      value: "0150",
      name: "BOLUWADURO"
    },
    {
      value: "0151",
      name: "BOMADI"
    },
    {
      value: "0152",
      name: "BONNY"
    },
    {
      value: "0153",
      name: "BORGU"
    },
    {
      value: "0154",
      name: "BORI"
    },
    {
      value: "0155",
      name: "BORIPE"
    },
    {
      value: "0156",
      name: "BORNO"
    },
    {
      value: "0157",
      name: "BORSARI"
    },
    {
      value: "0158",
      name: "BOSSO"
    },
    {
      value: "0159",
      name: "BOSTON"
    },
    {
      value: "0160",
      name: "BOSUWA"
    },
    {
      value: "0161",
      name: "BRASS"
    },
    {
      value: "0162",
      name: "BRUSSELS"
    },
    {
      value: "0163",
      name: "BUDAPEST"
    },
    {
      value: "0164",
      name: "BUJI"
    },
    {
      value: "0165",
      name: "BUKKUYUM"
    },
    {
      value: "0166",
      name: "BUNGUDU"
    },
    {
      value: "0167",
      name: "BUNKURE"
    },
    {
      value: "0168",
      name: "BUNZA"
    },
    {
      value: "0169",
      name: "BURSARI"
    },
    {
      value: "0170",
      name: "BURUKU"
    },
    {
      value: "0171",
      name: "BURUTU"
    },
    {
      value: "0172",
      name: "BWARI"
    },
    {
      value: "0173",
      name: "CALABAR"
    },
    {
      value: "0174",
      name: "CHANCHAGA"
    },
    {
      value: "0175",
      name: "CHIBOK"
    },
    {
      value: "0176",
      name: "CHICAGO"
    },
    {
      value: "0177",
      name: "CHIKUN"
    },
    {
      value: "0178",
      name: "CHRANCHI"
    },
    {
      value: "0179",
      name: "CHUKUN"
    },
    {
      value: "0180",
      name: "COPENHAGEN"
    },
    {
      value: "0181",
      name: "DADIN KOWA"
    },
    {
      value: "0182",
      name: "DALA"
    },
    {
      value: "0183",
      name: "DAMATURU"
    },
    {
      value: "0184",
      name: "DAMBAN"
    },
    {
      value: "0185",
      name: "DAMBARTA"
    },
    {
      value: "0186",
      name: "DAMBOA"
    },
    {
      value: "0187",
      name: "DAN MUSA"
    },
    {
      value: "0188",
      name: "DANDI"
    },
    {
      value: "0189",
      name: "DANDUME"
    },
    {
      value: "0190",
      name: "DANGE"
    },
    {
      value: "0191",
      name: "DANJA"
    },
    {
      value: "0192",
      name: "DANMUSA"
    },
    {
      value: "0193",
      name: "DANUME"
    },
    {
      value: "0194",
      name: "DARAZO"
    },
    {
      value: "0195",
      name: "DAURA"
    },
    {
      value: "0196",
      name: "DAWAKIN KUDU"
    },
    {
      value: "0197",
      name: "DAWAKIN TOFA"
    },
    {
      value: "0198",
      name: "DEGEMA"
    },
    {
      value: "0199",
      name: "DEKINA"
    },
    {
      value: "0200",
      name: "DEMSA"
    },
    {
      value: "0201",
      name: "DIKWA"
    },
    {
      value: "0202",
      name: "DOGUWA"
    },
    {
      value: "0203",
      name: "DOKA/KAWO"
    },
    {
      value: "0204",
      name: "DOMA"
    },
    {
      value: "0205",
      name: "DONGA"
    },
    {
      value: "0206",
      name: "DUBAI"
    },
    {
      value: "0207",
      name: "DUBLIN"
    },
    {
      value: "0208",
      name: "DUJJU"
    },
    {
      value: "0209",
      name: "DUKKU"
    },
    {
      value: "0210",
      name: "DUNUKOFIA"
    },
    {
      value: "0211",
      name: "DUSTINMA"
    },
    {
      value: "0212",
      name: "DUTSE"
    },
    {
      value: "0213",
      name: "DUTSIN-MA"
    },
    {
      value: "0214",
      name: "EDATI"
    },
    {
      value: "0215",
      name: "EDE"
    },
    {
      value: "0216",
      name: "EDU"
    },
    {
      value: "0217",
      name: "EDUN-ABON"
    },
    {
      value: "0218",
      name: "EFON"
    },
    {
      value: "0219",
      name: "EGBADO"
    },
    {
      value: "0220",
      name: "EGBEDA"
    },
    {
      value: "0221",
      name: "EGBEDORE"
    },
    {
      value: "0222",
      name: "EGOR"
    },
    {
      value: "0223",
      name: "EHIMEMBANO"
    },
    {
      value: "0224",
      name: "EJIGBO"
    },
    {
      value: "0225",
      name: "EKEREMOR"
    },
    {
      value: "0226",
      name: "EKET"
    },
    {
      value: "0227",
      name: "EKPAN"
    },
    {
      value: "0228",
      name: "EKPOMA"
    },
    {
      value: "0229",
      name: "EKWULOBIA"
    },
    {
      value: "0230",
      name: "EKWUSIGO"
    },
    {
      value: "0231",
      name: "ELEGUSHI"
    },
    {
      value: "0232",
      name: "ELEME"
    },
    {
      value: "0233",
      name: "EMOHUA"
    },
    {
      value: "0234",
      name: "EMURE"
    },
    {
      value: "0235",
      name: "ENUGU"
    },
    {
      value: "0236",
      name: "EPE"
    },
    {
      value: "0237",
      name: "EPEATANI"
    },
    {
      value: "0238",
      name: "ERIN-ILE"
    },
    {
      value: "0239",
      name: "ESA OKE"
    },
    {
      value: "0240",
      name: "ESAN"
    },
    {
      value: "0241",
      name: "ESIT EKET"
    },
    {
      value: "0242",
      name: "ESSIENUDIM"
    },
    {
      value: "0243",
      name: "ETCHE"
    },
    {
      value: "0244",
      name: "ETHIOPE"
    },
    {
      value: "0245",
      name: "ETIM EKPO"
    },
    {
      value: "0246",
      name: "ETIN EKPO"
    },
    {
      value: "0247",
      name: "ETINAM"
    },
    {
      value: "0248",
      name: "ETINAN"
    },
    {
      value: "0249",
      name: "ETIOSA"
    },
    {
      value: "0250",
      name: "ETSAKO"
    },
    {
      value: "0251",
      name: "ETUNG"
    },
    {
      value: "0252",
      name: "EWEKORO"
    },
    {
      value: "0253",
      name: "EZEAGU"
    },
    {
      value: "0254",
      name: "EZINHITE"
    },
    {
      value: "0255",
      name: "EZZA"
    },
    {
      value: "0256",
      name: "FAGGE"
    },
    {
      value: "0257",
      name: "FAKAI"
    },
    {
      value: "0258",
      name: "FASKARI"
    },
    {
      value: "0259",
      name: "FIKA"
    },
    {
      value: "0260",
      name: "FRANKFURT"
    },
    {
      value: "0261",
      name: "FUFORE"
    },
    {
      value: "0262",
      name: "FUNAKAYE"
    },
    {
      value: "0263",
      name: "FUNE"
    },
    {
      value: "0264",
      name: "FUNTUA"
    },
    {
      value: "0265",
      name: "GABASAWA"
    },
    {
      value: "0266",
      name: "GADA"
    },
    {
      value: "0267",
      name: "GAGARAWA"
    },
    {
      value: "0268",
      name: "GANAYE"
    },
    {
      value: "0269",
      name: "GANJUWA"
    },
    {
      value: "0270",
      name: "GARKI"
    },
    {
      value: "0271",
      name: "GARKO"
    },
    {
      value: "0272",
      name: "GARUN MALLAM"
    },
    {
      value: "0273",
      name: "GASHAKA"
    },
    {
      value: "0274",
      name: "GASHUA"
    },
    {
      value: "0275",
      name: "GASSOL"
    },
    {
      value: "0276",
      name: "GAWABAWA"
    },
    {
      value: "0277",
      name: "GAYA"
    },
    {
      value: "0278",
      name: "GBAKO"
    },
    {
      value: "0279",
      name: "GBOKO"
    },
    {
      value: "0280",
      name: "GBONGAN"
    },
    {
      value: "0281",
      name: "GBONYIN"
    },
    {
      value: "0282",
      name: "GEIDAM"
    },
    {
      value: "0283",
      name: "GENEVA"
    },
    {
      value: "0284",
      name: "GEZAWA"
    },
    {
      value: "0285",
      name: "GIADE"
    },
    {
      value: "0286",
      name: "GINDIN DOROWA"
    },
    {
      value: "0287",
      name: "GIRERI"
    },
    {
      value: "0288",
      name: "GIWA"
    },
    {
      value: "0289",
      name: "GOGARAM"
    },
    {
      value: "0290",
      name: "GOKANA"
    },
    {
      value: "0291",
      name: "GOMBE"
    },
    {
      value: "0292",
      name: "GOMBI"
    },
    {
      value: "0293",
      name: "GORONYO"
    },
    {
      value: "0294",
      name: "GUBIO"
    },
    {
      value: "0295",
      name: "GUDU"
    },
    {
      value: "0296",
      name: "GUJBA"
    },
    {
      value: "0297",
      name: "GULANI"
    },
    {
      value: "0298",
      name: "GUMA"
    },
    {
      value: "0299",
      name: "GUMEL"
    },
    {
      value: "0300",
      name: "GUMMI"
    },
    {
      value: "0301",
      name: "GURARA"
    },
    {
      value: "0302",
      name: "GURI"
    },
    {
      value: "0303",
      name: "GUSAU"
    },
    {
      value: "0304",
      name: "GUYUK"
    },
    {
      value: "0305",
      name: "GUZAMALA"
    },
    {
      value: "0306",
      name: "GWADA BAWA"
    },
    {
      value: "0307",
      name: "GWAGWALADA"
    },
    {
      value: "0308",
      name: "GWALE"
    },
    {
      value: "0309",
      name: "GWANDU"
    },
    {
      value: "0310",
      name: "GWARAM"
    },
    {
      value: "0311",
      name: "GWARZO"
    },
    {
      value: "0312",
      name: "GWER"
    },
    {
      value: "0313",
      name: "GWIWA"
    },
    {
      value: "0314",
      name: "GWOZA"
    },
    {
      value: "0315",
      name: "HADEJIA"
    },
    {
      value: "0316",
      name: "HAWUL"
    },
    {
      value: "0317",
      name: "HONG KONG"
    },
    {
      value: "0318",
      name: "HOUSTON"
    },
    {
      value: "0319",
      name: "IBADAN"
    },
    {
      value: "0320",
      name: "IBAFO"
    },
    {
      value: "0321",
      name: "IBAJI"
    },
    {
      value: "0322",
      name: "IBARAPA"
    },
    {
      value: "0323",
      name: "IBEJU LEKKI"
    },
    {
      value: "0324",
      name: "IBENO"
    },
    {
      value: "0325",
      name: "IBESIKPO ASUTAN"
    },
    {
      value: "0326",
      name: "IBI"
    },
    {
      value: "0327",
      name: "IBIONO IBON"
    },
    {
      value: "0328",
      name: "IBOKUN"
    },
    {
      value: "0329",
      name: "IBUSA"
    },
    {
      value: "0330",
      name: "IDAH"
    },
    {
      value: "0331",
      name: "IDANRE"
    },
    {
      value: "0332",
      name: "IDARAPO"
    },
    {
      value: "0333",
      name: "IDEATO"
    },
    {
      value: "0334",
      name: "IDEMILI"
    },
    {
      value: "0335",
      name: "IDI-IROKO"
    },
    {
      value: "0336",
      name: "IDIMU"
    },
    {
      value: "0338",
      name: "IDO"
    },
    {
      value: "0339",
      name: "IFAKO/IJAYE"
    },
    {
      value: "0340",
      name: "IFE"
    },
    {
      value: "0341",
      name: "IFEDAPO"
    },
    {
      value: "0342",
      name: "IFEDORE"
    },
    {
      value: "0343",
      name: "IFELODUN"
    },
    {
      value: "0344",
      name: "IFELOJU"
    },
    {
      value: "0345",
      name: "IFETEDO"
    },
    {
      value: "0346",
      name: "IFO"
    },
    {
      value: "0347",
      name: "IGALAMELA"
    },
    {
      value: "0348",
      name: "IGALAMELA-ODOLU"
    },
    {
      value: "0349",
      name: "IGANMU"
    },
    {
      value: "0350",
      name: "IGBABI"
    },
    {
      value: "0351",
      name: "IGBAJO"
    },
    {
      value: "0352",
      name: "IGBARA ODO"
    },
    {
      value: "0353",
      name: "IGBARA OKE"
    },
    {
      value: "0354",
      name: "IGBESA"
    },
    {
      value: "0355",
      name: "IGBETI"
    },
    {
      value: "0356",
      name: "IGBO-EKITI"
    },
    {
      value: "0357",
      name: "IGBOETITI"
    },
    {
      value: "0358",
      name: "IGBOEZE"
    },
    {
      value: "0359",
      name: "IGBOHO"
    },
    {
      value: "0360",
      name: "IGBO-ORA"
    },
    {
      value: "0361",
      name: "IGUEBEN"
    },
    {
      value: "0362",
      name: "IGWURITA"
    },
    {
      value: "0363",
      name: "IHIALA"
    },
    {
      value: "0364",
      name: "IHITTE/UBOMA"
    },
    {
      value: "0365",
      name: "IJEBU-IGBO"
    },
    {
      value: "0366",
      name: "IJEBU-MUSHIN"
    },
    {
      value: "0367",
      name: "IJEBU-ODE"
    },
    {
      value: "0368",
      name: "IJERO-EKITI"
    },
    {
      value: "0369",
      name: "IJU"
    },
    {
      value: "0370",
      name: "IJUMU"
    },
    {
      value: "0371",
      name: "IKA"
    },
    {
      value: "0372",
      name: "IKARA"
    },
    {
      value: "0373",
      name: "IKARE"
    },
    {
      value: "0374",
      name: "IKEDURU"
    },
    {
      value: "0375",
      name: "IKEJA"
    },
    {
      value: "0376",
      name: "IKEJI-ARAKEJI"
    },
    {
      value: "0377",
      name: "IKENNE"
    },
    {
      value: "0378",
      name: "IKIRE"
    },
    {
      value: "0379",
      name: "IKIRUN"
    },
    {
      value: "0380",
      name: "IKOGOSI"
    },
    {
      value: "0381",
      name: "IKOLE"
    },
    {
      value: "0382",
      name: "IKOM"
    },
    {
      value: "0383",
      name: "IKONO"
    },
    {
      value: "0384",
      name: "IKORODU"
    },
    {
      value: "0385",
      name: "IKOT ABASI"
    },
    {
      value: "0386",
      name: "IKOT EKPENE"
    },
    {
      value: "0387",
      name: "IKOTUN"
    },
    {
      value: "0388",
      name: "IKOYI"
    },
    {
      value: "0389",
      name: "IKPOBA"
    },
    {
      value: "0390",
      name: "IKWERRE"
    },
    {
      value: "0391",
      name: "IKWO"
    },
    {
      value: "0392",
      name: "IKWUANO"
    },
    {
      value: "0393",
      name: "ILAJE"
    },
    {
      value: "0394",
      name: "ILA-ORANGUN"
    },
    {
      value: "0395",
      name: "ILARO"
    },
    {
      value: "0396",
      name: "ILE OLUJI"
    },
    {
      value: "0397",
      name: "ILE-IFE"
    },
    {
      value: "0398",
      name: "ILEJEMEJE"
    },
    {
      value: "0399",
      name: "ILESHA"
    },
    {
      value: "0400",
      name: "ILISAN"
    },
    {
      value: "0401",
      name: "ILISHAN"
    },
    {
      value: "0402",
      name: "ILLELA"
    },
    {
      value: "0403",
      name: "ILOKO-IJESHA"
    },
    {
      value: "0404",
      name: "ILORA"
    },
    {
      value: "0405",
      name: "ILORIN"
    },
    {
      value: "0406",
      name: "ILUGUN ALARO"
    },
    {
      value: "0407",
      name: "IMEKO AFON"
    },
    {
      value: "0408",
      name: "INGAWA"
    },
    {
      value: "0409",
      name: "INI"
    },
    {
      value: "0410",
      name: "IPERU"
    },
    {
      value: "0411",
      name: "IPETUMODU"
    },
    {
      value: "0412",
      name: "IPOKIA"
    },
    {
      value: "0413",
      name: "IRAGBIJI"
    },
    {
      value: "0414",
      name: "IRELE"
    },
    {
      value: "0415",
      name: "IREPO"
    },
    {
      value: "0416",
      name: "IREPODUN"
    },
    {
      value: "0418",
      name: "IREWOLE"
    },
    {
      value: "0419",
      name: "IRUN-AKOKO"
    },
    {
      value: "0420",
      name: "ISA"
    },
    {
      value: "0421",
      name: "ISANYAWA"
    },
    {
      value: "0422",
      name: "ISARA"
    },
    {
      value: "0423",
      name: "ISE/ORUN"
    },
    {
      value: "0424",
      name: "ISE-EKITI"
    },
    {
      value: "0425",
      name: "ISEYIN"
    },
    {
      value: "0426",
      name: "ISHIELU"
    },
    {
      value: "0427",
      name: "ISIALA"
    },
    {
      value: "0428",
      name: "ISIN"
    },
    {
      value: "0429",
      name: "ISIUZO"
    },
    {
      value: "0430",
      name: "ISOKAN"
    },
    {
      value: "0431",
      name: "ISOKO"
    },
    {
      value: "0432",
      name: "ISOLO"
    },
    {
      value: "0433",
      name: "ISU"
    },
    {
      value: "0434",
      name: "ISUIKWATO"
    },
    {
      value: "0435",
      name: "ITAS/GADAU"
    },
    {
      value: "0436",
      name: "ITESIWAJU"
    },
    {
      value: "0437",
      name: "ITU"
    },
    {
      value: "0438",
      name: "IVO"
    },
    {
      value: "0439",
      name: "IWAJOWA"
    },
    {
      value: "0440",
      name: "IWO"
    },
    {
      value: "0441",
      name: "IYIGBO"
    },
    {
      value: "0442",
      name: "JABA"
    },
    {
      value: "0443",
      name: "JADA"
    },
    {
      value: "0444",
      name: "JAHUN"
    },
    {
      value: "0445",
      name: "JAKUSKO"
    },
    {
      value: "0446",
      name: "JALINGO"
    },
    {
      value: "0447",
      name: "JAMA`ARE"
    },
    {
      value: "0448",
      name: "JEBBA"
    },
    {
      value: "0449",
      name: "JEGA"
    },
    {
      value: "0450",
      name: "JEMAA"
    },
    {
      value: "0451",
      name: "JERE"
    },
    {
      value: "0452",
      name: "JIBIA"
    },
    {
      value: "0453",
      name: "JIBIYA"
    },
    {
      value: "0454",
      name: "JIMETA"
    },
    {
      value: "0455",
      name: "JOHANNESBURG"
    },
    {
      value: "0456",
      name: "JOS"
    },
    {
      value: "0457",
      name: "KABBA"
    },
    {
      value: "0458",
      name: "KABO"
    },
    {
      value: "0459",
      name: "KACHIA"
    },
    {
      value: "0460",
      name: "KADUNA"
    },
    {
      value: "0461",
      name: "KAFANCHAN"
    },
    {
      value: "0462",
      name: "KAFIN HAUSA"
    },
    {
      value: "0463",
      name: "KAFUR"
    },
    {
      value: "0464",
      name: "KAGA"
    },
    {
      value: "0465",
      name: "KAGARKO"
    },
    {
      value: "0466",
      name: "KAIAMA"
    },
    {
      value: "0467",
      name: "KAITA"
    },
    {
      value: "0468",
      name: "KAJOLA"
    },
    {
      value: "0469",
      name: "KAJURU"
    },
    {
      value: "0470",
      name: "KALA/BALGE"
    },
    {
      value: "0471",
      name: "KALGO"
    },
    {
      value: "0472",
      name: "KALTUNGO"
    },
    {
      value: "0473",
      name: "KANAM"
    },
    {
      value: "0474",
      name: "KANKARA"
    },
    {
      value: "0475",
      name: "KANKE"
    },
    {
      value: "0476",
      name: "KANKIA"
    },
    {
      value: "0477",
      name: "KANKIYA"
    },
    {
      value: "0478",
      name: "KANO"
    },
    {
      value: "0479",
      name: "KARASUWA"
    },
    {
      value: "0480",
      name: "KARAWA"
    },
    {
      value: "0481",
      name: "KARAYE"
    },
    {
      value: "0482",
      name: "KARIMLAMIDO"
    },
    {
      value: "0483",
      name: "KARU"
    },
    {
      value: "0484",
      name: "KATAGUM"
    },
    {
      value: "0485",
      name: "KATCHA"
    },
    {
      value: "0486",
      name: "KATSINA"
    },
    {
      value: "0487",
      name: "KAUGAMA"
    },
    {
      value: "0488",
      name: "KAUGAMA KAZAURE"
    },
    {
      value: "0489",
      name: "KAURA"
    },
    {
      value: "0490",
      name: "KAURA-NAMODA"
    },
    {
      value: "0491",
      name: "KAURU"
    },
    {
      value: "0492",
      name: "KAZAURE"
    },
    {
      value: "0493",
      name: "KEANA"
    },
    {
      value: "0494",
      name: "KEBBE"
    },
    {
      value: "0495",
      name: "KEFFI"
    },
    {
      value: "0496",
      name: "KETU"
    },
    {
      value: "0497",
      name: "KHANA"
    },
    {
      value: "0498",
      name: "KIBIYA"
    },
    {
      value: "0499",
      name: "KIBLYA"
    },
    {
      value: "0500",
      name: "KIRFI"
    },
    {
      value: "0501",
      name: "KIRIKISAMMA"
    },
    {
      value: "0502",
      name: "KIRU"
    },
    {
      value: "0503",
      name: "KISHI"
    },
    {
      value: "0504",
      name: "KIYAWA"
    },
    {
      value: "0505",
      name: "KIYAWAKIYAWA"
    },
    {
      value: "0506",
      name: "KNODUGA"
    },
    {
      value: "0507",
      name: "KOKO/BESSE"
    },
    {
      value: "0508",
      name: "KOKONA"
    },
    {
      value: "0509",
      name: "KOLOKUMA/OPOKUMA"
    },
    {
      value: "0510",
      name: "KONDUGA"
    },
    {
      value: "0511",
      name: "KONSHISHATSE"
    },
    {
      value: "0512",
      name: "KONTAGORA"
    },
    {
      value: "0513",
      name: "KONTANGORA"
    },
    {
      value: "0514",
      name: "KUALA LUMPUR"
    },
    {
      value: "0515",
      name: "KUBAN"
    },
    {
      value: "0516",
      name: "KUBAU"
    },
    {
      value: "0517",
      name: "KUDAN"
    },
    {
      value: "0518",
      name: "KUJE"
    },
    {
      value: "0519",
      name: "KUKAWA"
    },
    {
      value: "0520",
      name: "KUMBOTSO"
    },
    {
      value: "0521",
      name: "KUNCHI"
    },
    {
      value: "0522",
      name: "KURA"
    },
    {
      value: "0523",
      name: "KURFI"
    },
    {
      value: "0524",
      name: "KURMI"
    },
    {
      value: "0525",
      name: "KUSADA"
    },
    {
      value: "0526",
      name: "KWALE"
    },
    {
      value: "0527",
      name: "KWALI"
    },
    {
      value: "0528",
      name: "KWAMI"
    },
    {
      value: "0529",
      name: "KWANDE"
    },
    {
      value: "0530",
      name: "KWARE"
    },
    {
      value: "0531",
      name: "KWAYAKUSAR"
    },
    {
      value: "0532",
      name: "LAFIA"
    },
    {
      value: "0533",
      name: "LAGELU"
    },
    {
      value: "0534",
      name: "LAGOS"
    },
    {
      value: "0535",
      name: "LAGOS ISLAND"
    },
    {
      value: "0536",
      name: "LAGOS MAINLAND"
    },
    {
      value: "0537",
      name: "LAMURDE"
    },
    {
      value: "0538",
      name: "LANTANG"
    },
    {
      value: "0539",
      name: "LAPAI"
    },
    {
      value: "0540",
      name: "LAU"
    },
    {
      value: "0541",
      name: "LAVUN"
    },
    {
      value: "0542",
      name: "LAWUN"
    },
    {
      value: "0543",
      name: "LERE"
    },
    {
      value: "0544",
      name: "LOGO"
    },
    {
      value: "0545",
      name: "LOKOJA"
    },
    {
      value: "0546",
      name: "LONDON"
    },
    {
      value: "0547",
      name: "LOS ANGELES"
    },
    {
      value: "0548",
      name: "MACHINA"
    },
    {
      value: "0549",
      name: "MADAGA"
    },
    {
      value: "0550",
      name: "MADAGALI"
    },
    {
      value: "0551",
      name: "MADOB"
    },
    {
      value: "0552",
      name: "MADRID"
    },
    {
      value: "0553",
      name: "MAFA"
    },
    {
      value: "0554",
      name: "MAGAMA"
    },
    {
      value: "0555",
      name: "MAGUMERI"
    },
    {
      value: "0556",
      name: "MAI ADUWA"
    },
    {
      value: "0557",
      name: "MAIDUGURI"
    },
    {
      value: "0558",
      name: "MAIGATARI"
    },
    {
      value: "0559",
      name: "MAIHA"
    },
    {
      value: "0560",
      name: "MAIYAMA"
    },
    {
      value: "0561",
      name: "MAKARFI"
    },
    {
      value: "0562",
      name: "MAKODA"
    },
    {
      value: "0563",
      name: "MAKURDI"
    },
    {
      value: "0564",
      name: "MALAMMADURI"
    },
    {
      value: "0565",
      name: "MALUMFASHI"
    },
    {
      value: "0566",
      name: "MANGU"
    },
    {
      value: "0567",
      name: "MANI"
    },
    {
      value: "0568",
      name: "MARADUN"
    },
    {
      value: "0569",
      name: "MARARABA"
    },
    {
      value: "0570",
      name: "MARIGA"
    },
    {
      value: "0571",
      name: "MARTE"
    },
    {
      value: "0572",
      name: "MARU"
    },
    {
      value: "0573",
      name: "MASHEGU"
    },
    {
      value: "0574",
      name: "MASHI"
    },
    {
      value: "0575",
      name: "MATAZU"
    },
    {
      value: "0576",
      name: "MATAZUU"
    },
    {
      value: "0577",
      name: "MBAITOLU"
    },
    {
      value: "0578",
      name: "MBO"
    },
    {
      value: "0579",
      name: "MELBOURNE"
    },
    {
      value: "0580",
      name: "MEXICO CITY"
    },
    {
      value: "0581",
      name: "MGBIDI"
    },
    {
      value: "0582",
      name: "MIAMI"
    },
    {
      value: "0583",
      name: "MICHIKA"
    },
    {
      value: "0584",
      name: "MIGA"
    },
    {
      value: "0585",
      name: "MIKANG"
    },
    {
      value: "0586",
      name: "MILAN"
    },
    {
      value: "0587",
      name: "MINJIBIR"
    },
    {
      value: "0588",
      name: "MINNA"
    },
    {
      value: "0589",
      name: "MIRAGA"
    },
    {
      value: "0590",
      name: "MISAU"
    },
    {
      value: "0591",
      name: "MKPATENIN"
    },
    {
      value: "0592",
      name: "MOBA"
    },
    {
      value: "0593",
      name: "MOBBAR"
    },
    {
      value: "0594",
      name: "MODAKEKE"
    },
    {
      value: "0595",
      name: "MOKWA"
    },
    {
      value: "0596",
      name: "MONGUNO"
    },
    {
      value: "0597",
      name: "MONTREAL"
    },
    {
      value: "0598",
      name: "MOPAMURO MOPA"
    },
    {
      value: "0599",
      name: "MORO"
    },
    {
      value: "0600",
      name: "MOSCOW"
    },
    {
      value: "0601",
      name: "MUBI"
    },
    {
      value: "0602",
      name: "MUMBAI"
    },
    {
      value: "0603",
      name: "MUNICH"
    },
    {
      value: "0604",
      name: "MUSAWA"
    },
    {
      value: "0605",
      name: "MUSHIN"
    },
    {
      value: "0606",
      name: "MUYA"
    },
    {
      value: "0607",
      name: "NAFADA/BAJOGA"
    },
    {
      value: "0608",
      name: "NANGERE"
    },
    {
      value: "0609",
      name: "NASARAWA"
    },
    {
      value: "0610",
      name: "NCHIA"
    },
    {
      value: "0611",
      name: "NDOKWA"
    },
    {
      value: "0612",
      name: "NEMBE"
    },
    {
      value: "0613",
      name: "NEW YORK"
    },
    {
      value: "0614",
      name: "NGALA"
    },
    {
      value: "0615",
      name: "NGANZAI"
    },
    {
      value: "0616",
      name: "NGASKI"
    },
    {
      value: "0617",
      name: "NGOR OKPALA"
    },
    {
      value: "0618",
      name: "NGURU"
    },
    {
      value: "0619",
      name: "NGWA"
    },
    {
      value: "0620",
      name: "NINGI"
    },
    {
      value: "0621",
      name: "NJABA"
    },
    {
      value: "0622",
      name: "NJIKOKA"
    },
    {
      value: "0623",
      name: "NKANU"
    },
    {
      value: "0624",
      name: "NKPOR"
    },
    {
      value: "0625",
      name: "NKWANGELE"
    },
    {
      value: "0626",
      name: "NKWERRE"
    },
    {
      value: "0627",
      name: "NNEWI"
    },
    {
      value: "0628",
      name: "NSIT ATAI"
    },
    {
      value: "0629",
      name: "NSITIBON"
    },
    {
      value: "0630",
      name: "NSITUBIUM"
    },
    {
      value: "0631",
      name: "NSUKKA"
    },
    {
      value: "0632",
      name: "NUMAN"
    },
    {
      value: "0633",
      name: "NWANGELE"
    },
    {
      value: "0634",
      name: "OBAFEMI/OWODE"
    },
    {
      value: "0635",
      name: "OBAJANA"
    },
    {
      value: "0636",
      name: "OBANLIKU"
    },
    {
      value: "0637",
      name: "OBI"
    },
    {
      value: "0638",
      name: "OBI NWA"
    },
    {
      value: "0639",
      name: "OBIA/AKPOR"
    },
    {
      value: "0640",
      name: "OBIARUKU"
    },
    {
      value: "0641",
      name: "OBIO/AKPOR"
    },
    {
      value: "0642",
      name: "OBOKUN"
    },
    {
      value: "0643",
      name: "OBOLO"
    },
    {
      value: "0644",
      name: "OBOSI"
    },
    {
      value: "0645",
      name: "OBOT AKARA"
    },
    {
      value: "0646",
      name: "OBOWO"
    },
    {
      value: "0647",
      name: "OBUBRA"
    },
    {
      value: "0648",
      name: "OBUDU"
    },
    {
      value: "0649",
      name: "ODE REMO"
    },
    {
      value: "0650",
      name: "ODEDA"
    },
    {
      value: "0651",
      name: "ODIGBA"
    },
    {
      value: "0652",
      name: "ODIGBO"
    },
    {
      value: "0653",
      name: "ODOGBOLU"
    },
    {
      value: "0654",
      name: "ODOOTIN"
    },
    {
      value: "0655",
      name: "ODUKPANI"
    },
    {
      value: "0656",
      name: "OFFA"
    },
    {
      value: "0657",
      name: "OFU"
    },
    {
      value: "0658",
      name: "OGBA/IJAIYE"
    },
    {
      value: "0659",
      name: "OGBADIBO"
    },
    {
      value: "0660",
      name: "OGBARU"
    },
    {
      value: "0661",
      name: "OGBIA"
    },
    {
      value: "0662",
      name: "OGBOMOSHO"
    },
    {
      value: "0663",
      name: "OGHARA"
    },
    {
      value: "0664",
      name: "OGIDI"
    },
    {
      value: "0665",
      name: "OGO OLUWA"
    },
    {
      value: "0666",
      name: "OGOJA"
    },
    {
      value: "0667",
      name: "OGORI/MAGONGO"
    },
    {
      value: "0668",
      name: "OGU/BOLO"
    },
    {
      value: "0669",
      name: "OGUTA"
    },
    {
      value: "0670",
      name: "OGWASHI-UKU"
    },
    {
      value: "0671",
      name: "OHAFIA"
    },
    {
      value: "0672",
      name: "OHAJI EGBEMA"
    },
    {
      value: "0673",
      name: "OHAOZARA"
    },
    {
      value: "0674",
      name: "OHAUKWU"
    },
    {
      value: "0675",
      name: "OHIMINI"
    },
    {
      value: "0676",
      name: "OJI RIVER"
    },
    {
      value: "0677",
      name: "OJO"
    },
    {
      value: "0678",
      name: "OJOO"
    },
    {
      value: "0679",
      name: "OJU"
    },
    {
      value: "0680",
      name: "OKE-ERO"
    },
    {
      value: "0681",
      name: "OKEHI"
    },
    {
      value: "0682",
      name: "OKEHO"
    },
    {
      value: "0683",
      name: "OKEIGBO"
    },
    {
      value: "0684",
      name: "OKENE"
    },
    {
      value: "0685",
      name: "OKIGWE"
    },
    {
      value: "0686",
      name: "OKITIPUPA"
    },
    {
      value: "0687",
      name: "OKOBO"
    },
    {
      value: "0688",
      name: "OKOH"
    },
    {
      value: "0689",
      name: "OKPE"
    },
    {
      value: "0690",
      name: "OKPOKWU"
    },
    {
      value: "0691",
      name: "OKRIKA"
    },
    {
      value: "0692",
      name: "OKUKU"
    },
    {
      value: "0693",
      name: "OLAMABORRO"
    },
    {
      value: "0694",
      name: "OLAOLUWA"
    },
    {
      value: "0695",
      name: "OLEH"
    },
    {
      value: "0696",
      name: "OLORUNDA"
    },
    {
      value: "0697",
      name: "OLORUNSOGO"
    },
    {
      value: "0698",
      name: "OLUYOLE"
    },
    {
      value: "0699",
      name: "OMALA"
    },
    {
      value: "0700",
      name: "OMU-ARAN"
    },
    {
      value: "0701",
      name: "OMUMMA"
    },
    {
      value: "0702",
      name: "OMUO-EKITI"
    },
    {
      value: "0703",
      name: "ONAARA"
    },
    {
      value: "0704",
      name: "ONA-ARA"
    },
    {
      value: "0705",
      name: "ONDO"
    },
    {
      value: "0706",
      name: "ONICHA"
    },
    {
      value: "0707",
      name: "ONIKAN"
    },
    {
      value: "0708",
      name: "ONITSHA"
    },
    {
      value: "0709",
      name: "ONNA"
    },
    {
      value: "0710",
      name: "ONNE"
    },
    {
      value: "0711",
      name: "ONUIMO"
    },
    {
      value: "0712",
      name: "OPOBO/NKORO"
    },
    {
      value: "0713",
      name: "ORE"
    },
    {
      value: "0714",
      name: "OREDO"
    },
    {
      value: "0715",
      name: "ORELOPE"
    },
    {
      value: "0716",
      name: "ORHIONWON"
    },
    {
      value: "0717",
      name: "ORI IRE"
    },
    {
      value: "0718",
      name: "ORIADE"
    },
    {
      value: "0719",
      name: "ORIKANAM"
    },
    {
      value: "0720",
      name: "ORIRE"
    },
    {
      value: "0721",
      name: "ORLU"
    },
    {
      value: "0722",
      name: "OROLU"
    },
    {
      value: "0723",
      name: "ORON"
    },
    {
      value: "0724",
      name: "ORSU"
    },
    {
      value: "0725",
      name: "ORU"
    },
    {
      value: "0726",
      name: "ORUK ANAM"
    },
    {
      value: "0727",
      name: "ORUMBA"
    },
    {
      value: "0728",
      name: "ORUN"
    },
    {
      value: "0729",
      name: "OSE"
    },
    {
      value: "0730",
      name: "OSHIMILI"
    },
    {
      value: "0731",
      name: "OSHODI"
    },
    {
      value: "0732",
      name: "OSHOGBO"
    },
    {
      value: "0733",
      name: "OSIN"
    },
    {
      value: "0734",
      name: "OSISIOMA"
    },
    {
      value: "0735",
      name: "OTTA"
    },
    {
      value: "0736",
      name: "OTUKPO"
    },
    {
      value: "0737",
      name: "OVIA"
    },
    {
      value: "0738",
      name: "OVIM"
    },
    {
      value: "0739",
      name: "OWAN"
    },
    {
      value: "0740",
      name: "OWERRI"
    },
    {
      value: "0741",
      name: "OWO"
    },
    {
      value: "0742",
      name: "OWODE-EGBADO"
    },
    {
      value: "0743",
      name: "OYE"
    },
    {
      value: "0744",
      name: "OYI"
    },
    {
      value: "0745",
      name: "OYIGBO"
    },
    {
      value: "0746",
      name: "OYO"
    },
    {
      value: "0747",
      name: "OYUN"
    },
    {
      value: "0748",
      name: "PAIKORO"
    },
    {
      value: "0749",
      name: "PANKSHIN"
    },
    {
      value: "0750",
      name: "PARIS"
    },
    {
      value: "0751",
      name: "PATANI"
    },
    {
      value: "0752",
      name: "PATEGI"
    },
    {
      value: "0753",
      name: "PORT HARCOURT"
    },
    {
      value: "0754",
      name: "POTISKUM"
    },
    {
      value: "0755",
      name: "PRAGUE"
    },
    {
      value: "0756",
      name: "QUAAN PAN"
    },
    {
      value: "0757",
      name: "RABAH"
    },
    {
      value: "0758",
      name: "RAFI"
    },
    {
      value: "0759",
      name: "RANO"
    },
    {
      value: "0760",
      name: "RASSA"
    },
    {
      value: "0761",
      name: "RAURE"
    },
    {
      value: "0762",
      name: "RIJUA"
    },
    {
      value: "0763",
      name: "RIMI"
    },
    {
      value: "0764",
      name: "RIMIN GADO"
    },
    {
      value: "0765",
      name: "RINGIM"
    },
    {
      value: "0766",
      name: "RIYOM"
    },
    {
      value: "0767",
      name: "ROGO"
    },
    {
      value: "0768",
      name: "ROME"
    },
    {
      value: "0769",
      name: "RONI"
    },
    {
      value: "0770",
      name: "SABONBIRNI"
    },
    {
      value: "0771",
      name: "SABONGARI"
    },
    {
      value: "0772",
      name: "SABONGIDA"
    },
    {
      value: "0773",
      name: "SABUWA"
    },
    {
      value: "0774",
      name: "SAFANA"
    },
    {
      value: "0775",
      name: "SAGAMU"
    },
    {
      value: "0776",
      name: "SAGBAMA"
    },
    {
      value: "0777",
      name: "SAKABA"
    },
    {
      value: "0778",
      name: "SAKI"
    },
    {
      value: "0779",
      name: "SAN FRANCISCO"
    },
    {
      value: "0780",
      name: "SANDAMU"
    },
    {
      value: "0781",
      name: "SANGA"
    },
    {
      value: "0782",
      name: "SANTIAGO"
    },
    {
      value: "0783",
      name: "SAO PAULO"
    },
    {
      value: "0784",
      name: "SAPELE"
    },
    {
      value: "0785",
      name: "SARDAUNA"
    },
    {
      value: "0786",
      name: "SEOUL"
    },
    {
      value: "0787",
      name: "SHAGARI"
    },
    {
      value: "0788",
      name: "SHANGA"
    },
    {
      value: "0789",
      name: "SHANGHAI"
    },
    {
      value: "0790",
      name: "SHANI"
    },
    {
      value: "0791",
      name: "SHANONO"
    },
    {
      value: "0792",
      name: "SHELLENG"
    },
    {
      value: "0793",
      name: "SHENDAM"
    },
    {
      value: "0794",
      name: "SHINKAFI"
    },
    {
      value: "0795",
      name: "SHIRA"
    },
    {
      value: "0796",
      name: "SHIRORO"
    },
    {
      value: "0797",
      name: "SHOMGOM"
    },
    {
      value: "0798",
      name: "SHOMOLU"
    },
    {
      value: "0799",
      name: "SILAME"
    },
    {
      value: "0800",
      name: "SINGAPORE"
    },
    {
      value: "0801",
      name: "SOBA"
    },
    {
      value: "0802",
      name: "SOKOTO"
    },
    {
      value: "0803",
      name: "SONG"
    },
    {
      value: "0804",
      name: "SOUTHEREN IJAW"
    },
    {
      value: "0805",
      name: "STOCKHOLM"
    },
    {
      value: "0806",
      name: "SULE TANKARKAR"
    },
    {
      value: "0807",
      name: "SULEIJA"
    },
    {
      value: "0808",
      name: "SULEJA"
    },
    {
      value: "0809",
      name: "SUMAILA"
    },
    {
      value: "0810",
      name: "SURU"
    },
    {
      value: "0811",
      name: "SURULERE"
    },
    {
      value: "0812",
      name: "SYDNEY"
    },
    {
      value: "0813",
      name: "TAFA"
    },
    {
      value: "0814",
      name: "TAFAWA-BALEWA"
    },
    {
      value: "0815",
      name: "TAI"
    },
    {
      value: "0816",
      name: "TAKAI"
    },
    {
      value: "0817",
      name: "TAKALI"
    },
    {
      value: "0818",
      name: "TAKUM"
    },
    {
      value: "0819",
      name: "TAKUN"
    },
    {
      value: "0820",
      name: "TALATA/MAFARA"
    },
    {
      value: "0821",
      name: "TAMBUWAL"
    },
    {
      value: "0822",
      name: "TANGAZA"
    },
    {
      value: "0823",
      name: "TARAUNI"
    },
    {
      value: "0824",
      name: "TARKA"
    },
    {
      value: "0825",
      name: "TARMUA"
    },
    {
      value: "0826",
      name: "TAURA"
    },
    {
      value: "0827",
      name: "TAWA"
    },
    {
      value: "0828",
      name: "TEL AVIV"
    },
    {
      value: "0829",
      name: "TOFA"
    },
    {
      value: "0830",
      name: "TOKYO"
    },
    {
      value: "0831",
      name: "TORO"
    },
    {
      value: "0832",
      name: "TORONTO"
    },
    {
      value: "0833",
      name: "TOTO"
    },
    {
      value: "0834",
      name: "TOUNGO"
    },
    {
      value: "0835",
      name: "TSAFE"
    },
    {
      value: "0836",
      name: "TSANYAWA"
    },
    {
      value: "0837",
      name: "TUDUN WADA"
    },
    {
      value: "0838",
      name: "TURETA"
    },
    {
      value: "0839",
      name: "UDENU"
    },
    {
      value: "0840",
      name: "UDI"
    },
    {
      value: "0841",
      name: "UDI AGWU"
    },
    {
      value: "0842",
      name: "UDU"
    },
    {
      value: "0843",
      name: "UDUNG UKO"
    },
    {
      value: "0844",
      name: "UGEP"
    },
    {
      value: "0845",
      name: "UGHELLI"
    },
    {
      value: "0846",
      name: "UGWUNAGBO"
    },
    {
      value: "0847",
      name: "UHUNMWONDE"
    },
    {
      value: "0848",
      name: "UKANEFUN"
    },
    {
      value: "0849",
      name: "UKPOBA"
    },
    {
      value: "0850",
      name: "UKUM"
    },
    {
      value: "0851",
      name: "UKWUANI"
    },
    {
      value: "0852",
      name: "UMUAHIA"
    },
    {
      value: "0853",
      name: "UMUELEMAI"
    },
    {
      value: "0854",
      name: "UMU-NEOCHI"
    },
    {
      value: "0855",
      name: "UMUNZE"
    },
    {
      value: "0856",
      name: "UNGOGO"
    },
    {
      value: "0857",
      name: "UQUI IBENO"
    },
    {
      value: "0858",
      name: "URAN"
    },
    {
      value: "0859",
      name: "UROMI"
    },
    {
      value: "0860",
      name: "URUALLA"
    },
    {
      value: "0861",
      name: "URUE OFFONG ORUKO"
    },
    {
      value: "0862",
      name: "USHONGA"
    },
    {
      value: "0863",
      name: "USSA"
    },
    {
      value: "0864",
      name: "UVWIE"
    },
    {
      value: "0865",
      name: "UYO"
    },
    {
      value: "0866",
      name: "UZOUWANI"
    },
    {
      value: "0867",
      name: "VANCOUVER"
    },
    {
      value: "0868",
      name: "VANDEIKYA"
    },
    {
      value: "0869",
      name: "VICTORIA ISLAND"
    },
    {
      value: "0870",
      name: "VIENNA"
    },
    {
      value: "0871",
      name: "WAMAKKO"
    },
    {
      value: "0872",
      name: "WAMBA"
    },
    {
      value: "0873",
      name: "WARAWA"
    },
    {
      value: "0874",
      name: "WARJI"
    },
    {
      value: "0875",
      name: "WARRI"
    },
    {
      value: "0876",
      name: "WARSAW"
    },
    {
      value: "0877",
      name: "WASAGU/DANKO"
    },
    {
      value: "0878",
      name: "WASE"
    },
    {
      value: "0879",
      name: "WASHINGTON D.C."
    },
    {
      value: "0880",
      name: "WASUGU"
    },
    {
      value: "0881",
      name: "WUDIL"
    },
    {
      value: "0882",
      name: "WUKARI"
    },
    {
      value: "0884",
      name: "WURNO"
    },
    {
      value: "0885",
      name: "WUSE ABUJA"
    },
    {
      value: "0886",
      name: "WUSHISHI"
    },
    {
      value: "0887",
      name: "YABO"
    },
    {
      value: "0888",
      name: "YAGBA"
    },
    {
      value: "0889",
      name: "YAKUR"
    },
    {
      value: "0890",
      name: "YALA"
    },
    {
      value: "0891",
      name: "YAMATU/DEBA"
    },
    {
      value: "0892",
      name: "YANKWASIU"
    },
    {
      value: "0893",
      name: "YARKURR"
    },
    {
      value: "0894",
      name: "YAURI"
    },
    {
      value: "0895",
      name: "YENAGOA"
    },
    {
      value: "0896",
      name: "YOLA"
    },
    {
      value: "0897",
      name: "YORRO"
    },
    {
      value: "0898",
      name: "YUNUSARI"
    },
    {
      value: "0899",
      name: "YUSUFARI"
    },
    {
      value: "0900",
      name: "ZAKI"
    },
    {
      value: "0901",
      name: "ZANGO KATAF"
    },
    {
      value: "0902",
      name: "ZARIA"
    },
    {
      value: "0903",
      name: "ZING"
    },
    {
      value: "0904",
      name: "ZURICH"
    },
    {
      value: "0905",
      name: "ZURMI"
    },
    {
      value: "0906",
      name: "ZURU"
    },
    {
      value: "0907",
      name: "VOM"
    },
    {
      value: "0908",
      name: "HAMBURG"
    },
    {
      value: "0909",
      name: "OSLO"
    },
    {
      value: "0910",
      name: "TAIPEI"
    },
    {
      value: "0911",
      name: "SHANGAI"
    },
    {
      value: "0912",
      name: "HANDELSBANKEN"
    },
    {
      value: "0913",
      name: "BEIRUT"
    },
    {
      value: "0914",
      name: "AGO-IWOYE"
    },
    {
      value: "0915",
      name: "ALABA"
    },
    {
      value: "0916",
      name: "ASKIRA/UBA"
    },
    {
      value: "0917",
      name: "BAUCHI CITY"
    },
    {
      value: "0918",
      name: "CENTRAL AREA - FCT"
    },
    {
      value: "0919",
      name: "CHANCHAGE"
    },
    {
      value: "0920",
      name: "CHAFE"
    },
    {
      value: "0921",
      name: "DAWKIN TOFA"
    },
    {
      value: "0922",
      name: "DANGE/SHUNTE"
    },
    {
      value: "0923",
      name: "EASTERN OBOLO"
    },
    {
      value: "0924",
      name: "EBUTE-METTA"
    },
    {
      value: "0925",
      name: "EMURE/ISE/ORUN"
    },
    {
      value: "0926",
      name: "EAST YAGBA"
    },
    {
      value: "0927",
      name: "GOMBE STATE"
    },
    {
      value: "0928",
      name: "IDO - EKITI"
    },
    {
      value: "0929",
      name: "IDO/OSI"
    },
    {
      value: "0930",
      name: "IDUMOTA"
    },
    {
      value: "0931",
      name: "IJAN-EKITI"
    },
    {
      value: "0932",
      name: "IKERE-EKITI"
    },
    {
      value: "0933",
      name: "IKORO-EKITI"
    },
    {
      value: "0934",
      name: "ILE-OLUJI"
    },
    {
      value: "0935",
      name: "ILUPEJU"
    },
    {
      value: "0936",
      name: "IEPODUN"
    },
    {
      value: "0937",
      name: "IYAMAPO/OLORUNDOGO"
    },
    {
      value: "0938",
      name: "KATSINA ALA"
    },
    {
      value: "0939",
      name: "KOSOFE"
    },
    {
      value: "0940",
      name: "IKWERE"
    },
    {
      value: "0941",
      name: "MAINLAND"
    },
    {
      value: "0942",
      name: "NASSARAWA/EGGON"
    },
    {
      value: "0943",
      name: "ODE-EKITI"
    },
    {
      value: "0944",
      name: "OGBA/EGBEMA NDONI"
    },
    {
      value: "0945",
      name: "OGUN WATER SIDE"
    },
    {
      value: "0946",
      name: "OKE-AGBE"
    },
    {
      value: "0947",
      name: "OSHODIISOLO"
    },
    {
      value: "0948",
      name: "OTUN-EKITI"
    },
    {
      value: "0949",
      name: "PORTHARCOURT"
    },
    {
      value: "0950",
      name: "TUDUNWADA"
    },
    {
      value: "0951",
      name: "WUSE"
    },
    {
      value: "0952",
      name: "WEST YAGBA"
    },
    {
      value: "0953",
      name: "YABA"
    },
    {
      value: "0954",
      name: "YABA-ONDO"
    },
    {
      value: "0955",
      name: "YENEGOA"
    },
    {
      value: "0956",
      name: "ZANGO"
    }
  ];
  selectedValueCity = null;

  maritalArray = [
    { value: "SINGL", name: "Single"  },
    { value: "MRIED", name: "Married"},
    { value: "DVRCD", name: "Divorced"},
    { value: "WIDOW", name: "Widow"},
    { value: "WIDWR", name: "WIDWR"},
    { value: "LSEPT", name: "LSEPT"},
    { value: "LVEIN", name: "LVEIN"},
    { value: "ENGGD", name: "Engaged"},
    { value: "UNMRD", name: "Unmarried"},
    { value: "SEPRT", name: "Seperated"},
    { value: "OTHER", name: "Other"}
  ];
 selectedValueMarital = null;

 // file upload
 uploadedFile: any;
 uploadedFile2: any;
 uploadedFileMulti: any;
 uploadedFile2Array = [];
 myFiles: string [] = [];
 docArray = [];
 slicedImageFile: any;
 slicedImageFileMulti: any;
 slicedSignatureFile: any;
  bvnCustomerId: any;
  checkingCifIdToSubmit: string;
  uploadedDocs = [];
  accountNumberCreated: any;
  documentUploadFile: any;

  constructor(
    private landingService: LandingService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private clipboardService: ClipboardService
  ) { }

  ngOnInit(): void {
    this.bvnForm = this.formBuilder.group({
      bvn: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(11)]],
    });

    this.addForm = this.formBuilder.group({
      salutation: ['', Validators.required],
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]],
      dateOfBirth: ['',],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      appId: ['', Validators.required],
      bvn: ['',],
      state: ['', Validators.required],
      city: ['', Validators.required],
      imageFile: ['', Validators.required],
      signatureFile: ['', Validators.required],
      // signatureFile: [this.formBuilder.array([])],
      requestCard: ['', Validators.required],
      deliveryOption: ['',],
      pickupBranch: ['',],
      cardDeliveryAddress: ['',],
      cardType: ['',],
      uniqueKey: ['', Validators.required],
      profileAlert: ['', Validators.required],
      introducerCode: ['', Validators.required],
      cifId: ['',],
      branchState: [''],
      solId: [''],
      documents: this.formBuilder.array([]),
    });

    this.getAllbranch();
  }

  // get 20 random number
  getReference(length){
    const randomChars = '0123456789';
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  // get bvn details
  getBvnDetails(): void{
    this.isLoadingOne = true;
    const url = `${environment.baseUrl}/accounts/CustomerInquiryWithBVN?bvn=${this.bvnForm.value.bvn}`;
    const reference = this.getReference(20);
    const signValue = `GET&${encodeURIComponent(url)}&${reference}&${this.clientId}&${this.clientSecrete}`;
    const hashValue = SHA1(signValue);
    const encodedHashValue = btoa(hashValue);
    this.getBvnField = this.bvnForm.value.bvn;
    // tslint:disable-next-line:max-line-length
    this.landingService.validateBvnNumberCheck(this.bvnForm.value.bvn, encodedHashValue, reference, this.clientId).subscribe((result: any) => {
      this.bvnCheck = result.customerDetails;
      this.bvnCustomerId = this.bvnCheck.customerId;
      this.formFirstName = this.bvnCheck.customerFirstName;
      this.formLastName = this.bvnCheck.customerLastName;
      this.formMiddleName = this.bvnCheck.customerMiddleName;
      this.formPhoneNumber = this.bvnCheck.phoneNumber;

      this.checkingCifIdToSubmit = 'YES';

      this.notification.success( 'BVN', 'Bvn Verification successfull !!' );
      this.isLoadingOne = false;
      this.sectionShow = false;
      this.sectionShow1 = true;

    }, error => {
      if (error.error.responseCode === '1'){
        // tslint:disable-next-line:no-shadowed-variable
        const url = `${environment.baseUrl}/transactions/BVNValidation?bvn=${this.bvnForm.value.bvn}`;
        // tslint:disable-next-line:no-shadowed-variable
        const reference = this.getReference(20);
        // tslint:disable-next-line:no-shadowed-variable
        const signValue = `GET&${encodeURIComponent(url)}&${reference}&${this.clientId}&${this.clientSecrete}`;
        // tslint:disable-next-line:no-shadowed-variable
        const hashValue = SHA1(signValue);
        // tslint:disable-next-line:no-shadowed-variable
        const encodedHashValue = btoa(hashValue);
        // tslint:disable-next-line:no-shadowed-variable
        this.getBvnField = this.bvnForm.value.bvn;
        // tslint:disable-next-line:max-line-length
        this.landingService.validateBvnNumber(this.bvnForm.value.bvn, encodedHashValue, reference, this.clientId).subscribe((result: any) => {
          this.bvnDetails = result;
          this.notification.success( 'BVN', 'Bvn Verification successfull !!' );
          this.sectionShow = false;
          this.sectionShow1 = true;
          this.isLoadingOne = false;

          this.checkingCifIdToSubmit = 'NO';

          this.formFirstName = this.bvnDetails.firstName;
          this.formLastName = this.bvnDetails.lastName;
          this.formMiddleName = this.bvnDetails.middleName;
          this.formPhoneNumber = this.bvnDetails.phoneNumber;
          this.formDob = this.bvnDetails.dateOfBirth;


        // tslint:disable-next-line:no-shadowed-variable
        }, error => {
          this.isLoadingOne = false;
          this.notification.error( 'BVN', error.error.responseMessage );
        });
      }
      this.isLoadingOne = false;
      // this.notification.error( 'BVN', error.error.responseMessage );
    })
  }

  onFileSelect(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file.type === 'image/jpeg'){
      this.addForm.patchValue({
        imageFile: file
      });
      this.addForm.get('imageFile').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedFile = reader.result;
        console.log('file', this.uploadedFile)
        this.showImage1 = true
        this.uploadBtn = false;
        const fileImg: string = this.uploadedFile;
        this.slicedImageFile = fileImg.slice(23,  fileImg.length);
      };
      reader.readAsDataURL(file);
    } else {
      this.notification.warning( 'Image Upload', 'Only JPG format is allowed !!' );
    }
  }

  onFileSelect2(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file.type === 'image/jpeg'){
      this.addForm.patchValue({
        signatureFile: file
      });
      this.addForm.get('signatureFile').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedFile2 = reader.result;
        this.showImage2 = true
        const signImg: string = this.uploadedFile2;
        this.slicedSignatureFile = signImg.slice(23,  signImg.length);
      };
      reader.readAsDataURL(file);
    } else {
      this.notification.warning( 'Signature Upload', 'Only JPG format is allowed !!' );
    }


    // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < event.target.files.length; i++) {
    //   this.myFiles.push(event.target.files[i]);
    //   console.log('checking files', this.myFiles)
    //   const reader = new FileReader()
    //   reader.onload = (event: any) => {
    //     this.uploadedFile2Array.push(event.target.result);
    //     this.showImage2 = true
    //     console.log('checking', this.uploadedFile2Array)
    //   };
    //   reader.readAsDataURL(event.target.files[i])
    // }

  }

  onFileSelectMultiple(event): void{
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      const fileName = event.target.files[i].name;
      this.myFiles.push(event.target.files[i]);
      console.log('checking files', fileName)
      const reader = new FileReader()
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.uploadedFile2Array.push(event.target.result);
        this.docArray.push({
          filename : fileName,
          base64Encoded : event.target.result.split(',')[1]
        });
        console.log('checking', this.uploadedFile2Array)
      };
      reader.readAsDataURL(event.target.files[i])
    }
  }

  // For multiple but single upload
  onFileSelectMultiSingle(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const fileName = event.target.files[0].name;
    console.log(fileName);
    const reader = new FileReader();
    reader.onload = () => {
        this.uploadedFileMulti = reader.result;
        console.log('file', this.uploadedFileMulti)
        const fileImg: string = this.uploadedFileMulti;
        this.slicedImageFileMulti = fileImg.split(',')[1]

        this.docArray.push({
          filename : fileName,
          base64Encoded : this.slicedImageFileMulti
        });
      };
    reader.readAsDataURL(file);
  }
  uploadDocuments(): FormArray {
    return this.addForm.get('documents') as FormArray;
  }
  newDocuments(): FormGroup {
    return this.formBuilder.group({});
  }
  addDocuments(): void {
    this.uploadDocuments().push(this.newDocuments());
  }
  removeDocuments(sigIndex: number): void {
    this.uploadDocuments().removeAt(sigIndex);
  }

  clearForm(): void{
    this.addForm.reset();
  }

   // Submit Form
   getOpenAccount(): void{
    this.submitFormButton = false;
    this.submitFormButton2 = true;
    const reference = this.getReference(20);
    const url = `${environment.baseUrl}/accounts/AccountOpening/WithBVN`;
    const signValue = `POST&${encodeURIComponent(url)}&${reference}&${this.clientId}&${this.clientSecrete}`;
    const hashValue = SHA1(signValue);
    const encodedHashValue = btoa(hashValue);

    const togetherAddress = this.addForm.value.address2 + " " + this.addForm.value.address;

    if (this.checkingCifIdToSubmit === 'YES'){
      this.addForm.value.cifId = this.bvnCustomerId;
    } else {
      delete this.addForm.value.cifId;
    }

    this.addForm.value.dateOfBirth = this.formDob;
    this.addForm.value.imageFile = this.slicedImageFile;
    this.addForm.value.signatureFile = this.slicedSignatureFile;
    this.addForm.value.bvn = this.getBvnField;
    this.addForm.value.address = togetherAddress;
    this.addForm.value.appId = 'website';
    this.addForm.value.uniqueKey = this.formBinding.uniqueKey;
    delete this.addForm.value.address2;
    delete this.addForm.value.branchState;
    delete this.addForm.value.documents;
    console.log('finding', this.addForm.value);
    this.landingService.openAccount(this.addForm.value, reference, this.clientId, encodedHashValue).subscribe((result: any) => {
      this.openAccountResult = result;
      if(result.responseCode === 0){
        this.notification.success( 'Account Opening', 'Account Opening Successful, BVN linking Successful !!' );
        this.submitFormButton = true;
        this.submitFormButton2 = false;
        this.sectionShow = false;
        this.sectionShow1 = false;
        this.sectionShow2 = true;
        this.clearForm();
        this.showImage1 = false
        this.uploadBtn = true;

        this.accountNumberCreated = this.openAccountResult.accountNumber;
        // tslint:disable-next-line:no-shadowed-variable
        const reference = this.getReference(20);
        // tslint:disable-next-line:no-shadowed-variable
        const url = `${environment.baseUrl}/easyAccount/Documents/Upload/Website`;
        // tslint:disable-next-line:no-shadowed-variable
        const signValue = `POST&${encodeURIComponent(url)}&${reference}&${this.clientId}&${this.clientSecrete}`;
        // tslint:disable-next-line:no-shadowed-variable
        const hashValue = SHA1(signValue);
        // tslint:disable-next-line:no-shadowed-variable
        const encodedHashValue = btoa(hashValue);

        const passData = {
          accountNumber : this.accountNumberCreated,
          documents : this.docArray
        };
        console.log('finding the item', passData);
        this.landingService.documentUpload(passData, encodedHashValue, reference, this.clientId).subscribe((result: any) => {
          this.documentUploadFile = result;
        });
      }else{
        this.notification.success( 'Account Opening', 'One or more validation errors occurred. !!' );
      }

      this.accountNumberdetail = this.openAccountResult.accountNumber;
    },error => {
      this.submitFormButton = true;
      this.submitFormButton2 = false;
      this.notification.error( 'Account Opening',error.error.message || error.error.respMessage );
    });
  }

  // copy to clipboard
  copyAccountNumber(): void{
    this.clipboardService.copyFromContent(this.accountNumberdetail);
    this.notification.success('Account No', 'Copied successfully!!!');
  }

  // getBranches
  getAllbranch(): void{
    const reference = this.getReference(20);
    const url = `${environment.baseUrl}/accounts/GetBankBranches`;
    const signValue = `GET&${encodeURIComponent(url)}&${reference}&${this.clientId}&${this.clientSecrete}`;
    const hashValue = SHA1(signValue);
    const encodedHashValue = btoa(hashValue);

    this.landingService.getBranches(encodedHashValue, reference, this.clientId).subscribe((result: any) => {
      this.allBranchList = result.solDetails;
    })
  }

  home(): void{
    window.location.reload();
  }

  // Convert page to PDF
  convertToPdf(): void{
    // const data = document.getElementById('contentToConvertToPdf');
    // html2canvas(data).then(canvas => {
    //   const imgWidth = 208;
    //   const pageHeight = 295;
    //   const imgHeight = canvas.height * imgWidth / canvas.width;
    //   const heightLeft = imgHeight;

    //   const contentDataURL = canvas.toDataURL('image/png');
    //   const pdf = new jspdf('p', 'mm', 'a4');
    //   const position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //   pdf.save('Account-Details.pdf');
    // })


    // const data = document.getElementById('contentToConvertToPdf');
    // html2canvas(data).then(canvas => {
    //   const imgWidth = 208;
    //   const imgHeight = canvas.height * imgWidth / canvas.width;
    //   const contentDataURL = canvas.toDataURL('image/png')
    //   const pdf = new jsPDF('p', 'mm', 'a4');
    //   const position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    //   pdf.save('Account-Details.pdf');
    // });


    const node = document.getElementById('contentToConvertToPdf');
    htmltoimage.toPng(node)
      .then( (dataUrl) => {
      const img = new Image();
      img.src = dataUrl;
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setLineWidth(1);
      pdf.addImage(img, 'PNG', 0, 0, 208, 298);
      pdf.save('Account-Details.pdf');
      })
      .catch((error) => {
      console.error('oops, something went wrong!', error);
      });
  }

  anotherAccount(): void{
    window.location.reload();
  }

  // get branch by state
  getBranchByState(): void{
    this.isSpinning = true;
    const reference = this.getReference(20);
    const url = `${environment.baseUrl}/easyAccount/BranchesByState/${this.addForm.value.branchState}`;
    const signValue = `GET&${encodeURIComponent(url)}&${reference}&${this.clientId}&${this.clientSecrete}`;
    const hashValue = SHA1(signValue);
    const encodedHashValue = btoa(hashValue);

    // tslint:disable-next-line:max-line-length
    this.landingService.getAllBranchStateByState(this.addForm.value.branchState, encodedHashValue, reference, this.clientId).subscribe((result: any) => {
      this.stateBranchDetails = result;
      this.isSpinning = false;
    }, error => {
      this.isSpinning = false;
    })

  }

}
