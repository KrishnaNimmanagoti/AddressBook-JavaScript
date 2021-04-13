const usrInput = require("readline-sync");
const fields = ["firstName", "lastName", "address", "city", "state", "zipCode", "phoneNumber", "email"];
const regexPattern = ["^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[0-9]{6,}", "^[0-9]{2}[ ][6-9]{1}[0-9]{9}$", "^[A-Za-z0-9+-]+(\\.[A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]{2,}){1,2}$"]

var Contact = function (contactDetails) {
    this.contactDetails = contactDetails;
    this.printContact = function () {
        console.log(contact);
    }
}

let contactDetails = new Array()

function createContact() {
    let temp;
    for (var i = 0; i <= fields.length - 1; i++) {
        let input = true;
        while (input) {
            temp = usrInput.question(`Enter ${fields[i]}: `);
            if (temp.match(regexPattern[i])) {
                contactDetails[i] = temp;
                input = false;
            }
            else {
                try {
                    throw new Error('Invalid Input Enter a valid input');
                }
                catch (error) {
                    console.log(error);
                    continue;
                }
            }

        }
    }
}

createContact();

let contact = new Contact(contactDetails)
contact.printContact();