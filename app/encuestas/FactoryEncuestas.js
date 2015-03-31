app.factory('factEncuestas', function ($http, $location,$timeout) {
	
	var url = "https://votosya-focoman.c9.io/";

	return {
		crear : function(user,encuesta){
			console.log(user);  
			//console.log(encuesta);  
			$http.jsonp(url+'encuestas/crear'+ "?callback=JSON_CALLBACK",{
				params: {
					usuario: user,
					pregunta:encuesta.pregunta,
					respuestas:encuesta.respuestas,
				}
			}).success(function(data){
				console.log(data);

				//$timeout(function(){
					$location.path("/encuestas/listado");
				//},5000)
				
			}).error(function(){
				alert("No se pudo almacenar la encuesta")
			})
		},
		listado : function(user){
			return $http.jsonp(url+'encuestas/listado'+ "?callback=JSON_CALLBACK",{
				params: {
					usuario: user,
				}
			});
    	},
    	eliminar : function(id){
    		return $http.delete(url+'encuestas/eliminar'+ "?callback=JSON_CALLBACK",{
				params: {
					id: id,
				}
			});
    	}
    }
})