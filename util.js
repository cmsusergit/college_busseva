import fetch from 'node-fetch'
const url1='http://127.0.0.1:8090/api/collections/bus_point/records'

const dt=[
    {
        "name": "AAKANSHA DUPLEX",
        "alias": "AA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "ABHILASHA CHAR RASTA",
        "alias": "AB",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "AIRPORT CIRCLE",
        "alias": "AI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "AJIT NAGAR",
        "alias": "AJ",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "AKOTA GARDEN",
        "alias": "AK",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "AKOTA STADIUM",
        "alias": "AK",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "AKSHAR CHOWK",
        "alias": "AK",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "AMBALAL PARK",
        "alias": "AM",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "AMIN PARTY PLOT",
        "alias": "AM",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "AMIT NAGAR",
        "alias": "AM",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "ANAND SAGAR",
        "alias": "AN",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "AYURVEDIC HOSPITAL",
        "alias": "AY",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "BANSAL STORE",
        "alias": "BA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "BARODA DAIRY",
        "alias": "BA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "BEENA NAGAR",
        "alias": "BE",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "BRIGHT SCHOOL",
        "alias": "BR",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "CASH AND CARRY",
        "alias": "CA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "CHAKLI CIRCLE",
        "alias": "CH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "CHANKYA PURI",
        "alias": "CH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "CHARBHUJA COMPLEX",
        "alias": "CH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "CHHANI JAKAT NAKA",
        "alias": "CH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "DARBAR CHOWKDI",
        "alias": "DA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "DEEP CHAMBERS",
        "alias": "DE",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "DELUX",
        "alias": "DE",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "DHAVAL NURSING",
        "alias": "DH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "D-MART",
        "alias": "D-",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "DUMAD CHOWKDI",
        "alias": "DU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "ELLORA PARK",
        "alias": "EL",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "EME CIRCLE",
        "alias": "EM",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "FATEHGUNJ",
        "alias": "FA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "FATEHGUNJ CIRCLE",
        "alias": "FA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "GANGA SAGAR",
        "alias": "GA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "GANGOTRI",
        "alias": "GA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "GAYATRINAGAR",
        "alias": "GA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "GENDA CIRCLE",
        "alias": "GE",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "GIDC",
        "alias": "GI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "GORWA ITI",
        "alias": "GO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "GORWA WORKSHOP",
        "alias": "GO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "GOYA ESTATE",
        "alias": "GO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "GSFC NAGAR",
        "alias": "GS",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "GURUKUL",
        "alias": "GU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "HANUMAN MANDIR",
        "alias": "HA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "HARINAGAR CHAR RASTA",
        "alias": "HA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "HARNI CBSC BRIGHT SCHOOL",
        "alias": "HA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "HAVELI",
        "alias": "HA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "HAVMORE",
        "alias": "HA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "INDRA COMPLEX",
        "alias": "IN",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "IPCL/REFINARY",
        "alias": "IP",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "ISCKON TEMPLE",
        "alias": "IS",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "ISCON HEIGHT",
        "alias": "IS",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "JAIN DERASAR",
        "alias": "JA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "JAL JYOT",
        "alias": "JA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "JAYRATHNA BUILDING",
        "alias": "JA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "JHANSI KI RANI CIRCLE (PARLE POINT)",
        "alias": "JH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "JIVAN BHARTI SCHOOL",
        "alias": "JI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "JYOTI CIRCLE",
        "alias": "JY",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KABIR COMPLEX",
        "alias": "KA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KALADARSHAN",
        "alias": "KA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KALAGHODA",
        "alias": "KA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KALALI CROSSING",
        "alias": "KA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KALPATARU",
        "alias": "KA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KAMLA NAGAR (AJWA CHOWKDI)",
        "alias": "KA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KARELIBAG WATER TANK",
        "alias": "KA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KASHI VISHWANATH MANDIR",
        "alias": "KA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KEYA MOTORS",
        "alias": "KE",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KHODIYAR NAGAR",
        "alias": "KH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KIRTI STAMBH",
        "alias": "KI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KISHAN VADI",
        "alias": "KI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KOYLI",
        "alias": "KO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KOYLI PETROL PUMP",
        "alias": "KO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "KRISHNA PARK",
        "alias": "KR",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "L&T CIRCLE",
        "alias": "L&",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "LAD BHAVAN",
        "alias": "LA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "LALBAG",
        "alias": "LA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "LALBAG BRDIGE",
        "alias": "LA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "LAXMI PURA CIRCLE",
        "alias": "LA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "LMP MAKARPURA",
        "alias": "LM",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "M B HOSTEL",
        "alias": "M",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MAHARANI NURSING",
        "alias": "MA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MAKARPURA",
        "alias": "MA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MAHAVIR HALL",
        "alias": "MA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MAHESH COMPLEX",
        "alias": "MA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MALHAR POINT",
        "alias": "MA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MANEJA",
        "alias": "MA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MANEK PARK",
        "alias": "MA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MANISHA CHOKDI",
        "alias": "MA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MANJALPUR",
        "alias": "MA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MANJALPUR NAKA",
        "alias": "MA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MEERA PARK",
        "alias": "ME",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MEGHDHANUSH",
        "alias": "ME",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MIRAJ TOWER",
        "alias": "MI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MOTIBAG",
        "alias": "MO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MOTINAGAR",
        "alias": "MO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MUJ MAHUDA",
        "alias": "MU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MUKTANAND",
        "alias": "MU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MUNJ MAHUDA",
        "alias": "MU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "NANDESARI",
        "alias": "NA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "NARHARI HOSPITAL",
        "alias": "NA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "NATUBHAI CENTER",
        "alias": "NA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "NAVAPURA POLICE STATION",
        "alias": "NA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "NOVINO",
        "alias": "NO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "ONGC",
        "alias": "ON",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "P&T COLONY",
        "alias": "P&",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PANCH RATNA",
        "alias": "PA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PANCHSHIL",
        "alias": "PA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PANCHVATI",
        "alias": "PA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PARIVAR CHAR RASTA",
        "alias": "PA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PAVAN DHAM",
        "alias": "PA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PETROL PUMP",
        "alias": "PE",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "POLO GROUND",
        "alias": "PO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PRABHAT",
        "alias": "PR",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PRAMUKH PRASAD",
        "alias": "PR",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PRATHAM COMPLEX",
        "alias": "PR",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PUNAM COMPLEX",
        "alias": "PU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PUSHPAK TOWNSHIP",
        "alias": "PU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "RAILWAY CROSSING",
        "alias": "RA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "RAJESH TOWER",
        "alias": "RA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "RAJMAHAL ROAD",
        "alias": "RA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "RAMA KAKA DERI",
        "alias": "RA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "RAMESH PATEL ESTATE",
        "alias": "RA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "RANESHWAR MAHADEV",
        "alias": "RA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "RANESHWAR TEMPLE",
        "alias": "RA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "RELIANCE",
        "alias": "RE",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "RELIANCE CIRCLE",
        "alias": "RE",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SAFFRON TOWER",
        "alias": "SA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SAHYOG",
        "alias": "SA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SAI CHOWKDI",
        "alias": "SA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SAMA GARDEN",
        "alias": "SA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SAMA SAVLI ROAD",
        "alias": "SA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SAMTA",
        "alias": "SA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SANGAM",
        "alias": "SA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SARDAR ESTATE",
        "alias": "SA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SARSVATI COMPLEX",
        "alias": "SA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SAYAJI BUS STOP",
        "alias": "SA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SEVEN SEAS MALL",
        "alias": "SE",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SHARAD NAGAR",
        "alias": "SH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SHIV VATIKA",
        "alias": "SH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SOMA TALAV",
        "alias": "SO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SURYA NAGAR",
        "alias": "SU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SUSSEN",
        "alias": "SU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SVIT",
        "alias": "SV",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SWAMINARAYAN NAGAR",
        "alias": "SW",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SWAMINARAYAN TEMPLE",
        "alias": "SW",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SWATI SOCIETY",
        "alias": "SW",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TAKSH COMPLEX",
        "alias": "TA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TAPAN",
        "alias": "TA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MORE FATAK",
        "alias": "MO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TARSALI MARKET",
        "alias": "TA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TARSALI SAI TEMPLE",
        "alias": "TA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TIME CIRCLE",
        "alias": "TI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TORAL",
        "alias": "TO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TUBE COMPANY",
        "alias": "TU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TULSIDHAM",
        "alias": "TU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TULSIDHAM CHAR RASTA",
        "alias": "TU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "UDIPI",
        "alias": "UD",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "UMA CHAR RASTA",
        "alias": "UM",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "UNDERA",
        "alias": "UN",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "URMI CHAR RASTA",
        "alias": "UR",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "VADSAR BRIDGE",
        "alias": "VA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "VISHVAMITRI ROAD",
        "alias": "VI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "VOLTAMP",
        "alias": "VO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "VRUNDAVAN",
        "alias": "VR",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "YASH COMPLEX",
        "alias": "YA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "YUG NIKETAN",
        "alias": "YU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "ZAVAR NAGAR",
        "alias": "ZA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TOP",
        "alias": "TO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SBI ELLORA PARK",
        "alias": "SB",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TRIDENT",
        "alias": "TR",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MILITARY BOYS HOSTEL",
        "alias": "MI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "VUDA CIRCLE",
        "alias": "VU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "GIPCL CIRCLE",
        "alias": "GI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "VISAT PETROL PUMP",
        "alias": "VI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "RTO",
        "alias": "RT",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "AKHBHAR NAGAR",
        "alias": "AK",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "NARANPURA",
        "alias": "NA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "TORRENT",
        "alias": "TO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "HELMET CROSS ROAD",
        "alias": "HE",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "IIM",
        "alias": "II",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "HIMATLAL PARK",
        "alias": "HI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SHIVRANJANI",
        "alias": "SH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SHYAMAL CROSS ROAD",
        "alias": "SH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MANEKBAG HALL",
        "alias": "MA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "DHARNIDHAR",
        "alias": "DH",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "ANJALI CROSS ROAD",
        "alias": "AN",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "APMC",
        "alias": "AP",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "VISHALA",
        "alias": "VI",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "NAROL",
        "alias": "NA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "ISANPUR",
        "alias": "IS",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "CADILA",
        "alias": "CA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "JASHODANAGAR",
        "alias": "JA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "CTM EXPRESSWAY",
        "alias": "CT",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "ANAND EXIT",
        "alias": "AN",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "SAMARKHA CROSSING ON NH8",
        "alias": "SA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "VASAD ST",
        "alias": "VA",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "COLLEGE ROAD",
        "alias": "CO",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "MUKESH INDUSTRIES",
        "alias": "MU",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "Bharat Petrol Pump",
        "alias": "Bh",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "ZYDEX",
        "alias": "ZY",
        "city": "324b47g0mvgnfya"
    },
    {
        "name": "PANCHMUKHI HANUMAN(VASANA RD)",
        "alias": "PA",
        "city": "324b47g0mvgnfya"
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

    