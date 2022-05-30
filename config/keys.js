var username = "m_khattri"; // username
var password = "A00432768"; // password
var localHost = "127.0.0.1"; //local host IP address
var localPort = "27017"; // port number of the local port
var database = "m_khattri"; // name of database

// // create the credentials string used for database connection
// var credentialsString ="mongodb://"+ username +":" +password +"@" +localHost +":"+localPort +
// "/" +database;
var credentialsString ="mongodb+srv://mahesh:dontforget@cluster0.8yo3t.mongodb.net/Mahesh"


module.exports={
    MongoURI:credentialsString,
}