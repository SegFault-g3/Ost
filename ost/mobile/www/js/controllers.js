angular.module('starter.controllers', ['wakanda'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup, $wakanda) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $wakanda.init().then(function (ds)
  {
  	ds.Chef.$all().$promise.then(function(event_chef)
    {
        $scope.table_chef = event_chef.result;
    });
    ds.Employe.$all().$promise.then(function(event_employe)
    {
    	$scope.table_employe = event_employe.result;
    });
    ds.Sous_Chef.$all().$promise.then(function(event_sschef)
    {
    	$scope.table_sschef = event_sschef.result;
    });
  console.log(ds.Employe);
  $scope.loginData = {};
  //--------------------------------------------
   $scope.login = function(user) {
		if(typeof(user)=='undefined'){
			$scope.showAlert('Please fill username and password to proceed.');	
			return false;
		}
		var j = $scope.table[0].ID - 1;
		while (j == $scope.table[j].ID)
		{
			console.log($scope.table[j].ID)
			j++;
		}
		var i = 0;
		var indic = 0;
		while (indic == 0 && user.username != $scope.table[i].email && user.password != $scope.table[i].pass)
		{
			if (i == $scope.table[j].ID)
			{
				indic = -1;
			}
			i++
		}
		if(user.username==$scope.table[i].email && user.password==$scope.table[i].pass){
			$location.path('/app/dashboard');
		}
		else{
			$scope.showAlert('Invalid username or password.');	
		}
		
	};
  //--------------------------------------------
  $scope.logout = function() {   $location.path('/app/login');   };
  //--------------------------------------------
   // An alert dialog
	 $scope.showAlert = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Warning Message',
		 template: msg
	   });
	 };
  //--------------------------------------------
})
})

.controller('ProfilesCtrl', function($scope) {
})

.controller('ProfileCtrl', function($scope, $stateParams) {
})

.controller('DashCtrl', function($scope, $stateParams, $wakanda)
{
	$wakanda.init().then(function(ds2)
	{
		$scope.ID = [];
		$scope.prenom = [];
		$scope.nom = [];
		$scope.entreprise = [];
		$scope.poste = [];
		$scope.description = [];
		$scope.image = [];
		var i = 0;
		ds2.People1.$all().$promise.then(function(event)
		{
			$scope.tableau = event.result;
			while ($scope.tableau.length > i)
			{
				$scope.ID[i] = $scope.tableau[i].ID;
				$scope.prenom[i] = $scope.tableau[i].Prenom;
				$scope.nom[i] = $scope.tableau[i].Nom;
				$scope.entreprise[i] = $scope.tableau[i].Entreprise;
				$scope.poste[i] = $scope.tableau[i].Poste;
				$scope.description[i] = $scope.tableau[i].Description;
				$scope.image[i] = $scope.tableau[i].Image;
				console.log($scope.poste[i]);
				i++;
			}
		})
	})
});
