app.factory('utiles', [function () {

	return {
		cargar:function(domElementClass){
			domElementClass.append("<div class='cargando'><img class='center' src='http://www.elvascokaraoke.com.ar/graficos/cargando.gif'> </div>");
		}
	};
}])