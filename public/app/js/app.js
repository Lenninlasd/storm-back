angular.module('fStrom',[
	'ui.router',
	'StromDirectives',
	'ngMaterial'
	])

.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/Cliente");
  // Now set up the states
  $stateProvider
  .state('Cliente', {
  	url: "/Cliente",
  	templateUrl: "html/Cliente.html"
  })
  .state('Asesor', {
  	url: "/Asesor",
  	templateUrl: "html/Asesor.html"      
  })  
  .state('Supervisor', {
  	url: "/Supervisor",
  	templateUrl: "html/Supervisor.html"      
  })  
})

.controller('DatosCtrl',['$scope','$http',function ($scope,$http){

	// experimento del cronometro;
	var startTime = 0;
	var start = 0;
	var end = 0;
	var diff = 0;
	var timerID = 0;
	// experimento del cronometro;

	// Parte destinada a la asignación de un codigo unico a cada turno
	var numeroTurno = 1;
	var codigoTienda = 'AB0';
	var codigo_turno = codigoTienda + numeroTurno;	
	$scope.newTurno = {codigo_turno:codigo_turno};
	console.log($scope.newTurno.codigo_turno);
	// Parte destinada a la asignación de un codigo unico a cada turno

	var currentTurno='';

	$scope.Consolidado =[]; // Absolutamente todos los turnos generados sin discriminar estados

	$scope.sessionItem = {}; // relacionado a atencion que se la da por parte de un asesor durantu su session
	
	$scope.atencion = {}; // simular la terminal del asesor donde al tomar le turno debe aginarsele el codigo del asesor y terminal al objeto
	$scope.answers = [];

	$http.get('js/Json/ServiciosCola.json').success(function (data){
		$scope.servicios = data;
	});
	$http.get('js/Json/subservicios.json').success(function (data){
		$scope.subservicios = data;		
	});

	refresh = function(){		
		$http.get('/Turnos').success(function (res){
			$scope.answers = res;
			$scope.Consolidado = res;			
		});
	};

	refresh();

	$scope.addTurno = function(newTurno){
		console.log(newTurno);
		$http.post('/Turnos',newTurno).success(function (res){
			console.log('Turno creado:',res);
			$scope.newTurno={};
			// parte para incrementar el numero del codigo del turno
			numeroTurno = numeroTurno + 1;
			codigo_turno = codigoTienda +numeroTurno;			
			$scope.newTurno.codigo_turno = codigo_turno;

			refresh();
		});
	};

	$scope.tomarTurno = function(id){
		currentTurno = id;
		$http.get('/takeTurnos/'+ currentTurno).success(function (res){
			console.log(res);
			$scope.atencion = res;
			$http.put('/takeTurnos/'+ currentTurno, $scope.atencion).success(function (res){
				console.log('Se ha tomado el turno',res);
				$scope.sessionItem = res.turno.atencion_a_turno;
	
				console.log($scope.sessionItem);
				refresh();
			});

		});
	};

	$scope.updateTurno = function(entra){
		console.log(entra);
		$http.put('/Turnos/'+ currentTurno,entra).success(function (res){
			console.log('entran datos del asesor al turno:',res);
			$scope.atencion = {};
			refresh();
		});
	};

	$scope.guardarTurno = function(obj){
		console.log(obj);
		$http.put('/cerrarTurno/'+ currentTurno,obj).success(function (res){
			console.log('lo ultimo:',res);
			refresh();
		});
	};

	$scope.Cronometro = function(){
		end = new Date();
		diff = end - start;
		diff = new Date(diff);
		var sec = diff.getSeconds();
		var min = diff.getMinutes();
		var hr = diff.getHours()-1;
		if (min < 10){
			min = "0" + min;
		};
		if (sec < 10){
			sec = "0" + sec;
		};
		$scope.tiempo = hr + ":" + min + ":" + sec;
		timerID = setTimeout($scope.Cronometro, 1000);


	};

	$scope.tiempoEspera = function(){
		start = new Date();
		$scope.Cronometro();
	};


	
}]);