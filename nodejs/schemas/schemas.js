var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/guerra');
var db = mongoose.connection;

include('schemas/usuario.js')