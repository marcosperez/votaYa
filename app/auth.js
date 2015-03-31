//factoria para guardar y eliminar sesiones con sessionStorage
app.factory("sesionesControl", function(){
    return {
        //obtenemos una sesión //getter
        get : function(key) {
            return sessionStorage.getItem(key)
        },
        //creamos una sesión //setter
        set : function(key, val) {
            return sessionStorage.setItem(key, val)
        },
        //limpiamos una sesión
        unset : function(key) {
            return sessionStorage.removeItem(key)
        }
    }
})
 
//esto simplemente es para lanzar un mensaje si el login falla, se puede extender para darle más uso
app.factory("mensajesFlash", function($rootScope){
    return {
        show : function(message){
            $rootScope.flash = message;
        },
        clear : function(){
            $rootScope.flash = "";
        }
    }
});
 
//factoria para loguear y desloguear usuarios en angularjs
app.factory("authUsers", function($http, $location, sesionesControl, mensajesFlash){
    var cacheSession = function(usuario){
        sesionesControl.set("userLogin", true);
        sesionesControl.set("usuario", usuario);
    }
    var unCacheSession = function(){
        sesionesControl.unset("userLogin");
        sesionesControl.unset("usuario");
    }
   var url = "https://votosya-focoman.c9.io/";

    return {
        //retornamos la función login de la factoria authUsers para loguearnos correctamente
        login : function(user){
            console.log("Login" + user.usuario);  
                return $http.jsonp(url+'user/autenticacion'+ "?callback=JSON_CALLBACK",{
                params: {
                    usuario: user.usuario,
                    pass: user.password
                }
            }).success(function(data){
                if(data.respuesta == "success"){
                    //si todo ha ido bien limpiamos los mensajes flash
                    mensajesFlash.clear();
                    //creamos la sesión con el email del usuario
                    cacheSession(user.usuario);
                    //mandamos a la home
                    $location.path("/home");
                }else if(data.respuesta == "incomplete_form"){
                    mensajesFlash.show("Debes introducir bien los datos del formulario");
                }else if(data.respuesta == "failed"){
                    mensajesFlash.show("El email o el password introducidos son incorrectos, inténtalo de nuevo.");
                }
            }).error(function(){
                $location.path("/")
            })
        },
        //función para cerrar la sesión del usuario
        logout : function(){
            return $http.jsonp(url+'user/logout' + "?callback=JSON_CALLBACK"
            ).success(function(){
                //eliminamos la sesión de sessionStorage
                unCacheSession();
                $location.path("/view1");
            });
        },
        //función que comprueba si la sesión userLogin almacenada en sesionStorage existe
        isLoggedIn : function(){
            return sesionesControl.get("userLogin");
        },
        //funcion que determina si el nombre de usuario existe o no
        sigin: function(user){
            $http.jsonp(url+'user/registro'+ "?callback=JSON_CALLBACK",{
                params: {
                    usuario: user.usuario,
                    pass: user.password,
                }
            })
            .success(function(data){
                //console.log(data)
                return data;
            })
            .error(function(data){
                console.log("Error"+data);
                return {respuesta:"error", error:data}
            });
            
        }
    }
})