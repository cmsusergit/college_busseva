import fetch from 'node-fetch'
const url1='http://127.0.0.1:4040/api/collections/bus_point/records'

const dt=[
    {
        "name": "AAKANSHA DUPLEX",
        "alias": "AA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "ABHILASHA CHAR RASTA",
        "alias": "AB",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "AIRPORT CIRCLE",
        "alias": "AI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "AJIT NAGAR",
        "alias": "AJ",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "AKOTA GARDEN",
        "alias": "AK",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "AKOTA STADIUM",
        "alias": "AK",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "AKSHAR CHOWK",
        "alias": "AK",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "AMBALAL PARK",
        "alias": "AM",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "AMIN PARTY PLOT",
        "alias": "AM",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "AMIT NAGAR",
        "alias": "AM",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "ANAND SAGAR",
        "alias": "AN",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "AYURVEDIC HOSPITAL",
        "alias": "AY",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "BANSAL STORE",
        "alias": "BA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "BARODA DAIRY",
        "alias": "BA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "BEENA NAGAR",
        "alias": "BE",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "BRIGHT SCHOOL",
        "alias": "BR",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "CASH AND CARRY",
        "alias": "CA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "CHAKLI CIRCLE",
        "alias": "CH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "CHANKYA PURI",
        "alias": "CH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "CHARBHUJA COMPLEX",
        "alias": "CH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "CHHANI JAKAT NAKA",
        "alias": "CH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "DARBAR CHOWKDI",
        "alias": "DA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "DEEP CHAMBERS",
        "alias": "DE",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "DELUX",
        "alias": "DE",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "DHAVAL NURSING",
        "alias": "DH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "D-MART",
        "alias": "D-",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "DUMAD CHOWKDI",
        "alias": "DU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "ELLORA PARK",
        "alias": "EL",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "EME CIRCLE",
        "alias": "EM",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "FATEHGUNJ",
        "alias": "FA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "FATEHGUNJ CIRCLE",
        "alias": "FA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "GANGA SAGAR",
        "alias": "GA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "GANGOTRI",
        "alias": "GA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "GAYATRINAGAR",
        "alias": "GA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "GENDA CIRCLE",
        "alias": "GE",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "GIDC",
        "alias": "GI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "GORWA ITI",
        "alias": "GO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "GORWA WORKSHOP",
        "alias": "GO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "GOYA ESTATE",
        "alias": "GO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "GSFC NAGAR",
        "alias": "GS",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "GURUKUL",
        "alias": "GU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "HANUMAN MANDIR",
        "alias": "HA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "HARINAGAR CHAR RASTA",
        "alias": "HA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "HARNI CBSC BRIGHT SCHOOL",
        "alias": "HA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "HAVELI",
        "alias": "HA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "HAVMORE",
        "alias": "HA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "INDRA COMPLEX",
        "alias": "IN",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "IPCL/REFINARY",
        "alias": "IP",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "ISCKON TEMPLE",
        "alias": "IS",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "ISCON HEIGHT",
        "alias": "IS",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "JAIN DERASAR",
        "alias": "JA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "JAL JYOT",
        "alias": "JA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "JAYRATHNA BUILDING",
        "alias": "JA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "JHANSI KI RANI CIRCLE (PARLE POINT)",
        "alias": "JH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "JIVAN BHARTI SCHOOL",
        "alias": "JI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "JYOTI CIRCLE",
        "alias": "JY",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KABIR COMPLEX",
        "alias": "KA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KALADARSHAN",
        "alias": "KA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KALAGHODA",
        "alias": "KA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KALALI CROSSING",
        "alias": "KA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KALPATARU",
        "alias": "KA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KAMLA NAGAR (AJWA CHOWKDI)",
        "alias": "KA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KARELIBAG WATER TANK",
        "alias": "KA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KASHI VISHWANATH MANDIR",
        "alias": "KA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KEYA MOTORS",
        "alias": "KE",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KHODIYAR NAGAR",
        "alias": "KH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KIRTI STAMBH",
        "alias": "KI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KISHAN VADI",
        "alias": "KI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KOYLI",
        "alias": "KO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KOYLI PETROL PUMP",
        "alias": "KO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "KRISHNA PARK",
        "alias": "KR",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "L&T CIRCLE",
        "alias": "L&",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "LAD BHAVAN",
        "alias": "LA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "LALBAG",
        "alias": "LA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "LALBAG BRDIGE",
        "alias": "LA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "LAXMI PURA CIRCLE",
        "alias": "LA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "LMP MAKARPURA",
        "alias": "LM",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "M B HOSTEL",
        "alias": "M",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MAHARANI NURSING",
        "alias": "MA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MAKARPURA",
        "alias": "MA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MAHAVIR HALL",
        "alias": "MA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MAHESH COMPLEX",
        "alias": "MA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MALHAR POINT",
        "alias": "MA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MANEJA",
        "alias": "MA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MANEK PARK",
        "alias": "MA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MANISHA CHOKDI",
        "alias": "MA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MANJALPUR",
        "alias": "MA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MANJALPUR NAKA",
        "alias": "MA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MEERA PARK",
        "alias": "ME",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MEGHDHANUSH",
        "alias": "ME",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MIRAJ TOWER",
        "alias": "MI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MOTIBAG",
        "alias": "MO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MOTINAGAR",
        "alias": "MO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MUJ MAHUDA",
        "alias": "MU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MUKTANAND",
        "alias": "MU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MUNJ MAHUDA",
        "alias": "MU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "NANDESARI",
        "alias": "NA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "NARHARI HOSPITAL",
        "alias": "NA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "NATUBHAI CENTER",
        "alias": "NA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "NAVAPURA POLICE STATION",
        "alias": "NA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "NOVINO",
        "alias": "NO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "ONGC",
        "alias": "ON",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "P&T COLONY",
        "alias": "P&",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PANCH RATNA",
        "alias": "PA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PANCHSHIL",
        "alias": "PA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PANCHVATI",
        "alias": "PA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PARIVAR CHAR RASTA",
        "alias": "PA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PAVAN DHAM",
        "alias": "PA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PETROL PUMP",
        "alias": "PE",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "POLO GROUND",
        "alias": "PO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PRABHAT",
        "alias": "PR",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PRAMUKH PRASAD",
        "alias": "PR",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PRATHAM COMPLEX",
        "alias": "PR",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PUNAM COMPLEX",
        "alias": "PU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PUSHPAK TOWNSHIP",
        "alias": "PU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "RAILWAY CROSSING",
        "alias": "RA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "RAJESH TOWER",
        "alias": "RA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "RAJMAHAL ROAD",
        "alias": "RA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "RAMA KAKA DERI",
        "alias": "RA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "RAMESH PATEL ESTATE",
        "alias": "RA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "RANESHWAR MAHADEV",
        "alias": "RA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "RANESHWAR TEMPLE",
        "alias": "RA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "RELIANCE",
        "alias": "RE",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "RELIANCE CIRCLE",
        "alias": "RE",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SAFFRON TOWER",
        "alias": "SA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SAHYOG",
        "alias": "SA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SAI CHOWKDI",
        "alias": "SA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SAMA GARDEN",
        "alias": "SA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SAMA SAVLI ROAD",
        "alias": "SA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SAMTA",
        "alias": "SA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SANGAM",
        "alias": "SA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SARDAR ESTATE",
        "alias": "SA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SARSVATI COMPLEX",
        "alias": "SA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SAYAJI BUS STOP",
        "alias": "SA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SEVEN SEAS MALL",
        "alias": "SE",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SHARAD NAGAR",
        "alias": "SH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SHIV VATIKA",
        "alias": "SH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SOMA TALAV",
        "alias": "SO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SURYA NAGAR",
        "alias": "SU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SUSSEN",
        "alias": "SU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SVIT",
        "alias": "SV",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SWAMINARAYAN NAGAR",
        "alias": "SW",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SWAMINARAYAN TEMPLE",
        "alias": "SW",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SWATI SOCIETY",
        "alias": "SW",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TAKSH COMPLEX",
        "alias": "TA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TAPAN",
        "alias": "TA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MORE FATAK",
        "alias": "MO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TARSALI MARKET",
        "alias": "TA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TARSALI SAI TEMPLE",
        "alias": "TA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TIME CIRCLE",
        "alias": "TI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TORAL",
        "alias": "TO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TUBE COMPANY",
        "alias": "TU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TULSIDHAM",
        "alias": "TU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TULSIDHAM CHAR RASTA",
        "alias": "TU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "UDIPI",
        "alias": "UD",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "UMA CHAR RASTA",
        "alias": "UM",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "UNDERA",
        "alias": "UN",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "URMI CHAR RASTA",
        "alias": "UR",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "VADSAR BRIDGE",
        "alias": "VA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "VISHVAMITRI ROAD",
        "alias": "VI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "VOLTAMP",
        "alias": "VO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "VRUNDAVAN",
        "alias": "VR",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "YASH COMPLEX",
        "alias": "YA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "YUG NIKETAN",
        "alias": "YU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "ZAVAR NAGAR",
        "alias": "ZA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TOP",
        "alias": "TO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SBI ELLORA PARK",
        "alias": "SB",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TRIDENT",
        "alias": "TR",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MILITARY BOYS HOSTEL",
        "alias": "MI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "VUDA CIRCLE",
        "alias": "VU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "GIPCL CIRCLE",
        "alias": "GI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "VISAT PETROL PUMP",
        "alias": "VI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "RTO",
        "alias": "RT",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "AKHBHAR NAGAR",
        "alias": "AK",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "NARANPURA",
        "alias": "NA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "TORRENT",
        "alias": "TO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "HELMET CROSS ROAD",
        "alias": "HE",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "IIM",
        "alias": "II",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "HIMATLAL PARK",
        "alias": "HI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SHIVRANJANI",
        "alias": "SH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SHYAMAL CROSS ROAD",
        "alias": "SH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MANEKBAG HALL",
        "alias": "MA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "DHARNIDHAR",
        "alias": "DH",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "ANJALI CROSS ROAD",
        "alias": "AN",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "APMC",
        "alias": "AP",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "VISHALA",
        "alias": "VI",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "NAROL",
        "alias": "NA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "ISANPUR",
        "alias": "IS",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "CADILA",
        "alias": "CA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "JASHODANAGAR",
        "alias": "JA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "CTM EXPRESSWAY",
        "alias": "CT",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "ANAND EXIT",
        "alias": "AN",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "SAMARKHA CROSSING ON NH8",
        "alias": "SA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "VASAD ST",
        "alias": "VA",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "COLLEGE ROAD",
        "alias": "CO",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "MUKESH INDUSTRIES",
        "alias": "MU",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "Bharat Petrol Pump",
        "alias": "Bh",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "ZYDEX",
        "alias": "ZY",
        "city": "p23kajy3iinh5ux"
    },
    {
        "name": "PANCHMUKHI HANUMAN(VASANA RD)",
        "alias": "PA",
        "city": "p23kajy3iinh5ux"
    }
    ]
    for (let indx = 0; indx < dt.length; indx++) {
        const tt=JSON.stringify(dt[indx])
        console.log(tt)
        fetch(url1,{method:'POST',headers:{
            'Content-type':'application/json'
        },
        body:tt}).then((temp1)=>{
            console.log(temp1)
        }
        ).catch(error=>{
            console.log(error.message)

        
        })
    }

    