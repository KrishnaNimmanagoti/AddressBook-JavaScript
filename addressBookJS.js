const usrInput = require("readline-sync");
const fields =["firstName", "lastName", "address", "city", "state", "zipCode", "phoneNumber", "email"];

var Contact = function(values){
    this.values = values;
}

let values = new Array()
for(var i = 0; i <= fields.length - 1 ; i++){
    values[i] = usrInput.question(`Enter ${fields[i]}: `);
}

let contact = new Contact(values)

console.log(contact);