angular.module('app.controllers', [])
     
.controller('SplashCtrl', ['$scope', '$stateParams', '$state', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout) {

    init();
    
    function init () {
        //see if logged in
        //see if account exists
        
        $timeout(continueToIntro, 2000);
    }
    
    function continueToIntro() {
        $state.go('animation');
    }
}])
   
.controller('myProfileCtrl', ['$scope', '$stateParams', 'UserProfileService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UserProfileService) {
 $scope.user = UserProfileService.getUser()

}])
   
.controller('confirmGetMyMatchCtrl', ['$scope', '$stateParams', '$state', 'UserProfileService', 'MatchProfileService', 'MatchResultService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, UserProfileService, MatchProfileService, MatchResultService) {

    $scope.isLoading = false;
    
    $scope.submit = function() {
        const user = UserProfileService.getUser();
        const match = MatchProfileService.getMatch();
        
        $scope.isLoading = true;
        
       MatchResultService.setMatch(user, match).then(function (result) {
           console.log('result!', result)
            $scope.isLoading = false;
            $state.go('tabsController.yourMatchResult');
       });
    }
}])
   
.controller('savedMatchesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

    $scope.isDelete = false;
    // $scope.isReorder = false;
    $scope.showDeletePrompt = false;
    $scope.deletingMatch = null;
    
    $scope.toggleDelete = function () {
        if($scope.isReorder) {$scope.isReorder = !$scope.isReorder}
        $scope.isDelete = !$scope.isDelete
    }
    // $scope.toggleReorder = function () {
    //     if($scope.isDelete) {$scope.isDelete = !$scope.isDelete}
    //     $scope.isReorder = !$scope.isReorder
    // }
    
    $scope.promptDeleteMatch = function (match) {
        $scope.isDelete = false;
        $scope.deletingMatch = match
        $scope.showDeletePrompt =  !$scope.showDeletePrompt
    }
    
    $scope.deleteMatch = function() {
        
    }
    
    $scope.cancelDelete = function() {
        $scope.isDelete = true;
        $scope.deletingMatch = null
        $scope.showDeletePrompt =  false;
    }
    
    $scope.deleteMatch = function (id){
        
    }
    
    $scope.matches = [
        {
            name: "Roger",
            sign: "\u2648",
            rating: 72,
            id: 1
        },
        {
            name: "Kenneth",
            sign: "\u264B",
            rating: 75,
            id: 2
        },
        {
            name: "Gloria",
            sign: "\u2652",
            rating: 81,
            id: 3
        },
        {
            name: "Peter",
            sign: "\u2652",
            rating: 69,
            id: 3
        },
        {
            name: "Jennifer",
            sign: "\u2652",
            rating: 74,
            id: 3
        },
        ];
    
}])
   
.controller('yourMatchResultCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', 'MatchResultService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $ionicHistory, MatchResultService) {
    
    $scope.$on("$ionicView.beforeEnter", function () {
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $scope.match = MatchResultService.getMatch();

    }); 

    

    $scope.goToSave = () => {
        $state.go('tabsController.matchSaved')
    }
    
    $scope.goToDelete = () => {
        $state.go('tabsController.deleteThisMatch')
    }
}])
   
.controller('matchSavedCtrl', ['$scope', '$stateParams', 'MatchResultService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, MatchResultService) {

    $scope.match = MatchResultService.getMatch();

}])
   
.controller('deleteThisMatchCtrl', ['$scope', '$stateParams', 'MatchResultService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, MatchResultService) {

    $scope.match = MatchResultService.getMatch();

}])
   
.controller('matchDeletedCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('10AboutCosmicMatchCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicHistory) {
    
    $scope.resetApp = () => {
        $ionicHistory.clearCache()
        $state.go('Splash', $stateParams, {reload:true})
    }

}])
   
.controller('getMoreInformationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('introCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour1Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('buy5MatchesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('welcomeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('setUpMyProfileCtrl', ['$scope', '$stateParams', '$state', 'UserProfileService', 'TimeZoneConfig', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, UserProfileService, TimeZoneConfig) {
    
    $scope.search = {
        birthTime : "",
        birthDate : "",
        timeZone : ""
    }
    
    $scope.options = TimeZoneConfig.getTimeZones();
    console.log($scope.options)

    $scope.submit = function() {
        const date = $scope.search.birthDate,
        time = $scope.search.birthTime;
        
        console.log($scope.search.timeZone)
        
        const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 
               time.getHours(), time.getMinutes(), time.getSeconds());
        
        let userObj = {
            hour: dateTime.getHours(),
            minute : dateTime.getMinutes(),
            month: dateTime.getMonth() + 1,
            day: dateTime.getDate(),
            year: dateTime.getFullYear(),
            timezone: $scope.search.timeZone
        }
        
        console.log(userObj)
        
        UserProfileService.setUser(userObj);
        $state.go('myProfileLocation')
    }
}])
   
.controller('createANewMatchCtrl', ['$scope', '$stateParams', '$state', 'MatchProfileService', 'TimeZoneConfig', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, MatchProfileService, TimeZoneConfig) {
    
    $scope.$on("$ionicView.beforeEnter", function(event, data){
   // handle event
    console.log("State Params: ", data);
    });
    
    
    $scope.search = {
        birthTime : "",
        birthDate : "",
        timeZone : ""
    }
    
    $scope.options = TimeZoneConfig.getTimeZones();


    $scope.submit = function() {
        const date = $scope.search.birthDate,
        time = $scope.search.birthTime;
        

        
        const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 
               time.getHours(), time.getMinutes(), time.getSeconds());
        
        let matchObj = {
            hour: dateTime.getHours(),
            minute : dateTime.getMinutes(),
            month: dateTime.getMonth() +1,
            day: dateTime.getDate(),
            year: dateTime.getFullYear(),
            timezone: $scope.search.timeZone
        }
        
        MatchProfileService.setMatch(matchObj);
        $state.go('tabsController.matchBirthLocation')
    }
}])
   
.controller('matchBirthLocationCtrl', ['$scope', '$stateParams', '$state', 'uiGmapGoogleMapApi', 'MatchProfileService', 'TimeZoneService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, uiGmapGoogleMapApi, MatchProfileService, TimeZoneService) {

    $scope.goBack = function() {
        $state.go('tabsController.createANewMatch')
    }
    
    $scope.search = {
        location : "",
        lat : 0,
        lon : 0,
        timezone : ""
    }
    
    
    
    const geocodeAddress = function(address, callback) {
      console.log(address);
    
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0].geometry.location);
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    };
    
    $scope.getGeocode = function() {
      uiGmapGoogleMapApi.then(function(maps) {
        // geocode chosen town
         geocodeAddress($scope.search.location, function(latLng){
            
         
            $scope.search.lat = latLng.lat();
            $scope.search.lon = latLng.lng();
            
             const coords = {
                latitude :  $scope.search.lat,
                longitude :  $scope.search.lon
            }
        
            $scope.map = {
                marker: {
                    coords : coords,
                    id: 1986
                },
                center: {
                  latitude: coords.latitude,
                  longitude: coords.longitude
                },
                zoom: 10,
                options: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP, // This is an example of a variable that cannot be placed outside of uiGmapGooogleMapApi without forcing of calling the google.map helper outside of the function
                    streetViewControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    rotateControl: false,
                    zoomControl: false
                }, 
                showTraficLayer:false
            }
            
            //$scope.map.marker.coords = coords
            
            $scope.search.lat = coords.latitude;
            $scope.search.lon = coords.longitude;
            
            $scope.$apply()
            });
        }
    )}

  
  
    //   var geocodeAddress = function(address, callback) {
    //     var geocoder = new google.maps.Geocoder();
    //     geocoder.geocode( { 'address': address}, function(results, status) {
    //         if (status == google.maps.GeocoderStatus.OK) {
    //             callback(results[0].geometry.location);
    //         } else {
    //             console.log("Geocode was not successful for the following reason: " + status);
    //         }
    //     });
    // };

            // google maps is ready
    $scope.submit = function() {
        const match = MatchProfileService.getMatch()
            
        const timestamp = new Date(match.year, match.month, match.day, match.hour, match.minute, 0).getTime()/1000;
        const coords = {
                latitude :  $scope.search.lat,
                longitude :  $scope.search.lon
            }
            
        TimeZoneService.getTimeZone(coords, timestamp).then(function(result) {
            $scope.search.timezone = result;
            
            const matchObj = angular.merge({}, $scope.geoLocation, $scope.search)
        
            MatchProfileService.setMatch(matchObj);
            $state.go('tabsController.confirmYourMatchData')
        })
            
        
        
        
    }

}])
   
.controller('myProfileLocationCtrl', ['$scope', '$stateParams', '$state', 'uiGmapGoogleMapApi', 'UserProfileService', 'TimeZoneService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, uiGmapGoogleMapApi, UserProfileService, TimeZoneService) {



    $scope.search = {
        location : "",
        lat : 0,
        lon : 0,
        timezone : ""
    }
    
    
    function resetSearch () {
        $scope.search = {
            location : "",
            lat : 0,
            lon : 0,
            timezone : ""
        }
   }

    
    const geocodeAddress = function(address, callback) {

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0].geometry.location);
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    };
    
    $scope.getGeocode = function() {
      uiGmapGoogleMapApi.then(function(maps) {
        // geocode chosen town
        geocodeAddress($scope.search.location, function(latLng){
            
         
            $scope.search.lat = latLng.lat();
            $scope.search.lon = latLng.lng();
            
             const coords = {
                latitude :  $scope.search.lat,
                longitude :  $scope.search.lon
            }
        
            $scope.map = {
                marker: {
                    coords : coords,
                    id: Math.floor(Math.random() * 200)
                },
                center: {
                  latitude: coords.latitude,
                  longitude: coords.longitude
                },
                zoom: 10,
                options: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP, // This is an example of a variable that cannot be placed outside of uiGmapGooogleMapApi without forcing of calling the google.map helper outside of the function
                    streetViewControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    rotateControl: false,
                    zoomControl: false
                }, 
                showTraficLayer: false,
                doRebuildAll: true
            }
            
            $scope.$apply()

            });
        }
    )}



    $scope.submit = function() {
        const user = UserProfileService.getUser()
            
        const timestamp = new Date(user.year, user.month, user.day, user.hour, user.minute, 0).getTime()/1000;
        const coords = {
                latitude :  $scope.search.lat,
                longitude :  $scope.search.lon
            }
            
        TimeZoneService.getTimeZone(coords, timestamp).then(function(result) {
            $scope.search.timezone = result;
            
            const userObj = angular.merge({}, $scope.geoLocation, $scope.search)
        
            UserProfileService.setUser(userObj);
            $state.go('confirmYourProfile')
        })
            
        
        
        
    }
}])
   
.controller('xMapsExampleCtrl', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
    // Do stuff with your $scope.
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []
    getMap();
    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    $scope.address = "Santa Fe, New Mexico";
            
    let geoRequest = {
        address: $scope.address
    }
    
    
    
    $scope.searchLocation = () => {
        findGeolocation().then(getMap())
    }
    
    function getMap () {
        
        uiGmapGoogleMapApi.then(function(maps){
            // Configuration needed to display the road-map with traffic
            // Displaying Ile-de-france (Paris neighbourhood)
            console.log(maps)
            
            $scope.map = {
                center: {
                  latitude: -23.598763,
                  longitude: -46.676547
                },
                zoom: 1,
                options: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP, // This is an example of a variable that cannot be placed outside of uiGmapGooogleMapApi without forcing of calling the google.map helper outside of the function
                    streetViewControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    rotateControl: false,
                    zoomControl: false
                }, 
                showTraficLayer:false
            };
        });
    }
}])
   
.controller('confirmYourProfileCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'UserProfileService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, UserProfileService) {

    $scope.user = UserProfileService.getUser()

    
}])
   
.controller('confirmYourMatchDataCtrl', ['$scope', '$stateParams', 'MatchProfileService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, MatchProfileService) {

    $scope.user = MatchProfileService.getMatch()
}])
   
.controller('animationCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, $ionicHistory) {

    init();
    
    function init () {
        const backgroundUrl = "https://media.giphy.com/media/l378ByqnzvVedf5n2/giphy.gif";

        const randomNumber = Math.floor(Math.random()* (150 - 0) + 0)
        const reloadImage = backgroundUrl + randomNumber
        
        angular.element( document.querySelector( '#jstarget' )).css( "background", "url('"+ backgroundUrl + "')  no-repeat center center fixed")
        //see if logged in
        //see if account exists
        
        $timeout(continueToIntro, 4000)
    }
    
    function continueToIntro() {
        $ionicHistory.nextViewOptions({
            disableAnimate: true
        });
        angular.element( document.querySelector( '#jstarget' )).css( "background", "")

        $state.go('intro');
    }
}])
   
.controller('cosmicMatchTour2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour3Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour3aCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour3bCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour4Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour5Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour5aCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour5bCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour6Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour7Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour8Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cosmicMatchTour9Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 