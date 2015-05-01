
angular.module('StromDirectives', [
	])

.directive('navBar', [function(){
	// Runs during compile
	return {	
		restrict: 'E', 
		templateUrl:'html/nav-bar.html'
	};
}])
.directive('menuFiltro', [function(){
	// Runs during compile
	return {	
		restrict: 'E', 
		templateUrl:'html/menuFiltro.html',
		controller:['$scope', function ($scope){
			$scope.gate='';
			$scope.botones=[
							{nombre:'En proceso',filtro:'En Atencion',icono:''},
							{nombre:'Atendido',filtro:'Atendido',icono:''},
							{nombre:'Pendiente',filtro:'Pendiente por Atencion',icono:''},
			];
			$scope.filtraTurno = function(property){
				$scope.gate = property;
			};
		}]
	};
}])
.directive('aCordeon', [function(){
	// Runs during compile
	return {	
		restrict: 'E', 
		templateUrl:'html/acordeon.html',
		controller:['$scope', function ($scope){
			
		}]
	};
}])
.directive('acordeonTurnos', [function(){
	// Runs during compile
	return {	
		restrict: 'E', 
		templateUrl:'html/acordeonTurnos.html',
		controller:['$scope', function ($scope){
			
		}]
	};
}])
.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

  function link(scope, element, attrs) {
    var formato,
        timeoutId;

    function updateTime() {
      element.text(dateFilter(new Date(), formato));
    }

    scope.$watch(attrs.myCurrentTime, function(value) {
      formato = value;
      console.log(value);
      updateTime();
    });

    element.on('$destroy', function() {
      $interval.cancel(timeoutId);
    });

    // start the UI update process; save the timeoutId for canceling
    timeoutId = $interval(function() {
      updateTime(); // update DOM
    }, 1000);
  }

  return {
  	restrict:'A',
  	link: link,
  	controller:['$scope', function($scope) {
  		$scope.format = 'h:mm:ss a';
  	}]
  };
}]);