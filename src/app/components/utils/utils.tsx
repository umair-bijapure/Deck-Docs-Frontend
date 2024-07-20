// import axios from "axios";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import imageCompression from 'browser-image-compression';
// import { link } from "fs";
import Cookies from 'universal-cookie';
import { useEffect, useState } from "react";
import { fetchOrganisations, getUserPermissions } from "./fetches";
const cookies = new Cookies();
interface Permissions {
    permissions: string[];
  }


  interface Organisation {
    // Define the structure of an Organisation based on your API response
    id: string;
    name: string;
    // Add more fields as necessary
  }
  
export const useOrganisations = (organisationId: string | null): [Organisation[], () => Promise<void>] => {
    const [organisations, setOrganisations] = useState<Organisation[]>([]);
    const controller = new AbortController();
  
    const updateOrganisations = async () => {
      if (organisationId) {
        try {
          const response = await fetchOrganisations(organisationId, controller);
          setOrganisations(response);
        } catch (error: any) {
          if (error.name !== 'AbortError') {
            console.log(error);
          } 
        }
      }
    };
  
    useEffect(() => {
      updateOrganisations();
    }, [organisationId]);
  
    useEffect(() => {
      return () => {
        controller.abort();
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    return [organisations, updateOrganisations];
  };
  
 export const useUserPermissions = () => {
    const [permissions, setPermissions] = useState<Permissions>({ permissions: [] });
    const [newPermissions, setNewPermissions] = useState<string[]>([]);
  
    const updatePermissions = async () => {
      try {
        console.warn("Before fetching permissions...");
        const fetchedPermissions: Permissions = await getUserPermissions();
        console.warn("Fetched permissions:", fetchedPermissions);
        setPermissions(fetchedPermissions);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching permissions:", error.message);
        } else {
          console.error("Unknown error occurred:", error);
        }
      }
    };
  
    useEffect(() => {
      console.warn("Executing updatePermissions...");
      updatePermissions();
    }, []); // Empty dependencies array ensures it runs only once after initial mount
  
    useEffect(() => {
      console.warn("Permissions updated:", permissions);
      if (permissions.permissions.length > 0) {
        const tempPermissions: string[] = [];
        for (let i = 0; i < permissions.permissions.length; i++) {
          console.warn(`Permission ${i}: ${permissions.permissions[i]}`);
          tempPermissions.push(permissions.permissions[i]);
        }
        setNewPermissions(tempPermissions);
      }
    }, [permissions]); // Log whenever permissions state changes
  
    return [newPermissions, updatePermissions] as const;
  };

export const statesAndDistricts = {  
    "states":[  
       {  
          "state":"Andhra Pradesh",
          "districts":[  
             "Anantapur",
             "Chittoor",
             "East Godavari",
             "Guntur",
             "Krishna",
             "Kurnool",
             "Nellore",
             "Prakasam",
             "Srikakulam",
             "Visakhapatnam",
             "Vizianagaram",
             "West Godavari",
             "YSR Kadapa"
          ]
       },
       {  
          "state":"Arunachal Pradesh",
          "districts":[  
             "Tawang",
             "West Kameng",
             "East Kameng",
             "Papum Pare",
             "Kurung Kumey",
             "Kra Daadi",
             "Lower Subansiri",
             "Upper Subansiri",
             "West Siang",
             "East Siang",
             "Siang",
             "Upper Siang",
             "Lower Siang",
             "Lower Dibang Valley",
             "Dibang Valley",
             "Anjaw",
             "Lohit",
             "Namsai",
             "Changlang",
             "Tirap",
             "Longding"
          ]
       },
       {  
          "state":"Assam",
          "districts":[  
             "Baksa",
             "Barpeta",
             "Biswanath",
             "Bongaigaon",
             "Cachar",
             "Charaideo",
             "Chirang",
             "Darrang",
             "Dhemaji",
             "Dhubri",
             "Dibrugarh",
             "Goalpara",
             "Golaghat",
             "Hailakandi",
             "Hojai",
             "Jorhat",
             "Kamrup Metropolitan",
             "Kamrup",
             "Karbi Anglong",
             "Karimganj",
             "Kokrajhar",
             "Lakhimpur",
             "Majuli",
             "Morigaon",
             "Nagaon",
             "Nalbari",
             "Dima Hasao",
             "Sivasagar",
             "Sonitpur",
             "South Salmara-Mankachar",
             "Tinsukia",
             "Udalguri",
             "West Karbi Anglong"
          ]
       },
       {  
          "state":"Bihar",
          "districts":[  
             "Araria",
             "Arwal",
             "Aurangabad",
             "Banka",
             "Begusarai",
             "Bhagalpur",
             "Bhojpur",
             "Buxar",
             "Darbhanga",
             "East Champaran (Motihari)",
             "Gaya",
             "Gopalganj",
             "Jamui",
             "Jehanabad",
             "Kaimur (Bhabua)",
             "Katihar",
             "Khagaria",
             "Kishanganj",
             "Lakhisarai",
             "Madhepura",
             "Madhubani",
             "Munger (Monghyr)",
             "Muzaffarpur",
             "Nalanda",
             "Nawada",
             "Patna",
             "Purnia (Purnea)",
             "Rohtas",
             "Saharsa",
             "Samastipur",
             "Saran",
             "Sheikhpura",
             "Sheohar",
             "Sitamarhi",
             "Siwan",
             "Supaul",
             "Vaishali",
             "West Champaran"
          ]
       },
       {  
          "state":"Chandigarh (UT)",
          "districts":[  
             "Chandigarh"
          ]
       },
       {  
          "state":"Chhattisgarh",
          "districts":[  
             "Balod",
             "Baloda Bazar",
             "Balrampur",
             "Bastar",
             "Bemetara",
             "Bijapur",
             "Bilaspur",
             "Dantewada (South Bastar)",
             "Dhamtari",
             "Durg",
             "Gariyaband",
             "Janjgir-Champa",
             "Jashpur",
             "Kabirdham (Kawardha)",
             "Kanker (North Bastar)",
             "Kondagaon",
             "Korba",
             "Korea (Koriya)",
             "Mahasamund",
             "Mungeli",
             "Narayanpur",
             "Raigarh",
             "Raipur",
             "Rajnandgaon",
             "Sukma",
             "Surajpur  ",
             "Surguja"
          ]
       },
       {  
          "state":"Dadra and Nagar Haveli (UT)",
          "districts":[  
             "Dadra & Nagar Haveli"
          ]
       },
       {  
          "state":"Daman and Diu (UT)",
          "districts":[  
             "Daman",
             "Diu"
          ]
       },
       {  
          "state":"Delhi (NCT)",
          "districts":[  
             "Central Delhi",
             "East Delhi",
             "New Delhi",
             "North Delhi",
             "North East  Delhi",
             "North West  Delhi",
             "Shahdara",
             "South Delhi",
             "South East Delhi",
             "South West  Delhi",
             "West Delhi"
          ]
       },
       {  
          "state":"Goa",
          "districts":[  
             "North Goa",
             "South Goa"
          ]
       },
       {  
          "state":"Gujarat",
          "districts":[  
             "Ahmedabad",
             "Amreli",
             "Anand",
             "Aravalli",
             "Banaskantha (Palanpur)",
             "Bharuch",
             "Bhavnagar",
             "Botad",
             "Chhota Udepur",
             "Dahod",
             "Dangs (Ahwa)",
             "Devbhoomi Dwarka",
             "Gandhinagar",
             "Gir Somnath",
             "Jamnagar",
             "Junagadh",
             "Kachchh",
             "Kheda (Nadiad)",
             "Mahisagar",
             "Mehsana",
             "Morbi",
             "Narmada (Rajpipla)",
             "Navsari",
             "Panchmahal (Godhra)",
             "Patan",
             "Porbandar",
             "Rajkot",
             "Sabarkantha (Himmatnagar)",
             "Surat",
             "Surendranagar",
             "Tapi (Vyara)",
             "Vadodara",
             "Valsad"
          ]
       },
       {  
          "state":"Haryana",
          "districts":[  
             "Ambala",
             "Bhiwani",
             "Charkhi Dadri",
             "Faridabad",
             "Fatehabad",
             "Gurgaon",
             "Hisar",
             "Jhajjar",
             "Jind",
             "Kaithal",
             "Karnal",
             "Kurukshetra",
             "Mahendragarh",
             "Mewat",
             "Palwal",
             "Panchkula",
             "Panipat",
             "Rewari",
             "Rohtak",
             "Sirsa",
             "Sonipat",
             "Yamunanagar"
          ]
       },
       {  
          "state":"Himachal Pradesh",
          "districts":[  
             "Bilaspur",
             "Chamba",
             "Hamirpur",
             "Kangra",
             "Kinnaur",
             "Kullu",
             "Lahaul &amp; Spiti",
             "Mandi",
             "Shimla",
             "Sirmaur (Sirmour)",
             "Solan",
             "Una"
          ]
       },
       {  
          "state":"Jammu and Kashmir",
          "districts":[  
             "Anantnag",
             "Bandipore",
             "Baramulla",
             "Budgam",
             "Doda",
             "Ganderbal",
             "Jammu",
             "Kargil",
             "Kathua",
             "Kishtwar",
             "Kulgam",
             "Kupwara",
             "Leh",
             "Poonch",
             "Pulwama",
             "Rajouri",
             "Ramban",
             "Reasi",
             "Samba",
             "Shopian",
             "Srinagar",
             "Udhampur"
          ]
       },
       {  
          "state":"Jharkhand",
          "districts":[  
             "Bokaro",
             "Chatra",
             "Deoghar",
             "Dhanbad",
             "Dumka",
             "East Singhbhum",
             "Garhwa",
             "Giridih",
             "Godda",
             "Gumla",
             "Hazaribag",
             "Jamtara",
             "Khunti",
             "Koderma",
             "Latehar",
             "Lohardaga",
             "Pakur",
             "Palamu",
             "Ramgarh",
             "Ranchi",
             "Sahibganj",
             "Seraikela-Kharsawan",
             "Simdega",
             "West Singhbhum"
          ]
       },
       {  
          "state":"Karnataka",
          "districts":[  
             "Bagalkot",
             "Ballari (Bellary)",
             "Belagavi (Belgaum)",
             "Bengaluru (Bangalore) Rural",
             "Bengaluru (Bangalore) Urban",
             "Bidar",
             "Chamarajanagar",
             "Chikballapur",
             "Chikkamagaluru (Chikmagalur)",
             "Chitradurga",
             "Dakshina Kannada",
             "Davangere",
             "Dharwad",
             "Gadag",
             "Hassan",
             "Haveri",
             "Kalaburagi (Gulbarga)",
             "Kodagu",
             "Kolar",
             "Koppal",
             "Mandya",
             "Mysuru (Mysore)",
             "Raichur",
             "Ramanagara",
             "Shivamogga (Shimoga)",
             "Tumakuru (Tumkur)",
             "Udupi",
             "Uttara Kannada (Karwar)",
             "Vijayapura (Bijapur)",
             "Yadgir"
          ]
       },
       {  
          "state":"Kerala",
          "districts":[  
             "Alappuzha",
             "Ernakulam",
             "Idukki",
             "Kannur",
             "Kasaragod",
             "Kollam",
             "Kottayam",
             "Kozhikode",
             "Malappuram",
             "Palakkad",
             "Pathanamthitta",
             "Thiruvananthapuram",
             "Thrissur",
             "Wayanad"
          ]
       },
       {  
          "state":"Lakshadweep (UT)",
          "districts":[  
             "Agatti",
             "Amini",
             "Androth",
             "Bithra",
             "Chethlath",
             "Kavaratti",
             "Kadmath",
             "Kalpeni",
             "Kilthan",
             "Minicoy"
          ]
       },
       {  
          "state":"Madhya Pradesh",
          "districts":[  
             "Agar Malwa",
             "Alirajpur",
             "Anuppur",
             "Ashoknagar",
             "Balaghat",
             "Barwani",
             "Betul",
             "Bhind",
             "Bhopal",
             "Burhanpur",
             "Chhatarpur",
             "Chhindwara",
             "Damoh",
             "Datia",
             "Dewas",
             "Dhar",
             "Dindori",
             "Guna",
             "Gwalior",
             "Harda",
             "Hoshangabad",
             "Indore",
             "Jabalpur",
             "Jhabua",
             "Katni",
             "Khandwa",
             "Khargone",
             "Mandla",
             "Mandsaur",
             "Morena",
             "Narsinghpur",
             "Neemuch",
             "Panna",
             "Raisen",
             "Rajgarh",
             "Ratlam",
             "Rewa",
             "Sagar",
             "Satna",
             "Sehore",
             "Seoni",
             "Shahdol",
             "Shajapur",
             "Sheopur",
             "Shivpuri",
             "Sidhi",
             "Singrauli",
             "Tikamgarh",
             "Ujjain",
             "Umaria",
             "Vidisha"
          ]
       },
       {  
          "state":"Maharashtra",
          "districts":[  
             "Ahmednagar",
             "Akola",
             "Amravati",
             "Aurangabad",
             "Beed",
             "Bhandara",
             "Buldhana",
             "Chandrapur",
             "Dhule",
             "Gadchiroli",
             "Gondia",
             "Hingoli",
             "Jalgaon",
             "Jalna",
             "Kolhapur",
             "Latur",
             "Mumbai City",
             "Mumbai Suburban",
             "Nagpur",
             "Nanded",
             "Nandurbar",
             "Nashik",
             "Osmanabad",
             "Palghar",
             "Parbhani",
             "Pune",
             "Raigad",
             "Ratnagiri",
             "Sangli",
             "Satara",
             "Sindhudurg",
             "Solapur",
             "Thane",
             "Wardha",
             "Washim",
             "Yavatmal"
          ]
       },
       {  
          "state":"Manipur",
          "districts":[  
             "Bishnupur",
             "Chandel",
             "Churachandpur",
             "Imphal East",
             "Imphal West",
             "Jiribam",
             "Kakching",
             "Kamjong",
             "Kangpokpi",
             "Noney",
             "Pherzawl",
             "Senapati",
             "Tamenglong",
             "Tengnoupal",
             "Thoubal",
             "Ukhrul"
          ]
       },
       {  
          "state":"Meghalaya",
          "districts":[  
             "East Garo Hills",
             "East Jaintia Hills",
             "East Khasi Hills",
             "North Garo Hills",
             "Ri Bhoi",
             "South Garo Hills",
             "South West Garo Hills ",
             "South West Khasi Hills",
             "West Garo Hills",
             "West Jaintia Hills",
             "West Khasi Hills"
          ]
       },
       {  
          "state":"Mizoram",
          "districts":[  
             "Aizawl",
             "Champhai",
             "Kolasib",
             "Lawngtlai",
             "Lunglei",
             "Mamit",
             "Saiha",
             "Serchhip"
          ]
       },
       {  
          "state":"Nagaland",
          "districts":[  
             "Dimapur",
             "Kiphire",
             "Kohima",
             "Longleng",
             "Mokokchung",
             "Mon",
             "Peren",
             "Phek",
             "Tuensang",
             "Wokha",
             "Zunheboto"
          ]
       },
       {  
          "state":"Odisha",
          "districts":[  
             "Angul",
             "Balangir",
             "Balasore",
             "Bargarh",
             "Bhadrak",
             "Boudh",
             "Cuttack",
             "Deogarh",
             "Dhenkanal",
             "Gajapati",
             "Ganjam",
             "Jagatsinghapur",
             "Jajpur",
             "Jharsuguda",
             "Kalahandi",
             "Kandhamal",
             "Kendrapara",
             "Kendujhar (Keonjhar)",
             "Khordha",
             "Koraput",
             "Malkangiri",
             "Mayurbhanj",
             "Nabarangpur",
             "Nayagarh",
             "Nuapada",
             "Puri",
             "Rayagada",
             "Sambalpur",
             "Sonepur",
             "Sundargarh"
          ]
       },
       {  
          "state":"Puducherry (UT)",
          "districts":[  
             "Karaikal",
             "Mahe",
             "Pondicherry",
             "Yanam"
          ]
       },
       {  
          "state":"Punjab",
          "districts":[  
             "Amritsar",
             "Barnala",
             "Bathinda",
             "Faridkot",
             "Fatehgarh Sahib",
             "Fazilka",
             "Ferozepur",
             "Gurdaspur",
             "Hoshiarpur",
             "Jalandhar",
             "Kapurthala",
             "Ludhiana",
             "Mansa",
             "Moga",
             "Muktsar",
             "Nawanshahr (Shahid Bhagat Singh Nagar)",
             "Pathankot",
             "Patiala",
             "Rupnagar",
             "Sahibzada Ajit Singh Nagar (Mohali)",
             "Sangrur",
             "Tarn Taran"
          ]
       },
       {  
          "state":"Rajasthan",
          "districts":[  
             "Ajmer",
             "Alwar",
             "Banswara",
             "Baran",
             "Barmer",
             "Bharatpur",
             "Bhilwara",
             "Bikaner",
             "Bundi",
             "Chittorgarh",
             "Churu",
             "Dausa",
             "Dholpur",
             "Dungarpur",
             "Hanumangarh",
             "Jaipur",
             "Jaisalmer",
             "Jalore",
             "Jhalawar",
             "Jhunjhunu",
             "Jodhpur",
             "Karauli",
             "Kota",
             "Nagaur",
             "Pali",
             "Pratapgarh",
             "Rajsamand",
             "Sawai Madhopur",
             "Sikar",
             "Sirohi",
             "Sri Ganganagar",
             "Tonk",
             "Udaipur"
          ]
       },
       {  
          "state":"Sikkim",
          "districts":[  
             "East Sikkim",
             "North Sikkim",
             "South Sikkim",
             "West Sikkim"
          ]
       },
       {  
          "state":"Tamil Nadu",
          "districts":[  
             "Ariyalur",
             "Chennai",
             "Coimbatore",
             "Cuddalore",
             "Dharmapuri",
             "Dindigul",
             "Erode",
             "Kanchipuram",
             "Kanyakumari",
             "Karur",
             "Krishnagiri",
             "Madurai",
             "Nagapattinam",
             "Namakkal",
             "Nilgiris",
             "Perambalur",
             "Pudukkottai",
             "Ramanathapuram",
             "Salem",
             "Sivaganga",
             "Thanjavur",
             "Theni",
             "Thoothukudi (Tuticorin)",
             "Tiruchirappalli",
             "Tirunelveli",
             "Tiruppur",
             "Tiruvallur",
             "Tiruvannamalai",
             "Tiruvarur",
             "Vellore",
             "Viluppuram",
             "Virudhunagar"
          ]
       },
       {  
          "state":"Telangana",
          "districts":[  
             "Adilabad",
             "Bhadradri Kothagudem",
             "Hyderabad",
             "Jagtial",
             "Jangaon",
             "Jayashankar Bhoopalpally",
             "Jogulamba Gadwal",
             "Kamareddy",
             "Karimnagar",
             "Khammam",
             "Komaram Bheem Asifabad",
             "Mahabubabad",
             "Mahabubnagar",
             "Mancherial",
             "Medak",
             "Medchal",
             "Nagarkurnool",
             "Nalgonda",
             "Nirmal",
             "Nizamabad",
             "Peddapalli",
             "Rajanna Sircilla",
             "Rangareddy",
             "Sangareddy",
             "Siddipet",
             "Suryapet",
             "Vikarabad",
             "Wanaparthy",
             "Warangal (Rural)",
             "Warangal (Urban)",
             "Yadadri Bhuvanagiri"
          ]
       },
       {  
          "state":"Tripura",
          "districts":[  
             "Dhalai",
             "Gomati",
             "Khowai",
             "North Tripura",
             "Sepahijala",
             "South Tripura",
             "Unakoti",
             "West Tripura"
          ]
       },
       {  
          "state":"Uttarakhand",
          "districts":[  
             "Almora",
             "Bageshwar",
             "Chamoli",
             "Champawat",
             "Dehradun",
             "Haridwar",
             "Nainital",
             "Pauri Garhwal",
             "Pithoragarh",
             "Rudraprayag",
             "Tehri Garhwal",
             "Udham Singh Nagar",
             "Uttarkashi"
          ]
       },
       {  
          "state":"Uttar Pradesh",
          "districts":[  
             "Agra",
             "Aligarh",
             "Allahabad",
             "Ambedkar Nagar",
             "Amethi (Chatrapati Sahuji Mahraj Nagar)",
             "Amroha (J.P. Nagar)",
             "Auraiya",
             "Azamgarh",
             "Baghpat",
             "Bahraich",
             "Ballia",
             "Balrampur",
             "Banda",
             "Barabanki",
             "Bareilly",
             "Basti",
             "Bhadohi",
             "Bijnor",
             "Budaun",
             "Bulandshahr",
             "Chandauli",
             "Chitrakoot",
             "Deoria",
             "Etah",
             "Etawah",
             "Faizabad",
             "Farrukhabad",
             "Fatehpur",
             "Firozabad",
             "Gautam Buddha Nagar",
             "Ghaziabad",
             "Ghazipur",
             "Gonda",
             "Gorakhpur",
             "Hamirpur",
             "Hapur (Panchsheel Nagar)",
             "Hardoi",
             "Hathras",
             "Jalaun",
             "Jaunpur",
             "Jhansi",
             "Kannauj",
             "Kanpur Dehat",
             "Kanpur Nagar",
             "Kanshiram Nagar (Kasganj)",
             "Kaushambi",
             "Kushinagar (Padrauna)",
             "Lakhimpur - Kheri",
             "Lalitpur",
             "Lucknow",
             "Maharajganj",
             "Mahoba",
             "Mainpuri",
             "Mathura",
             "Mau",
             "Meerut",
             "Mirzapur",
             "Moradabad",
             "Muzaffarnagar",
             "Pilibhit",
             "Pratapgarh",
             "RaeBareli",
             "Rampur",
             "Saharanpur",
             "Sambhal (Bhim Nagar)",
             "Sant Kabir Nagar",
             "Shahjahanpur",
             "Shamali (Prabuddh Nagar)",
             "Shravasti",
             "Siddharth Nagar",
             "Sitapur",
             "Sonbhadra",
             "Sultanpur",
             "Unnao",
             "Varanasi"
          ]
       },
       {  
          "state":"West Bengal",
          "districts":[  
             "Alipurduar",
             "Bankura",
             "Birbhum",
             "Burdwan (Bardhaman)",
             "Cooch Behar",
             "Dakshin Dinajpur (South Dinajpur)",
             "Darjeeling",
             "Hooghly",
             "Howrah",
             "Jalpaiguri",
             "Kalimpong",
             "Kolkata",
             "Malda",
             "Murshidabad",
             "Nadia",
             "North 24 Parganas",
             "Paschim Medinipur (West Medinipur)",
             "Purba Medinipur (East Medinipur)",
             "Purulia",
             "South 24 Parganas",
             "Uttar Dinajpur (North Dinajpur)"
          ]
       }
    ]
 }

export const servicesOffered = [
    {
        type: 1,
        name: "Studio",
        link: "photoStudio",
        pictureLink: "/assets/homepage/servicesGrid/photoStudio.jpeg",
        pictureLink2:"/assets/services/s11.png",
        subtypes: [
            "Wedding Photography",
            "Product Shoot",
            "Business Shoot",
            "Normal Photoshoot",
            "Model Photoshoot",
            "Wedding Photography",
            "Wedding Videography",
            "Event Videography",
            "Exhibition Videography",
            "Small Function Videography",
            "Ads Shoot",
            "Short Video Shoot",
        ],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Photographers and Videographers Near You",
        faq: [
            {
                title: "What is advance payment for an event?",
                body: "Advance payment is the process of paying a deposit or fee prior to the event taking place. It is often used to secure the services of event planners, venues, caterers and other suppliers. Advance payments are refundable under certain terms & conditions on kuickplan so make sure you read the terms and conditions of the service prior to making a payment.",
            },
            {
                title: "How do I make an advance payment with KuickPlan?",
                body: "To make an advance payment with KuickPlan, you will need to first select the service you wish to purchase. Once you have chosen the service, you will be directed to the payment page where you can select the payment method and enter the advance payment details.",
            },
            {
                title: "What payment methods are available for making an advance payment?",
                body: "KuickPlan accepts payments made with major Credit Cards, UPI, Razorpay, Internet Banking etc",
            },
            {
                title: "Is my advance payment refundable?",
                body: "Advance payments are refundable, within 24-48 If you cancel prior one week of the event no amount will be refunded, so make sure you read the terms and conditions of the service prior to making a payment.",
            },
        ],
        cardPictures: "/assets/services/photoStudio.webp",
        quotation: false,
    },
    {
        type: 1,
        name: "Makeup Artists",
        link: "beautyParlour",
        pictureLink: "/assets/homepage/servicesGrid/beautyParlour.jpeg",
        pictureLink2:"/assets/services/s3.png",
        subtypes: [],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Beauty Artists Near You",
        faq: [
            {
                title: "What is advance payment for an event?",
                body: "Advance payment is the process of paying a deposit or fee prior to the event taking place. It is often used to secure the services of event planners, venues, caterers and other suppliers. Advance payments are refundable under certain terms & conditions on kuickplan so make sure you read the terms and conditions of the service prior to making a payment.",
            },
            {
                title: "How do I make an advance payment with KuickPlan?",
                body: "To make an advance payment with KuickPlan, you will need to first select the service you wish to purchase. Once you have chosen the service, you will be directed to the payment page where you can select the payment method and enter the advance payment details.",
            },
            {
                title: "What payment methods are available for making an advance payment?",
                body: "KuickPlan accepts payments made with major Credit Cards, UPI, Razorpay, Internet Banking etc",
            },
            {
                title: "Is my advance payment refundable?",
                body: "Advance payments are refundable, within 24-48 If you cancel prior one week of the event no amount will be refunded, so make sure you read the terms and conditions of the service prior to making a payment.",
            },
        ],
        cardPictures: "/assets/services/beautyParlour.webp",
        quotation: false,
    },
    {
        type: 1,
        name: "Event Managers",
        link: "planning",
        pictureLink: "/assets/homepage/servicesGrid/planning.jpeg",
        pictureLink2:"/assets/services/s5.png",
        subtypes: [
            "Planning & Decor",
            "Small Event Manager",
            "Big Event Manager",
            "Event Buddies",
            "Event Bhandar",
            "Others",
        ],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Planners Near You",
        faq: [
            {
                title: "How do I request a Quotation?",
                body: "You can request a quotation for event services through Kuickplan's website. Simply provide us with the information regarding your event, such as the date and location, and the services you are looking for. We will then provide you with a list of suppliers who can provide those services and their associated costs.",
            },
            {
                title: "Are there any additional fees or taxes associated with Quotations?",
                body: "Yes, there may be additional fees or taxes associated with quotations. These will depend on the type of service being provided and the state or region in which the event is taking place. Kuickplan will provide you with an itemized list of all costs associated with the quotation.",
            },
            {
                title: "Can I make changes to my Quotation?",
                body: "Yes, you can make changes to your quotation. Simply contact us through the website and provide us with the details of the changes you would like to make.",
            },
        ],
        cardPictures: "/assets/services/planning.webp",
        quotation: true,
    },
    {
        type: 1,
        name: "Venues",
        link: "venue",
        pictureLink: "/assets/homepage/servicesGrid/venue.jpeg",
        pictureLink2:"/assets/services/s1.png",
        subtypes: [
            "Banquet Hall",
            "Lawn/Farmhouse",
            "Resorts",
            "Small Function Hall",
            "Destination Wedding",
            "Kalyan Mandapam",
            "4* & Above Hotel",
            "Theme Park",
            "Stadium",
            "Others",
        ],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Venues Near You",
        faq: [
            {
                title: "How do I request a Quotation?",
                body: "You can request a quotation for event services through Kuickplan's website. Simply provide us with the information regarding your event, such as the date and location, and the services you are looking for. We will then provide you with a list of suppliers who can provide those services and their associated costs.",
            },
            {
                title: "Are there any additional fees or taxes associated with Quotations?",
                body: "Yes, there may be additional fees or taxes associated with quotations. These will depend on the type of service being provided and the state or region in which the event is taking place. Kuickplan will provide you with an itemized list of all costs associated with the quotation.",
            },
            {
                title: "Can I make changes to my Quotation?",
                body: "Yes, you can make changes to your quotation. Simply contact us through the website and provide us with the details of the changes you would like to make.",
            },
        ],
        cardPictures: "/assets/services/venue.webp",
        quotation: true,
    },
    {
        type: 1,
        name: "Caterers",
        link: "food",
        pictureLink: "/assets/homepage/servicesGrid/food.jpeg",
        pictureLink2:"/assets/services/s2.png",
        subtypes: [
            "Catering Services",
            "Cake",
            "Chaat & Food Stalls",
            // "Bartenders",
            "Resturaunt Services",
            // "Home Catering",
            "Others"
        ],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Caterers Near You",
        faq: [
            {
                title: "How do I request a Quotation?",
                body: "You can request a quotation for event services through Kuickplan's website. Simply provide us with the information regarding your event, such as the date and location, and the services you are looking for. We will then provide you with a list of suppliers who can provide those services and their associated costs.",
            },
            {
                title: "Are there any additional fees or taxes associated with Quotations?",
                body: "Yes, there may be additional fees or taxes associated with quotations. These will depend on the type of service being provided and the state or region in which the event is taking place. Kuickplan will provide you with an itemized list of all costs associated with the quotation.",
            },
            {
                title: "Can I make changes to my Quotation?",
                body: "Yes, you can make changes to your quotation. Simply contact us through the website and provide us with the details of the changes you would like to make.",
            },
        ],
        cardPictures: "/assets/services/food.webp",
        quotation: true,
    },
    {
        type: 1,
        name: "Music & Dance",
        link: "musicDance",
        pictureLink: "/assets/homepage/servicesGrid/musicDance.jpeg",
        pictureLink2:"/assets/services/s4.png",
        subtypes: [
            "DJs",
            "Sangeet Choreographer",
            "Dance Choreographer",
            "Anchor",
            "Wedding Entertainment"
        ],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Music And Dance Artists Near You",
        faq: [
            {
                title: "What is advance payment for an event?",
                body: "Advance payment is the process of paying a deposit or fee prior to the event taking place. It is often used to secure the services of event planners, venues, caterers and other suppliers. Advance payments are refundable under certain terms & conditions on kuickplan so make sure you read the terms and conditions of the service prior to making a payment.",
            },
            {
                title: "How do I make an advance payment with KuickPlan?",
                body: "To make an advance payment with KuickPlan, you will need to first select the service you wish to purchase. Once you have chosen the service, you will be directed to the payment page where you can select the payment method and enter the advance payment details.",
            },
            {
                title: "What payment methods are available for making an advance payment?",
                body: "KuickPlan accepts payments made with major Credit Cards, UPI, Razorpay, Internet Banking etc",
            },
            {
                title: "Is my advance payment refundable?",
                body: "Advance payments are refundable, within 24-48 If you cancel prior one week of the event no amount will be refunded, so make sure you read the terms and conditions of the service prior to making a payment.",
            },
        ],
        cardPictures: "/assets/services/musicDance.webp",
        quotation: false,
    },
    {
        type: 1,
        name: "Mehendi",
        link: "mehendiArtist",
        pictureLink: "/assets/homepage/servicesGrid/mehendiArtist.jpeg",
        pictureLink2:"/assets/services/s7.png",
        subtypes: [],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Mehendi Artists Near You",
        faq: [
            {
                title: "What is advance payment for an event?",
                body: "Advance payment is the process of paying a deposit or fee prior to the event taking place. It is often used to secure the services of event planners, venues, caterers and other suppliers. Advance payments are refundable under certain terms & conditions on kuickplan so make sure you read the terms and conditions of the service prior to making a payment.",
            },
            {
                title: "How do I make an advance payment with KuickPlan?",
                body: "To make an advance payment with KuickPlan, you will need to first select the service you wish to purchase. Once you have chosen the service, you will be directed to the payment page where you can select the payment method and enter the advance payment details.",
            },
            {
                title: "What payment methods are available for making an advance payment?",
                body: "KuickPlan accepts payments made with major Credit Cards, UPI, Razorpay, Internet Banking etc",
            },
            {
                title: "Is my advance payment refundable?",
                body: "Advance payments are refundable, within 24-48 If you cancel prior one week of the event no amount will be refunded, so make sure you read the terms and conditions of the service prior to making a payment.",
            },
        ],
        cardPictures: "/assets/services/mehendiArtist.webp",
        quotation: false,
    },
    {
        type: 2,
        name: "Party Wears and Rentals",
        link: "rentalClothes",
        pictureLink: "/assets/homepage/servicesGrid/rentalClothes.jpeg",
        pictureLink2:"/assets/services/s6.png",
        subtypes: [
            "Bridal Wears",
            "Rental Costumes",
            "Women's Fashion",
            "Men's Fashion",
            "Kids Wear",
            "Phete",
            "Footwear",
            "Watch and Goggles",
            "Others",
        ],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Rental Bridal Wear Stores Near You",
        faq: [
            {
                title: "What is advance payment for an event?",
                body: "Advance payment is the process of paying a deposit or fee prior to the event taking place. It is often used to secure the services of event planners, venues, caterers and other suppliers. Advance payments are refundable under certain terms & conditions on kuickplan so make sure you read the terms and conditions of the service prior to making a payment.",
            },
            {
                title: "How do I make an advance payment with KuickPlan?",
                body: "To make an advance payment with KuickPlan, you will need to first select the service you wish to purchase. Once you have chosen the service, you will be directed to the payment page where you can select the payment method and enter the advance payment details.",
            },
            {
                title: "What payment methods are available for making an advance payment?",
                body: "KuickPlan accepts payments made with major Credit Cards, UPI, Razorpay, Internet Banking etc",
            },
            {
                title: "Is my advance payment refundable?",
                body: "Advance payments are refundable, within 24-48 If you cancel prior one week of the event no amount will be refunded, so make sure you read the terms and conditions of the service prior to making a payment.",
            },
        ],
        cardPictures: "/assets/services/rentalClothes.webp",
        quotation: false,
    },
    {
        type: 1,
        name: "Live Events",
        link: "live-events",
        pictureLink: "/assets/homepage/servicesGrid/liveEvents.jpeg",
        pictureLink2:"/assets/services/s8.png",
        subtypes: [],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Live Event Services Near You",
        faq: [
            {
                title: "How do I request a Quotation?",
                body: "You can request a quotation for event services through Kuickplan's website. Simply provide us with the information regarding your event, such as the date and location, and the services you are looking for. We will then provide you with a list of suppliers who can provide those services and their associated costs.",
            },
            {
                title: "Are there any additional fees or taxes associated with Quotations?",
                body: "Yes, there may be additional fees or taxes associated with quotations. These will depend on the type of service being provided and the state or region in which the event is taking place. Kuickplan will provide you with an itemized list of all costs associated with the quotation.",
            },
            {
                title: "Can I make changes to my Quotation?",
                body: "Yes, you can make changes to your quotation. Simply contact us through the website and provide us with the details of the changes you would like to make.",
            },
        ],
        cardPictures: "/assets/services/liveEvents.webp",
        quotation: true,
    },
    {
        type: 1,
        name: "Bouncers & Security",
        link: "bouncers",
        pictureLink: "/assets/homepage/servicesGrid/bouncers.jpeg",
        pictureLink2:"/assets/services/s12.png",
        subtypes: [],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Security Service Providers Near You",
        faq: [
            {
                title: "What is advance payment for an event?",
                body: "Advance payment is the process of paying a deposit or fee prior to the event taking place. It is often used to secure the services of event planners, venues, caterers and other suppliers. Advance payments are refundable under certain terms & conditions on kuickplan so make sure you read the terms and conditions of the service prior to making a payment.",
            },
            {
                title: "How do I make an advance payment with KuickPlan?",
                body: "To make an advance payment with KuickPlan, you will need to first select the service you wish to purchase. Once you have chosen the service, you will be directed to the payment page where you can select the payment method and enter the advance payment details.",
            },
            {
                title: "What payment methods are available for making an advance payment?",
                body: "KuickPlan accepts payments made with major Credit Cards, UPI, Razorpay, Internet Banking etc",
            },
            {
                title: "Is my advance payment refundable?",
                body: "Advance payments are refundable, within 24-48 If you cancel prior one week of the event no amount will be refunded, so make sure you read the terms and conditions of the service prior to making a payment.",
            },
        ],
        cardPictures: "/assets/services/bouncers.webp",
        quotation: false,
    },
    {
        type: 1,
        name: "Transportation",
        link: "transportVehicle",
        pictureLink: "/assets/homepage/servicesGrid/transportVehicle.jpeg",
        pictureLink2:"/assets/services/s9.png",
        subtypes: [
            "Air Tickets",
            "Bus & Travels",
            "Mini-Bus",
            "Luxury Cars",
            "Bikes",
            "Train Tickets",
            "Others",
        ],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Transport Service Providers Near You",
        faq: [
            {
                title: "How do I request a Quotation?",
                body: "You can request a quotation for event services through Kuickplan's website. Simply provide us with the information regarding your event, such as the date and location, and the services you are looking for. We will then provide you with a list of suppliers who can provide those services and their associated costs.",
            },
            {
                title: "Are there any additional fees or taxes associated with Quotations?",
                body: "Yes, there may be additional fees or taxes associated with quotations. These will depend on the type of service being provided and the state or region in which the event is taking place. Kuickplan will provide you with an itemized list of all costs associated with the quotation.",
            },
            {
                title: "Can I make changes to my Quotation?",
                body: "Yes, you can make changes to your quotation. Simply contact us through the website and provide us with the details of the changes you would like to make.",
            },
        ],
        cardPictures: "/assets/services/transportVehicle.webp",
        quotation: true,
    },
    {
        type: 1,
        name: "Invites & Gifts",
        link: "invitesGifts",
        pictureLink: "/assets/homepage/servicesGrid/invites.jpeg",
        pictureLink2:"/assets/services/s10.png",
        subtypes: [
            "Invitation Cards Printing",
            "Digital Invitation",
            "Gifts",
            "Roses & Bouquet",
            "Chocolate",
            "Teddy",
            "Movers & Packers",
            "Others"
        ],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Gifts and Invites Services Near You",
        faq: [
            {
                title: "What is advance payment for an event?",
                body: "Advance payment is the process of paying a deposit or fee prior to the event taking place. It is often used to secure the services of event planners, venues, caterers and other suppliers. Advance payments are refundable under certain terms & conditions on kuickplan so make sure you read the terms and conditions of the service prior to making a payment.",
            },
            {
                title: "How do I make an advance payment with KuickPlan?",
                body: "To make an advance payment with KuickPlan, you will need to first select the service you wish to purchase. Once you have chosen the service, you will be directed to the payment page where you can select the payment method and enter the advance payment details.",
            },
            {
                title: "What payment methods are available for making an advance payment?",
                body: "KuickPlan accepts payments made with major Credit Cards, UPI, Razorpay, Internet Banking etc",
            },
            {
                title: "Is my advance payment refundable?",
                body: "Advance payments are refundable, within 24-48 If you cancel prior one week of the event no amount will be refunded, so make sure you read the terms and conditions of the service prior to making a payment.",
            },
        ],
        cardPictures: "/assets/services/gifts.webp",
        quotation: false,
    },
    {
        type: 2,
        name: "Explore the Unexplored",
        link: "explore",
        pictureLink: "/assets/homepage/servicesGrid/explore.jpg",
        pictureLink2:"/assets/services/s13.png",
        subtypes: [
            
        ],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum lorem tortor, eu ultricies justo malesuada eu. In porttitor mauris vitae augue sollicitudin lacinia. Phasellus dignissim eros sed lorem sollicitudin, et sagittis est tempor. Cras aliquam diam quis neque consequat fringilla. Sed vel felis mollis velit semper lobortis. Suspendisse faucibus elit id leo aliquam, sed vehicula quam consectetur. Praesent iaculis elit a ipsum blandit lobortis. Ut et metus sed nisi convallis lacinia. Aenean et dolor ac orci suscipit dapibus. Nullam sit amet nisl urna. Phasellus nec imperdiet ex. Vestibulum in ex ex. Quisque in sagittis velit. Nullam eleifend dictum enim non aliquam.
        Mauris hendrerit sagittis sodales. Morbi at vulputate nunc. Aenean maximus sagittis massa, tincidunt tincidunt mi auctor eu. Vestibulum pharetra pharetra convallis. Quisque a porttitor lectus, vitae cursus lectus. Vestibulum laoreet tincidunt erat in interdum. Sed lacinia nunc ex, a euismod ligula euismod ut. Phasellus eu consectetur tellus. Ut varius, dui varius aliquet fringilla, ligula tellus ornare nibh, at ullamcorper dui ligula in dolor. In congue leo vel varius pellentesque. Aenean ante urna, tempus eu pharetra vitae, tincidunt a risus.
        `,
        title: "Explore Amazing Events and Services Near You",
        faq: [
            {
                title: "What is advance payment for an event?",
                body: "Advance payment is the process of paying a deposit or fee prior to the event taking place. It is often used to secure the services of event planners, venues, caterers and other suppliers. Advance payments are refundable under certain terms & conditions on kuickplan so make sure you read the terms and conditions of the service prior to making a payment.",
            },
            {
                title: "How do I make an advance payment with KuickPlan?",
                body: "To make an advance payment with KuickPlan, you will need to first select the service you wish to purchase. Once you have chosen the service, you will be directed to the payment page where you can select the payment method and enter the advance payment details.",
            },
            {
                title: "What payment methods are available for making an advance payment?",
                body: "KuickPlan accepts payments made with major Credit Cards, UPI, Razorpay, Internet Banking etc",
            },
            {
                title: "Is my advance payment refundable?",
                body: "Advance payments are refundable, within 24-48 If you cancel prior one week of the event no amount will be refunded, so make sure you read the terms and conditions of the service prior to making a payment.",
            },
        ],
        cardPictures: "/assets/services/explore.webp",
        quotation: false,
    },
]

export const getSubtypesOfService = (service:any) => {
    const theService:any = servicesOffered.find((s)=>{
        if(s.link == service){
            return true;
        }
    });
    // const theOptions = [];
    // for(let i=0; i<theService.subtypes.length; i++){
    //     theOptions.push({
    //         name: theService.subtypes,
    //         id: i+1
    //     })
    // }
    // return theOptions;
    return theService.subtypes;
}

export const getAllServices = () => {
    const requiredServices:string[] = []
    servicesOffered.map((e, i)=> {
        requiredServices.push(e.name)
    })
    return requiredServices;
}

export const statesAndUTs = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
]

export const locations = [
    {
        name: "Ahmedabad",
        lat: "23.0225",
        lng: "72.5714"
    },
    {
        name: "Bangalore",
        lat: "12.9716",
        lng: "77.5946"
    },
    {
        name: "Chennai",
        lat: "13.0827",
        lng: "80.2707"
    },
    {
        name: "Delhi",
        lat: "28.7041",
        lng: "77.1025"
    },
    {
        name: "Hyderabad",
        lat: "17.3850",
        lng: "78.4867"
    },
    {
        name: "Kolkata",
        lat: "22.5726",
        lng: "88.3639"
    },
    {
        name: "Mumbai",
        lat: "19.0760",
        lng: "72.8777"
    },
    {
        name: "Pune",
        lat: "18.5204",
        lng: "73.8567"
    },
]

export const getShopServiceInfo = (shopData:any) => {
    const serviceType = shopData['serviceType'];
    for(let i=0; i<servicesOffered.length; i++){
        if(serviceType == servicesOffered[i].link){
            return servicesOffered[i];
        }
    }
    return servicesOffered[0];
}



export const isUserLoggedIn = () => {
    try{
        let token = localStorage.getItem('token');
        if(token == undefined || "" || null){
            return false;
        }
        token = jwtDecode(token);
        return true;
    }
    catch(e){
        return false;
    }
}

export const getLoggedInRole = () => {
    try{
        let token:any = localStorage.getItem('token');
        if(token == undefined || "" || null){
            return "";
        }
        token = jwtDecode(token) || {};
        return token['role'] || "";
    }
    catch(e){
        return "";
    }
}

export const logOutUser = () => {
    localStorage.setItem('token', '');
    cookies.set('token', '');
}

export const getLoggedInUserData = () => {
    try{
        let token:any = localStorage.getItem('token');
        if(token == undefined || "" || null){
            return {};
        }
        token = jwtDecode(token) || {};
        console.log(token,"TTTTTTTTTTTTTTTTTTTTTTTTPOOOOOOOOOOOOOOOOOOOOOOKKKKKKKKKKKKKKKKKKKKKKKKKKKKEEEEEEEEEEEEEEEEEEEEEEENNNNNNNNNN")
        return token;
    }
    catch(e){
        return {};
    }
}

export const getServiceNameFromLink = (serviceType:string) => {
    for(let i=0; i<servicesOffered.length; i++){
        if(servicesOffered[i].link == serviceType){
            return servicesOffered[i].name
        }
    }
    return servicesOffered[0].name
}

const fileUpload = async (myFile: File) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(myFile, options);
    const file = new File([compressedFile], 'file.png');
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(
      'http://127.0.0.1:5000/api/file-upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data['link'];
};  


const fileUploadHome = async (myFile: File) => {
    const formData = new FormData();
    formData.append('file', myFile);
  console.warn(formData,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    try {
      const response = await axios.post(
        'http://localhost:5000/api/file-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      return response.data['link'];
    } catch (error) {
      // Handle error
      console.error('File upload failed:', error);
      throw error;
    }
  };
  

export const getUploadedImageLink = async (file: File) => {
    try {
        const link = await fileUploadHome(file);
        return link;
    } catch (error) {
        return '';
    }
};
export const getUploadedImageLinkHome = async (file: File) => {
    try {
        const link = await fileUpload(file);
        return link;
    } catch (error) {
        return '';
    }
};

export const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
}

export const dateObjectArrayToStringArray = (lst:any) => {
    let requiredArr = [];
    for(let i=0; i<lst.length; i++){
        requiredArr.push(lst[i].toString());
    }
    return requiredArr;
}

export const stringArrayToDateObjectArray = (lst:string[]) => {
    let requiredArr = [];
    for(let i=0; i<lst.length; i++){
        const newDate = new Date(lst[i]);
        requiredArr.push(newDate);
    }
    return requiredArr;
}

export const datesAreOnSameDay = (first:Date, second:Date) =>
first.getFullYear() === second.getFullYear() &&
first.getMonth() === second.getMonth() &&
first.getDate() === second.getDate();

export const checkIfDateStringIncludesADate = (lst:Date[], dt:any) => {
    const date = new Date(dt);
    for(let i=0; i<lst.length; i++){
        if(datesAreOnSameDay(new Date(lst[i]), date)){
            return true;
        }
    }
    return false;
}

export const dateStringToProperDate = (date:string) => {
    const dt = new Date(date);
    let dtStr = "";
    dtStr += dt.getDate().toString();
    dtStr += "/";
    dtStr += (dt.getMonth()+1).toString();
    dtStr += "/";
    dtStr += dt.getFullYear().toString();
    return dtStr;
}

export const adminLinks = [
    {
      name: "Users",
      link: "/admin/users"
    },
    {
      name: "Stores",
      link: "/admin/stores"
    },
    {
      name: "Website Messages",
      link: "/admin/website-messages"
    },
    {
      name: "Request Quotations",
      link: "/admin/quotation-requests"
    },
    {
      name: "Advanced Bookings",
      link: "/admin/advanced-bookings"
    },
    {
      name: "Newsletter Subscriptions",
      link: "/admin/newsletters"
    },
    {
      name: "Page Views",
      link: "/admin/page-views"
    },
    {
        name: "Create Quotes",
        link: "/admin/create-quotes"
    },
    {
        name: "Data",
        link: "/admin/data"
    },

    {
        name: "Edit Home Page",
        link: "/admin/EditHomePage"
    },

  ];

  export const EditHomePage=[
    {
        name: "Bidding Caraousel 1",
        link: "/admin/EditHomePage/Bidding1"
      },

    {
        name: "kuick-Plans Advertisment",
        link: "/admin/EditHomePage/Setadd"
    },

    {
        name: "Bidding Caraousel 2",
        link: "/admin/EditHomePage/Bidding2"
    },

    {
        name: "promocode",
        link: "/admin/EditHomePage/Promocode"
    },

  ]

export const homepageFAQ = [
    {
        title: "What services does Kuickplan offer for event planning?",
        body: "Kuickplan offers a wide range of services for event planning, including venue search, vendor booking, budget management, transportation and ticket booking, invites and gifts, and more.",
    },
    {
        title: "Can Kuickplan help me find a venue for my events?",
        body: "Yes, Kuickplan offers a comprehensive directory of venues for people to choose from, including banquet halls, hotels, and outdoor spaces.",
    },
    {
        title: "Can I book vendors for my events through Kuickplan?",
        body: "Yes, our platform allows people to browse and book vendors for all their wedding needs, including photographers, videographers, event managers, decorators, catering and food, sangeet and DJ's, bouncers, party wear and rentals, mehendi, and more.",
    },
    {
        title: "Does Kuickplan offer budget management tools for event planning?",
        body: "Yes, we provide tools to help people manage their budget and track their expenses, ensuring they stay on track and within their means.",
    },
    {
        title: "Can Kuickplan assist with transportation and ticket booking for my events?",
        body: "Yes, we offer assistance with booking transportation for the wedding party and guests, as well as help with purchasing tickets for any events or activities.",
    },
    {
        title: "Does Kuickplan provide options for event invitations and gift registry?",
        body: "Yes, we provide a range of options for wedding invitations and gift registry, making it easy for people to send out invitations and receive gifts from their loved ones.",
    },
    {
        title: "How does Kuickplan make the event planning process easy and stress-free?",
        body: "Kuickplan streamlines the wedding planning process and takes the stress out of coordinating all the details, allowing people to focus on enjoying their special day.",
    },
    {
        title: "Can Kuickplan be used for planning other types of events, not just weddings?",
        body: "Yes, Kuickplan can be used for planning other types of events, functions, birthday parties, corporate parties and many more other than weddings.",
    },
    {
        title: "How does Kuickplan help me coordinate all the details of my events?",
        body: "Kuickplan provides a comprehensive platform that allows you to access everything you need for your events in one place, from vendors to budget management and transportation.",
    },
    {
        title: "Can I get a free trial of Kuickplan's services?",
        body: "We do not have a free trial but we have a free consultation for our services, and you can contact us for more details.",
    },
    {
        title: "How can I get discounts on Kuickplan's services?",
        body: "We offer discounts and promotions on our services, you can contact us for more information.",
    },
    {
        title: "How does Kuickplan's platform compare to other event planning services?",
        body: "Kuickplan offers a wide range of services and a user-friendly platform that streamlines the event planning process. We strive to be the best in the industry and provide a high-quality service.",
    },
    {
        title: "Can I see examples of events that have been planned using Kuickplan?",
        body: "We do not share any personal information of our clients, but we can provide you with a list of vendors that we have worked with & you can refer our gallery for few original events.",
    },
    {
        title: "Is Kuickplan available in my area?",
        body: "Kuickplan is available online and can be used by anyone planning events anywhere.",
    },
    {
        title: "Can I customize my event planning package with Kuickplan?",
        body: "Yes, we offer customized event planning packages to suit your specific needs and preferences.",
    },
    {
        title: "How does Kuickplan ensure that vendors are reliable and professional?",
        body: "We work with only the best vendors in the industry and check their references, portfolios, and reviews before we include them in our platform.",
    },
    {
        title: "Can Kuickplan help me plan a destination wedding?",
        body: "Yes, Kuickplan can help you plan a destination wedding. Our platform offers a comprehensive directory of venues, including destination venues, and allows you to book vendors for all your wedding needs, including photographers, videographers, event managers, decorators, catering and food, sangeet and DJ's, bouncers, party wear and rentals, mehendi artists, and more.",
    },
    {
        title: "How does Kuickplan handle payments and bookings for vendors and venues?",
        body: "Kuickplan handles payments and bookings for vendors and venues through our platform. People can browse and book vendors and venues directly on our platform, and payments can be made securely through our system.",
    },
    {
        title: "How does Kuickplan handle last-minute changes or cancellations?",
        body: "Kuickplan has a dedicated team that handles last-minute changes or cancellations. We understand that things can change, and we are prepared to handle any unexpected situations that may arise.",
    },
    {
        title: "Are there any additional fees for using Kuickplan's services?",
        body: "There are no additional fees for using Kuickplan's services. The only fees you will be responsible for are the fees for the vendors and venues you book through our platform.",
    },
    {
        title: "What types of vendors can I book through Kuickplan?",
        body: "You can book a wide range of vendors through Kuickplan, including photographers, videographers, event managers, decorators, catering and food, sangeet and DJ's, bouncers, party wear and rentals, mehendi artists, and more.",
    },
    {
        title: "Does Kuickplan offer transportation and ticket booking services?",
        body: "Yes, Kuickplan offers assistance with booking transportation for the wedding party and guests, as well as help with purchasing tickets for any events or activities.",
    },
    {
        title: "Does Kuickplan offer options for event invitations and gift registry?",
        body: "Yes, Kuickplan provides a range of options for invitations and gift registry, making it easy for people to send out invitations and receive gifts from their loved ones.",
    },
    {
        title: "Do we need to pay a full amount at once?",
        body: "No, you just have to pay a small booking amount in advance.If you want you can pay full amount as well.",
    },
    {
        title: "Can we negotiate the prices directly with vendor?",
        body: "Yes, after paying the booking amount, you will get the details of vendor where you can negotiate with vendor directly.",
    },
    {
        title: "What is your refund policy?",
        body: "We care for our customers. If any issue occurs from our side or from our system, we have a full refund policy within 3-5 working days.",
    },
    {
        title: "What if vendor cancels the event at end moment?",
        body: "We care for our customers. We will arrange alternate vendor of your respective service within the same locality and same budget.",
    },
    {
        title: "What are Newsletters? Why should I subscribe to them?",
        body: `Subscribing to newsletters helps you fully utilize our services to:
        •	Stay updated on trends and newly added categories.
        •	Enjoy special offers and invitations.`,
    },
    {
        title: "Can I book only bouncers from your website?",
        body: "Yes, you can select any service from available categories.",
    },
    {
        title: "As a vendor what if my personal bookings and kuickplan bookings overlap on same date?",
        body: "Being registered as a vendor, you have your personal calendar on your account where you can mark dates of your unavailability.",
    },    
]

export const budgets = [
    {
      name: "10,000 - 49,999",
      value: "10000-49999"
    },
    {
      name: "50,000 - 99,999",
      value: "50000-99999"
    },
    {
      name: "100,000 - 499,999",
      value: "100000-499999"
    },
    {
      name: "500,000 - 999,999",
      value: "500000-999999"
    },
    {
      name: "Premium",
      value: "1000000-10000000"
    },
  ]
  
export const people = [
    {
        name: "2 - 25",
        value: "2-25"
    },
    {
        name: "26 - 50",
        value: "26-50"
    },
    {
        name: "51 - 100",
        value: "51-100"
    },
    {
        name: "101 - 500",
        value: "101-500"
    },
    {
        name: "501 - 1,000",
        value: "501-1000"
    },
    {
        name: "1,000 - 10,000",
        value: "1000-10000"
    },
]

export const getServiceLinkArrayFromServiceNameArray = (services:any[]) => {
    const theObject:any = {}
    servicesOffered.map((e, i)=>{
        theObject[e.name] = e.link;
    });
    const requiredServices = [];
    for(let i=0; i<services.length; i++){
        requiredServices.push(theObject[services[i]]);
    }
    return requiredServices;
}

export const getServiceNameArrayFromServiceLinkArray = (services:any[]) => {
    const theObject:any = {}
    servicesOffered.map((e, i)=>{
        theObject[e.link] = e.name;
    });
    const requiredServices = [];
    for(let i=0; i<services.length; i++){
        requiredServices.push(theObject[services[i]]);
    }
    return requiredServices;
}

export const isAllObjectEmpty = (obj:any) => {
    let theKeys = Object.keys(obj)
    for(let i=0; i<theKeys.length; i++){
        if(obj[theKeys[i]].length > 0){
            return false;
        }
    }
    return true;
}
