// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('starter', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider, $sceProvider, $sceDelegateProvider) {
 $sceProvider.enabled(false);
 $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://video.xx.fbcdn.net/**'
  ]);
$stateProvider.state('home', {
  url: '/home',
  views: {
    home: {
      templateUrl: 'home.html'
    }
  }
})

$stateProvider.state('help', {
  url: '/help',
  views: {
    help: {
      templateUrl: 'help.html'
    }
  }
})

$stateProvider.state('featured',{
	url:'/featured',
	views:{
		featured:{
			templateUrl: 'featured.html'
		}
	}
})

})



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Android customization
    cordova.plugins.backgroundMode.setDefaults({ text:'Jeni duke degjuar Radio Pendimin.'});
    // Enable background mode
    cordova.plugins.backgroundMode.enable();
      document.addEventListener("offline", function(){alert("App went offline");}, false);
      document.addEventListener("online", function(){
          document.getElementById("audio-player").play();
          }, false);
      
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
   
  });
})

.controller('ListaCtrl',function($scope){
	$http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLueTNPnrNvSHjlZcJb4-Yt6LXUwa53M_p&key=AIzaSyDhDZjburmzpaoH39Uj4dnU6X_GRLbCVW0').then(function(resp) {
    console.log('Success', resp);
	$scope.items = resp.data.items;
    $scope.playvideo = function(id){
        console.log("VideoID: " + id);
    }
            
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})

.controller('FacebookCtrl',function($scope,$http,$timeout){
    $scope.feed  = {};
    $http.get('https://graph.facebook.com/radioopendimi/feed?fields=full_picture,type,source,message,caption,name,link,likes,shares&access_token=575059922614316|bcc9e098f7c4fbf0d19171bbf6d6a6b7').then(function(resp){
        $scope.news = resp.data.data;
        $scope.feed = resp.data.data;
        console.log('Success: ',resp);
    }, function(err){
        console.error('Error: ',err);
    });
    //Graph API Get Request: https://graph.facebook.com/radioopendimi/feed?access_token=575059922614316|bcc9e098f7c4fbf0d19171bbf6d6a6b7
    
    $scope.refresh = function (){
        console.log('Refreshing!');
        $timeout(function() {
      //simulate async response
      $http.get('https://graph.facebook.com/radioopendimi/feed?fields=full_picture,type,source,message,caption,name,link,likes,shares&access_token=575059922614316|bcc9e098f7c4fbf0d19171bbf6d6a6b7').then(function(resp){
        //$scope.news = resp.data.data;
        $scope.feed = resp.data.data;
        console.log('Success: ',resp);
    }, function(err){
        console.error('Error: ',err);
    });

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000); //end timeout
    
    };
    
    $scope.getSrc = function(url){
        var res = url.replace("autoplay=1","autoplay=0");
        return res;
    }
    
    $scope.channel1 = false;
    $scope.channel2 = false;
    
    $scope.play = function(url,kanali){
      document.getElementById("audio-player").src = url;
      document.getElementById("audio-player").play();
      console.log(kanali);
     
      if (kanali == "1"){
          $scope.channel1 = true;
          $scope.channel2 = false;
          //console.log("1st if ID");
      } else if (kanali == "2"){
          $scope.channel1 = false;
          $scope.channel2 = true;
         // console.log("2nd if");
      }
    }
    
    
    $scope.stop = function(){
        document.getElementById("audio-player").pause();
        document.getElementById("audio-player").src = "";
    }
    
    /* Cordova Streaming PLugin */
      var audioUrl = 'http://85.93.88.146:8000/;$type=mp3';
// Play an audio file with options (all options optional)
  var options = {
    bgColor: "#eee",
    successCallback: function() {
      console.log("Player closed without error.");
    },
    errorCallback: function(errMsg) {
      console.log("Error! " + errMsg);
    }
  };
  window.plugins.streamingMedia.playAudio(audioUrl, options);
});


