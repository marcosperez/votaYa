//mientras corre la aplicación, comprobamos si el usuario tiene acceso a la ruta a la que está accediendo
//como vemos inyectamos authUsers
app.run(function($rootScope, $location, authUsers   ){
    //creamos un array con las rutas que queremos controlar
    var rutasPrivadas = ["/home","/info","/login","/home","/encuestas/listado","/encuestas/crear"];
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function(){
        //si en el array rutasPrivadas existe $location.path(), locationPath en el login
        //es /login, en la home /home etc, o el usuario no ha iniciado sesión, lo volvemos 
        //a dejar en el formulario de login
        if(in_array($location.path(),rutasPrivadas) && !authUsers.isLoggedIn()){
            $location.path("/view1");
        }
        //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
        if(($location.path() === '/view1' || $location.path() === '/registro') && authUsers.isLoggedIn()){
            $location.path("/home");
        }
    })
})

//función in_array que usamos para comprobar si el usuario
//tiene permisos para estar en la ruta actual
function in_array(needle, haystack, argStrict){
  var key = '',
  strict = !! argStrict;
 
  if(strict){
    for(key in haystack){
      if(haystack[key] === needle){
        return true;
      }
    }
  }else{
    for(key in haystack){
      if(haystack[key] == needle){
        return true;
      }
    }
  }
  return false;
}