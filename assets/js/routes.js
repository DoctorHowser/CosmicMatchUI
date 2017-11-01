angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController', {
    url: '/page19',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('Splash', {
    url: '/page11',
    templateUrl: 'templates/Splash.html',
    controller: 'SplashCtrl'
  })

  .state('tabsController.myProfile', {
    url: '/page6',
    views: {
      'tab3': {
        templateUrl: 'templates/myProfile.html',
        controller: 'myProfileCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.confirmGetMyMatch'
      2) Using $state.go programatically:
        $state.go('tabsController.confirmGetMyMatch');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page19/tab5/page10
      /page19/tab1/page10
  */
  .state('tabsController.confirmGetMyMatch', {
    url: '/page10',
    views: {
      'tab5': {
        templateUrl: 'templates/confirmGetMyMatch.html',
        controller: 'confirmGetMyMatchCtrl'
      },
      'tab1': {
        templateUrl: 'templates/confirmGetMyMatch.html',
        controller: 'confirmGetMyMatchCtrl'
      }
    }
  })

  .state('tabsController.savedMatches', {
    url: '/page7',
    views: {
      'tab1': {
        templateUrl: 'templates/savedMatches.html',
        controller: 'savedMatchesCtrl'
      }
    }
  })

  .state('tabsController.yourMatchResult', {
    url: '/page16',
    views: {
      'tab1': {
        templateUrl: 'templates/yourMatchResult.html',
        controller: 'yourMatchResultCtrl'
      }
    }
  })

  .state('tabsController.matchSaved', {
    url: '/page20',
    views: {
      'tab1': {
        templateUrl: 'templates/matchSaved.html',
        controller: 'matchSavedCtrl'
      }
    }
  })

  .state('tabsController.deleteThisMatch', {
    url: '/page25',
    views: {
      'tab1': {
        templateUrl: 'templates/deleteThisMatch.html',
        controller: 'deleteThisMatchCtrl'
      }
    }
  })

  .state('tabsController.matchDeleted', {
    url: '/page26',
    views: {
      'tab1': {
        templateUrl: 'templates/matchDeleted.html',
        controller: 'matchDeletedCtrl'
      }
    }
  })

  .state('tabsController.10AboutCosmicMatch', {
    url: '/page8',
    views: {
      'tab4': {
        templateUrl: 'templates/10AboutCosmicMatch.html',
        controller: '10AboutCosmicMatchCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.getMoreInformation'
      2) Using $state.go programatically:
        $state.go('tabsController.getMoreInformation');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page19/tab1/page13
      /page19/tab6/page13
  */
  .state('tabsController.getMoreInformation', {
    url: '/page13',
    views: {
      'tab1': {
        templateUrl: 'templates/getMoreInformation.html',
        controller: 'getMoreInformationCtrl'
      },
      'tab6': {
        templateUrl: 'templates/getMoreInformation.html',
        controller: 'getMoreInformationCtrl'
      }
    }
  })

  .state('intro', {
    url: '/page15',
    templateUrl: 'templates/intro.html',
    controller: 'introCtrl'
  })

  .state('cosmicMatchTour1', {
    url: '/page12',
    templateUrl: 'templates/cosmicMatchTour1.html',
    controller: 'cosmicMatchTour1Ctrl'
  })

  .state('buy5Matches', {
    url: '/page17',
    templateUrl: 'templates/buy5Matches.html',
    controller: 'buy5MatchesCtrl'
  })

  .state('welcome', {
    url: '/page21',
    templateUrl: 'templates/welcome.html',
    controller: 'welcomeCtrl'
  })

  .state('tabsController.setUpMyProfile', {
    url: '/page22',
    views: {
      'tab3': {
        templateUrl: 'templates/setUpMyProfile.html',
        controller: 'setUpMyProfileCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.createANewMatch'
      2) Using $state.go programatically:
        $state.go('tabsController.createANewMatch');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page19/tab5/page19
      /page19/tab1/page19
  */
  .state('tabsController.createANewMatch', {
    url: '/page19',
    views: {
      'tab5': {
        templateUrl: 'templates/createANewMatch.html',
        controller: 'createANewMatchCtrl'
      },
      'tab1': {
        templateUrl: 'templates/createANewMatch.html',
        controller: 'createANewMatchCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.matchBirthLocation'
      2) Using $state.go programatically:
        $state.go('tabsController.matchBirthLocation');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page19/tab5/page24
      /page19/tab1/page24
  */
  .state('tabsController.matchBirthLocation', {
    url: '/page24',
    views: {
      'tab5': {
        templateUrl: 'templates/matchBirthLocation.html',
        controller: 'matchBirthLocationCtrl'
      },
      'tab1': {
        templateUrl: 'templates/matchBirthLocation.html',
        controller: 'matchBirthLocationCtrl'
      }
    }
  })

  .state('tabsController.myProfileLocation', {
    url: '/page27',
    views: {
      'tab3': {
        templateUrl: 'templates/myProfileLocation.html',
        controller: 'myProfileLocationCtrl'
      }
    }
  })

  .state('xMapsExample', {
    url: '/page18',
    templateUrl: 'templates/xMapsExample.html',
    controller: 'xMapsExampleCtrl'
  })

  .state('confirmYourProfile', {
    url: '/page28',
    templateUrl: 'templates/confirmYourProfile.html',
    controller: 'confirmYourProfileCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.confirmYourMatchData'
      2) Using $state.go programatically:
        $state.go('tabsController.confirmYourMatchData');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page19/tab5/page23
      /page19/tab1/page23
  */
  .state('tabsController.confirmYourMatchData', {
    url: '/page23',
    views: {
      'tab5': {
        templateUrl: 'templates/confirmYourMatchData.html',
        controller: 'confirmYourMatchDataCtrl'
      },
      'tab1': {
        templateUrl: 'templates/confirmYourMatchData.html',
        controller: 'confirmYourMatchDataCtrl'
      }
    }
  })

  .state('animation', {
    url: '/page29',
    templateUrl: 'templates/animation.html',
    controller: 'animationCtrl'
  })

  .state('cosmicMatchTour2', {
    url: '/page30',
    templateUrl: 'templates/cosmicMatchTour2.html',
    controller: 'cosmicMatchTour2Ctrl'
  })

  .state('cosmicMatchTour3', {
    url: '/page31',
    templateUrl: 'templates/cosmicMatchTour3.html',
    controller: 'cosmicMatchTour3Ctrl'
  })

  .state('cosmicMatchTour3a', {
    url: '/page37',
    templateUrl: 'templates/cosmicMatchTour3a.html',
    controller: 'cosmicMatchTour3aCtrl'
  })

  .state('cosmicMatchTour3b', {
    url: '/page14',
    templateUrl: 'templates/cosmicMatchTour3b.html',
    controller: 'cosmicMatchTour3bCtrl'
  })

  .state('cosmicMatchTour4', {
    url: '/page32',
    templateUrl: 'templates/cosmicMatchTour4.html',
    controller: 'cosmicMatchTour4Ctrl'
  })

  .state('cosmicMatchTour5', {
    url: '/page33',
    templateUrl: 'templates/cosmicMatchTour5.html',
    controller: 'cosmicMatchTour5Ctrl'
  })

  .state('cosmicMatchTour5a', {
    url: '/page38',
    templateUrl: 'templates/cosmicMatchTour5a.html',
    controller: 'cosmicMatchTour5aCtrl'
  })

  .state('cosmicMatchTour5b', {
    url: '/page39',
    templateUrl: 'templates/cosmicMatchTour5b.html',
    controller: 'cosmicMatchTour5bCtrl'
  })

  .state('cosmicMatchTour6', {
    url: '/page34',
    templateUrl: 'templates/cosmicMatchTour6.html',
    controller: 'cosmicMatchTour6Ctrl'
  })

  .state('cosmicMatchTour7', {
    url: '/page9',
    templateUrl: 'templates/cosmicMatchTour7.html',
    controller: 'cosmicMatchTour7Ctrl'
  })

  .state('cosmicMatchTour8', {
    url: '/page35',
    templateUrl: 'templates/cosmicMatchTour8.html',
    controller: 'cosmicMatchTour8Ctrl'
  })

  .state('cosmicMatchTour9', {
    url: '/page36',
    templateUrl: 'templates/cosmicMatchTour9.html',
    controller: 'cosmicMatchTour9Ctrl'
  })

$urlRouterProvider.otherwise('/page11')


});