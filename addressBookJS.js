const userInput = require("readline-sync");
const fields = ["firstName", "lastName", "address", "city", "state", "zipCode", "phoneNumber", "email"];
const regexPattern = ["^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[0-9]{6,}", "^[0-9]{2}[ ][6-9]{1}[0-9]{9}$", "^[A-Za-z0-9+-]+(\\.[A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]{2,}){1,2}$"]
let addressBook = new Array();

var Contact = function (contactDetails) {
    this.contactDetails = contactDetails;
}

function createContact() {
    let contactDetails = new Array();
    let temp;
    for (var i = 0; i <= fields.length - 1; i++) {
        let input = true;
        while (input) {
            temp = userInput.question(`Enter ${fields[i]}: `);
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
    let contact = new Contact(contactDetails);
    console.log(contact);
    addressBook.push(contact);
}

function addressBookService() {
    let userChoice;
    do {
        userChoice = userInput.question("\n******Menu*****\nEnter 1: Create new Contact \nEnter 2: To Print Contacts \nEnter 0: To Exit: ");
        switch (userChoice) {
            case "1":
                let userEntry;
                do {
                    createContact();
                    userEntry = userInput.question("Enter 1: To Create more Contacts: \nEnter 2: To go back to menu: ");
                } while (userEntry == 1);
                break;
            case "2":
                console.log(addressBook);
                break;
            case "0":
                userChoice = 0;
                break;
            default:
                console.log("\nInvalid Input please Enter a valid input: \n");
        }
    } while (userChoice != 0);
    console.log("\nThank You");
}

addressBookService();
