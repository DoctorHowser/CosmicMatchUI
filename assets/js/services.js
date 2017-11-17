angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('TimeZoneService', ['$http',  function($http) {
    let service = {
        getTimeZone: getTimeZone
    }
    
    return service;
    
    function getTimeZone (location, timestamp) {
        
        let locationString = location.latitude + ',' + location.longitude
        
        const config = {
            params: {
                location: locationString,
                timestamp: timestamp,
                key: 'AIzaSyCYXwBNR-YI-09ofX8YZH27CXKqwZz8Mmc'
            }
        }
        
        return $http.get('https://maps.googleapis.com/maps/api/timezone/json', config).then(function(response) {
            return(response.data.timeZoneId)
        })
    }
}])

.service('MatchProfileService', [function(){
    
    let match = {
        month: "00",
        day: 0,
        year: 0,
        hour: 0,
        minute: 0,
        timezone: "",
        lat: 0,
        lon: 0,
        location: ""
    }
    
    let service = {
        setMatch : setMatch,
        getMatch: getMatch
    }
    
    return service;
    
    
    ///////
    function setMatch (userInfo) {
        match.month = addZ(userInfo.month) || match.month;
        match.day = addZ(userInfo.day) || match.day;
        match.year = userInfo.year || match.year;
        match.hour = addZ(userInfo.hour) || match.hour;
        match.minute = addZ(userInfo.minute) || match.minute;
        match.timezone = userInfo.timezone || match.timezone;
        match.lat = userInfo.lat || match.lat;
        match.lon = userInfo.lon || match.lon;        
        match.location  = userInfo.location || match.location;
        
        console.log(match)
    }
    
    function getMatch() {
        return match;
    }
    function addZ(n){
        if(n === undefined) return "";
        
        return n < 10 ? '0' +n: '' + n;
    }
}])

.service('UserProfileService', [function(){
    
    let user = {
        month: 0,
        day: 0,
        year: 0,
        hour: 0,
        minute: 0,
        timezone: "",
        lat: 0,
        lon: 0,
        location: ""
    }
    
    let service = {
        setUser : setUser,
        getUser: getUser
    }
    
    return service;
    
    
    ///////
    function setUser (userInfo) {
        user.month = addZ(userInfo.month) || user.month;
        user.day = addZ(userInfo.day) || user.day;
        user.year = userInfo.year || user.year;
        user.hour = addZ(userInfo.hour) || user.hour;
        user.minute = addZ(userInfo.minute) || user.minute;
        user.timezone = userInfo.timezone || user.timezone;
        user.lat = userInfo.lat || user.lat;
        user.lon = userInfo.lon || user.lon;        
        user.location  = userInfo.location || user.location;
    }
    
    function getUser() {
        return user;
    }
    
    function addZ(n){
        if(n === undefined) return "";

        return n<10? '0'+n:''+n;
        
    }
    
}])

.service('MatchResultService',  ['$http', '$q', function($http, $q){
    
    let cache = {}
    
    let service = {
        setMatch : setMatch,
        getMatch : getMatch
    }
    
    return service;
    
    function setMatch(personA, personB) {
        cache = {};
        
        
         return $http.post("https://cosmicmatch-api.herokuapp.com/comparison", {personA : personA, personB : personB})
         .then(function(result) {
                cache = result.data
                return cache
            })
    }
    
    
    
    function getMatch() {
        debugger;
        return cache
    }
    
}])

.factory('Auth', ['$rootScope', function($rootScope) {
    
    var Auth0Cordova = require('@auth0/cordova');
    var auth0 = require('auth0-js');
    var userProfile = {};

    var auth0Config = {
        clientId: 'Snr3F4W4r7RWJza26gkG7EnikNVxGqJd',
        domain: 'cosmicmatch.auth0.com',
        callbackURL: location.href,
        packageIdentifier: 'com.astro.cosmicmatch'
    };

    auth0Config.clientID = auth0Config.clientId;

    var webAuth = new auth0.WebAuth(auth0Config);

    function setSession(authResult) {
    var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    window.localStorage.setItem('access_token', authResult.accessToken);
    window.localStorage.setItem('id_token', authResult.idToken);
    window.localStorage.setItem('expires_at', expiresAt);
    }

    function isAuthenticated() {
    var expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
    }
    
    function getProfile(cb) {
    var accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('Access token must exist to fetch profile');
    }

    webAuth.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
        userProfile = profile;
        }
        cb(err, profile);
    });
    }

    function login() {
    var client = new Auth0Cordova(auth0Config);

    var options = {
        scope: 'openid profile offline_access'
    };

    client.authorize(options, function(err, authResult) {
        if (err) {
        throw new Error(err);
        }
        if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        $rootScope.$apply();
        }
    });
    }

    function logout() {
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');
    }

    return {
    login: login,
    logout: logout,
    getProfile: getProfile,
    isAuthenticated: isAuthenticated
    };
}])

.service('TimeZoneConfig', [function () {
    
    const timeZones = {
        "America/Anchorage": "Anchorage",
        "America/Anguilla": "Anguilla",
        "America/Antigua": "Antigua",
        "America/Araguaina": "Araguaina",
        "America/Argentina/Buenos_Aires": "Argentina - Buenos Aires",
        "America/Argentina/Catamarca": "Argentina - Catamarca",
        "America/Argentina/ComodRivadavia": "Argentina - ComodRivadavia",
        "America/Argentina/Cordoba": "Argentina - Cordoba",
        "America/Argentina/Jujuy": "Argentina - Jujuy",
        "America/Argentina/La_Rioja": "Argentina - La Rioja",
        "America/Argentina/Mendoza": "Argentina - Mendoza",
        "America/Argentina/Rio_Gallegos": "Argentina - Rio Gallegos",
        "America/Argentina/Salta": "Argentina - Salta",
        "America/Argentina/San_Juan": "Argentina - San Juan",
        "America/Argentina/San_Luis": "Argentina - San Luis",
        "America/Argentina/Tucuman": "Argentina - Tucuman",
        "America/Argentina/Ushuaia": "Argentina - Ushuaia",
        "America/Aruba": "Aruba",
        "America/Asuncion": "Asuncion",
        "America/Atikokan": "Atikokan",
        "America/Atka": "Atka",
        "America/Bahia": "Bahia",
        "America/Barbados": "Barbados",
        "America/Belem": "Belem",
        "America/Belize": "Belize",
        "America/Blanc-Sablon": "Blanc-Sablon",
        "America/Boa_Vista": "Boa Vista",
        "America/Bogota": "Bogota",
        "America/Boise": "Boise",
        "America/Buenos_Aires": "Buenos Aires",
        "America/Cambridge_Bay": "Cambridge Bay",
        "America/Campo_Grande": "Campo Grande",
        "America/Cancun": "Cancun",
        "America/Caracas": "Caracas",
        "America/Catamarca": "Catamarca",
        "America/Cayenne": "Cayenne",
        "America/Cayman": "Cayman",
        "America/Chicago": "Chicago",
        "America/Chihuahua": "Chihuahua",
        "America/Coral_Harbour": "Coral Harbour",
        "America/Cordoba": "Cordoba",
        "America/Costa_Rica": "Costa Rica",
        "America/Cuiaba": "Cuiaba",
        "America/Curacao": "Curacao",
        "America/Danmarkshavn": "Danmarkshavn",
        "America/Dawson": "Dawson",
        "America/Dawson_Creek": "Dawson Creek",
        "America/Denver": "Denver",
        "America/Detroit": "Detroit",
        "America/Dominica": "Dominica",
        "America/Edmonton": "Edmonton",
        "America/Eirunepe": "Eirunepe",
        "America/El_Salvador": "El Salvador",
        "America/Ensenada": "Ensenada",
        "America/Fortaleza": "Fortaleza",
        "America/Fort_Wayne": "Fort Wayne",
        "America/Glace_Bay": "Glace Bay",
        "America/Godthab": "Godthab",
        "America/Goose_Bay": "Goose Bay",
        "America/Grand_Turk": "Grand Turk",
        "America/Grenada": "Grenada",
        "America/Guadeloupe": "Guadeloupe",
        "America/Guatemala": "Guatemala",
        "America/Guayaquil": "Guayaquil",
        "America/Guyana": "Guyana",
        "America/Halifax": "Halifax",
        "America/Havana": "Havana",
        "America/Hermosillo": "Hermosillo",
        "America/Indiana/Indianapolis": "Indiana - Indianapolis",
        "America/Indiana/Knox": "Indiana - Knox",
        "America/Indiana/Marengo": "Indiana - Marengo",
        "America/Indiana/Petersburg": "Indiana - Petersburg",
        "America/Indiana/Tell_City": "Indiana - Tell City",
        "America/Indiana/Vevay": "Indiana - Vevay",
        "America/Indiana/Vincennes": "Indiana - Vincennes",
        "America/Indiana/Winamac": "Indiana - Winamac",
        "America/Indianapolis": "Indianapolis",
        "America/Inuvik": "Inuvik",
        "America/Iqaluit": "Iqaluit",
        "America/Jamaica": "Jamaica",
        "America/Jujuy": "Jujuy",
        "America/Juneau": "Juneau",
        "America/Kentucky/Louisville": "Kentucky - Louisville",
        "America/Kentucky/Monticello": "Kentucky - Monticello",
        "America/Knox_IN": "Knox IN",
        "America/La_Paz": "La Paz",
        "America/Lima": "Lima",
        "America/Los_Angeles": "Los Angeles",
        "America/Louisville": "Louisville",
        "America/Maceio": "Maceio",
        "America/Managua": "Managua",
        "America/Manaus": "Manaus",
        "America/Marigot": "Marigot",
        "America/Martinique": "Martinique",
        "America/Matamoros": "Matamoros",
        "America/Mazatlan": "Mazatlan",
        "America/Mendoza": "Mendoza",
        "America/Menominee": "Menominee",
        "America/Merida": "Merida",
        "America/Mexico_City": "Mexico City",
        "America/Miquelon": "Miquelon",
        "America/Moncton": "Moncton",
        "America/Monterrey": "Monterrey",
        "America/Montevideo": "Montevideo",
        "America/Montreal": "Montreal",
        "America/Montserrat": "Montserrat",
        "America/Nassau": "Nassau",
        "America/New_York": "New York",
        "America/Nipigon": "Nipigon",
        "America/Nome": "Nome",
        "America/Noronha": "Noronha",
        "America/North_Dakota/Center": "North Dakota - Center",
        "America/North_Dakota/New_Salem": "North Dakota - New Salem",
        "America/Ojinaga": "Ojinaga",
        "America/Panama": "Panama",
        "America/Pangnirtung": "Pangnirtung",
        "America/Paramaribo": "Paramaribo",
        "America/Phoenix": "Phoenix",
        "America/Port-au-Prince": "Port-au-Prince",
        "America/Porto_Acre": "Porto Acre",
        "America/Port_of_Spain": "Port of Spain",
        "America/Porto_Velho": "Porto Velho",
        "America/Puerto_Rico": "Puerto Rico",
        "America/Rainy_River": "Rainy River",
        "America/Rankin_Inlet": "Rankin Inlet",
        "America/Recife": "Recife",
        "America/Regina": "Regina",
        "America/Resolute": "Resolute",
        "America/Rio_Branco": "Rio Branco",
        "America/Rosario": "Rosario",
        "America/Santa_Isabel": "Santa Isabel",
        "America/Santarem": "Santarem",
        "America/Santiago": "Santiago",
        "America/Santo_Domingo": "Santo Domingo",
        "America/Sao_Paulo": "Sao Paulo",
        "America/Scoresbysund": "Scoresbysund",
        "America/Shiprock": "Shiprock",
        "America/St_Barthelemy": "St Barthelemy",
        "America/St_Johns": "St Johns",
        "America/St_Kitts": "St Kitts",
        "America/St_Lucia": "St Lucia",
        "America/St_Thomas": "St Thomas",
        "America/St_Vincent": "St Vincent",
        "America/Swift_Current": "Swift Current",
        "America/Tegucigalpa": "Tegucigalpa",
        "America/Thule": "Thule",
        "America/Thunder_Bay": "Thunder Bay",
        "America/Tijuana": "Tijuana",
        "America/Toronto": "Toronto",
        "America/Tortola": "Tortola",
        "America/Vancouver": "Vancouver",
        "America/Virgin": "Virgin",
        "America/Whitehorse": "Whitehorse",
        "America/Winnipeg": "Winnipeg",
        "America/Yakutat": "Yakutat",
        "America/Yellowknife": "Yellowknife","Antarctica/Casey": "Casey",
        "Antarctica/Davis": "Davis",
        "Antarctica/DumontDUrville": "DumontDUrville",
        "Antarctica/Macquarie": "Macquarie",
        "Antarctica/Mawson": "Mawson",
        "Antarctica/McMurdo": "McMurdo",
        "Antarctica/Palmer": "Palmer",
        "Antarctica/Rothera": "Rothera",
        "Antarctica/South_Pole": "South Pole",
        "Antarctica/Syowa": "Syowa",
        "Antarctica/Vostok": "Vostok",
        "Pacific/Apia": "Apia",
        "Pacific/Auckland": "Auckland",
        "Pacific/Chatham": "Chatham",
        "Pacific/Easter": "Easter",
        "Pacific/Efate": "Efate",
        "Pacific/Enderbury": "Enderbury",
        "Pacific/Fakaofo": "Fakaofo",
        "Pacific/Fiji": "Fiji",
        "Pacific/Funafuti": "Funafuti",
        "Pacific/Galapagos": "Galapagos",
        "Pacific/Gambier": "Gambier",
        "Pacific/Guadalcanal": "Guadalcanal",
        "Pacific/Guam": "Guam",
        "Pacific/Honolulu": "Honolulu",
        "Pacific/Johnston": "Johnston",
        "Pacific/Kiritimati": "Kiritimati",
        "Pacific/Kosrae": "Kosrae",
        "Pacific/Kwajalein": "Kwajalein",
        "Pacific/Majuro": "Majuro",
        "Pacific/Marquesas": "Marquesas",
        "Pacific/Midway": "Midway",
        "Pacific/Nauru": "Nauru",
        "Pacific/Niue": "Niue",
        "Pacific/Norfolk": "Norfolk",
        "Pacific/Noumea": "Noumea",
        "Pacific/Pago_Pago": "Pago Pago",
        "Pacific/Palau": "Palau",
        "Pacific/Pitcairn": "Pitcairn",
        "Pacific/Ponape": "Ponape",
        "Pacific/Port_Moresby": "Port Moresby",
        "Pacific/Rarotonga": "Rarotonga",
        "Pacific/Saipan": "Saipan",
        "Pacific/Samoa": "Samoa",
        "Pacific/Tahiti": "Tahiti",
        "Pacific/Tarawa": "Tarawa",
        "Pacific/Tongatapu": "Tongatapu",
        "Pacific/Truk": "Truk",
        "Pacific/Wake": "Wake",
        "Pacific/Wallis": "Wallis",
        "Pacific/Yap": "Yap",
        "Atlantic/Azores": "Azores",
        "Atlantic/Bermuda": "Bermuda",
        "Atlantic/Canary": "Canary",
        "Atlantic/Cape_Verde": "Cape Verde",
        "Atlantic/Faeroe": "Faeroe",
        "Atlantic/Faroe": "Faroe",
        "Atlantic/Jan_Mayen": "Jan Mayen",
        "Atlantic/Madeira": "Madeira",
        "Atlantic/Reykjavik": "Reykjavik",
        "Atlantic/South_Georgia": "South Georgia",
        "Atlantic/Stanley": "Stanley",
        "Atlantic/St_Helena": "St Helen",
        "Indian/Antananarivo": "Antananarivo",
        "Indian/Chagos": "Chagos",
        "Indian/Christmas": "Christmas",
        "Indian/Cocos": "Cocos",
        "Indian/Comoro": "Comoro",
        "Indian/Kerguelen": "Kerguelen",
        "Indian/Mahe": "Mahe",
        "Indian/Maldives": "Maldives",
        "Indian/Mauritius": "Mauritius",
        "Indian/Mayotte": "Mayotte",
        "Indian/Reunion": "Reunion",
        "Australia/ACT": "ACT",
        "Australia/Adelaide": "Adelaide",
        "Australia/Brisbane": "Brisbane",
        "Australia/Broken_Hill": "Broken Hill",
        "Australia/Canberra": "Canberra",
        "Australia/Currie": "Currie",
        "Australia/Darwin": "Darwin",
        "Australia/Eucla": "Eucla",
        "Australia/Hobart": "Hobart",
        "Australia/LHI": "LHI",
        "Australia/Lindeman": "Lindeman",
        "Australia/Lord_Howe": "Lord Howe",
        "Australia/Melbourne": "Melbourne",
        "Australia/North": "North",
        "Australia/NSW": "NSW",
        "Australia/Perth": "Perth",
        "Australia/Queensland": "Queensland",
        "Australia/South": "South",
        "Australia/Sydney": "Sydney",
        "Australia/Tasmania": "Tasmania",
        "Australia/Victoria": "Victoria",
        "Australia/West": "West",
        "Australia/Yancowinna": "Yancowinna",
        "Africa/Abidjan": "Abidjan",
        "Africa/Accra": "Accra",
        "Africa/Addis_Ababa": "Addis Ababa",
        "Africa/Algiers": "Algiers",
        "Africa/Asmara": "Asmara",
        "Africa/Asmera": "Asmera",
        "Africa/Bamako": "Bamako",
        "Africa/Bangui": "Bangui",
        "Africa/Banjul": "Banjul",
        "Africa/Bissau": "Bissau",
        "Africa/Blantyre": "Blantyre",
        "Africa/Brazzaville": "Brazzaville",
        "Africa/Bujumbura": "Bujumbura",
        "Africa/Cairo": "Cairo",
        "Africa/Casablanca": "Casablanca",
        "Africa/Ceuta": "Ceuta",
        "Africa/Conakry": "Conakry",
        "Africa/Dakar": "Dakar",
        "Africa/Dar_es_Salaam": "Dar es Salaam",
        "Africa/Djibouti": "Djibouti",
        "Africa/Douala": "Douala",
        "Africa/El_Aaiun": "El Aaiun",
        "Africa/Freetown": "Freetown",
        "Africa/Gaborone": "Gaborone",
        "Africa/Harare": "Harare",
        "Africa/Johannesburg": "Johannesburg",
        "Africa/Kampala": "Kampala",
        "Africa/Khartoum": "Khartoum",
        "Africa/Kigali": "Kigali",
        "Africa/Kinshasa": "Kinshasa",
        "Africa/Lagos": "Lagos",
        "Africa/Libreville": "Libreville",
        "Africa/Lome": "Lome",
        "Africa/Luanda": "Luanda",
        "Africa/Lubumbashi": "Lubumbashi",
        "Africa/Lusaka": "Lusaka",
        "Africa/Malabo": "Malabo",
        "Africa/Maputo": "Maputo",
        "Africa/Maseru": "Maseru",
        "Africa/Mbabane": "Mbabane",
        "Africa/Mogadishu": "Mogadishu",
        "Africa/Monrovia": "Monrovia",
        "Africa/Nairobi": "Nairobi",
        "Africa/Ndjamena": "Ndjamena",
        "Africa/Niamey": "Niamey",
        "Africa/Nouakchott": "Nouakchott",
        "Africa/Ouagadougou": "Ouagadougou",
        "Africa/Porto-Novo": "Porto-Novo",
        "Africa/Sao_Tome": "Sao Tome",
        "Africa/Timbuktu": "Timbuktu",
        "Africa/Tripoli": "Tripoli",
        "Africa/Tunis": "Tunis",
        "Africa/Windhoek": "Windhoek",
        "Asia/Aden": "Aden",
        "Asia/Almaty": "Almaty",
        "Asia/Amman": "Amman",
        "Asia/Anadyr": "Anadyr",
        "Asia/Aqtau": "Aqtau",
        "Asia/Aqtobe": "Aqtobe",
        "Asia/Ashgabat": "Ashgabat",
        "Asia/Ashkhabad": "Ashkhabad",
        "Asia/Baghdad": "Baghdad",
        "Asia/Bahrain": "Bahrain",
        "Asia/Baku": "Baku",
        "Asia/Bangkok": "Bangkok",
        "Asia/Beirut": "Beirut",
        "Asia/Bishkek": "Bishkek",
        "Asia/Brunei": "Brunei",
        "Asia/Calcutta": "Calcutta",
        "Asia/Choibalsan": "Choibalsan",
        "Asia/Chongqing": "Chongqing",
        "Asia/Chungking": "Chungking",
        "Asia/Colombo": "Colombo",
        "Asia/Dacca": "Dacca",
        "Asia/Damascus": "Damascus",
        "Asia/Dhaka": "Dhaka",
        "Asia/Dili": "Dili",
        "Asia/Dubai": "Dubai",
        "Asia/Dushanbe": "Dushanbe",
        "Asia/Gaza": "Gaza",
        "Asia/Harbin": "Harbin",
        "Asia/Ho_Chi_Minh": "Ho Chi Minh",
        "Asia/Hong_Kong": "Hong Kong",
        "Asia/Hovd": "Hovd",
        "Asia/Irkutsk": "Irkutsk",
        "Asia/Istanbul": "Istanbul",
        "Asia/Jakarta": "Jakarta",
        "Asia/Jayapura": "Jayapura",
        "Asia/Jerusalem": "Jerusalem",
        "Asia/Kabul": "Kabul",
        "Asia/Kamchatka": "Kamchatka",
        "Asia/Karachi": "Karachi",
        "Asia/Kashgar": "Kashgar",
        "Asia/Kathmandu": "Kathmandu",
        "Asia/Katmandu": "Katmandu",
        "Asia/Kolkata": "Kolkata",
        "Asia/Krasnoyarsk": "Krasnoyarsk",
        "Asia/Kuala_Lumpur": "Kuala Lumpur",
        "Asia/Kuching": "Kuching",
        "Asia/Kuwait": "Kuwait",
        "Asia/Macao": "Macao",
        "Asia/Macau": "Macau",
        "Asia/Magadan": "Magadan",
        "Asia/Makassar": "Makassar",
        "Asia/Manila": "Manila",
        "Asia/Muscat": "Muscat",
        "Asia/Nicosia": "Nicosia",
        "Asia/Novokuznetsk": "Novokuznetsk",
        "Asia/Novosibirsk": "Novosibirsk",
        "Asia/Omsk": "Omsk",
        "Asia/Oral": "Oral",
        "Asia/Phnom_Penh": "Phnom Penh",
        "Asia/Pontianak": "Pontianak",
        "Asia/Pyongyang": "Pyongyang",
        "Asia/Qatar": "Qatar",
        "Asia/Qyzylorda": "Qyzylorda",
        "Asia/Rangoon": "Rangoon",
        "Asia/Riyadh": "Riyadh",
        "Asia/Saigon": "Saigon",
        "Asia/Sakhalin": "Sakhalin",
        "Asia/Samarkand": "Samarkand",
        "Asia/Seoul": "Seoul",
        "Asia/Shanghai": "Shanghai",
        "Asia/Singapore": "Singapore",
        "Asia/Taipei": "Taipei",
        "Asia/Tashkent": "Tashkent",
        "Asia/Tbilisi": "Tbilisi",
        "Asia/Tehran": "Tehran",
        "Asia/Tel_Aviv": "Tel Aviv",
        "Asia/Thimbu": "Thimbu",
        "Asia/Thimphu": "Thimphu",
        "Asia/Tokyo": "Tokyo",
        "Asia/Ujung_Pandang": "Ujung Pandang",
        "Asia/Ulaanbaatar": "Ulaanbaatar",
        "Asia/Ulan_Bator": "Ulan Bator",
        "Asia/Urumqi": "Urumqi",
        "Asia/Vientiane": "Vientiane",
        "Asia/Vladivostok": "Vladivostok",
        "Asia/Yakutsk": "Yakutsk",
        "Asia/Yekaterinburg": "Yekaterinburg",
        "Asia/Yerevan": "Yerevan",
        "Europe/Amsterdam": "Amsterdam",
        "Europe/Andorra": "Andorra",
        "Europe/Athens": "Athens",
        "Europe/Belfast": "Belfast",
        "Europe/Belgrade": "Belgrade",
        "Europe/Berlin": "Berlin",
        "Europe/Bratislava": "Bratislava",
        "Europe/Brussels": "Brussels",
        "Europe/Bucharest": "Bucharest",
        "Europe/Budapest": "Budapest",
        "Europe/Chisinau": "Chisinau",
        "Europe/Copenhagen": "Copenhagen",
        "Europe/Dublin": "Dublin",
        "Europe/Gibraltar": "Gibraltar",
        "Europe/Guernsey": "Guernsey",
        "Europe/Helsinki": "Helsinki",
        "Europe/Isle_of_Man": "Isle of Man",
        "Europe/Istanbul": "Istanbul",
        "Europe/Jersey": "Jersey",
        "Europe/Kaliningrad": "Kaliningrad",
        "Europe/Kiev": "Kiev",
        "Europe/Lisbon": "Lisbon",
        "Europe/Ljubljana": "Ljubljana",
        "Europe/London": "London",
        "Europe/Luxembourg": "Luxembourg",
        "Europe/Madrid": "Madrid",
        "Europe/Malta": "Malta",
        "Europe/Mariehamn": "Mariehamn",
        "Europe/Minsk": "Minsk",
        "Europe/Monaco": "Monaco",
        "Europe/Moscow": "Moscow",
        "Europe/Nicosia": "Nicosia",
        "Europe/Oslo": "Oslo",
        "Europe/Paris": "Paris",
        "Europe/Podgorica": "Podgorica",
        "Europe/Prague": "Prague",
        "Europe/Riga": "Riga",
        "Europe/Rome": "Rome",
        "Europe/Samara": "Samara",
        "Europe/San_Marino": "San Marino",
        "Europe/Sarajevo": "Sarajevo",
        "Europe/Simferopol": "Simferopol",
        "Europe/Skopje": "Skopje",
        "Europe/Sofia": "Sofia",
        "Europe/Stockholm": "Stockholm",
        "Europe/Tallinn": "Tallinn",
        "Europe/Tirane": "Tirane",
        "Europe/Tiraspol": "Tiraspol",
        "Europe/Uzhgorod": "Uzhgorod",
        "Europe/Vaduz": "Vaduz",
        "Europe/Vatican": "Vatican",
        "Europe/Vienna": "Vienna",
        "Europe/Vilnius": "Vilnius",
        "Europe/Volgograd": "Volgograd",
        "Europe/Warsaw": "Warsaw",
        "Europe/Zagreb": "Zagreb",
        "Europe/Zaporozhye": "Zaporozhye",
        "Europe/Zurich": "Zurich",
        "Arctic/Longyearbyen": "Longyearbyen"
    }
    
    
    let service = {
        getTimeZones : getTimeZones
    }
    
    return service;
    
    
    
    function getTimeZones() {
        return timeZones
    }
    
    
}]);