angular.module('fStrom',[
	'ui.router',
	'StromDirectives',
	'StromServices',
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
  .state('Administrador', {
  	url: "/Administrador",
  	templateUrl: "html/Administrador.html"      
  })  
})

.controller('DatosCtrl',['$scope','$http','socketio',function ($scope,$http,socketio){

	// Parte destinada a la asignación de un codigo unico a cada turno
	var numeroTurno = 1;
	$scope.newTurno ={};
	// Parte destinada a la asignación de un codigo unico a cada turno
	var currentTurno='';

	$scope.Consolidado =[]; // Absolutamente todos los turnos generados sin discriminar estados

	$scope.sessionItem = {}; // relacionado a atencion que se la da por parte de un asesor durantu su session
	
	$scope.atencion = {}; // simular la terminal del asesor donde al tomar le turno debe aginarsele el codigo del asesor y terminal al objeto
	$scope.answers = [];
	$scope.tiendas =[];
	$scope.asesor={};

	$http.get('js/Json/ServiciosCola.json').success(function (data){
		$scope.servicios = data;
	});
	$http.get('js/Json/Subservicios.json').success(function (data){
		$scope.subservicios = data;		
	});
	//$http.get('js/Json/Tiendas.json').success(function (data){
		//$scope.tiendas = data;		
	//});

	$http.get('js/Json/Usuarios-asesores.json').success(function (data){
		$scope.asesores = data;		
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
			$scope.newTurno = {};
			// parte para incrementar el numero del codigo del turno
			numeroTurno = numeroTurno + 1;		
			$scope.newTurno.consecutivo = numeroTurno;

			refresh();
		});
	};
	// prueba de toma de turno con objeto asesor pleno
	$scope.tomarTurno = function(id){
		currentTurno = id;
		console.log(currentTurno);
			$http.put('/takeTurnos/'+ currentTurno,$scope.asesor.toma).success(function (res){
				$scope.sessionItem = res;
				console.log('Se ha tomado el turno',$scope.sessionItem);
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
	
	// experimento socket io 
	socketio.on('NewTurno',function (){
		refresh();
	});

}]);