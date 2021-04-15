const userInput = require("readline-sync");
const fields = ["firstName", "lastName", "address", "city", "state", "zipCode", "phoneNumber", "email"];
const regexPattern = ["^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[0-9]{6,}", "^[0-9]{2}[ ][6-9]{1}[0-9]{9}$", "^[A-Za-z0-9+-]+(\\.[A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]{2,}){1,2}$"]
let addressBook = new Array();

var Contact = function (contactDetails) {
    this.contactDetails = contactDetails;
}

function createContact() {
    let contactDetails = new Array();
    for (var i = 0; i <= fields.length - 1; i++) {
        contactDetails[i] = patternMatch(i);
    }
    let contact = new Contact(contactDetails);
    console.log(contact);
    addressBook.push(contact);
}

function patternMatch(indexOfregexPattern) {
    let check = false;
    while (true) {
        let userInputData = userInput.question(`Enter ${fields[indexOfregexPattern]}: `);
        if (indexOfregexPattern == 0) {
            for (let i = 0; i < addressBook.length; i++) {
                if (addressBook[i].contactDetails[0] == userInputData) {
                    console.log("Contact is already exists with this name: " + userInputData + ", Please try other name: ");
                    check = true;
                    break;
                }
            }
        }
        if (check) {
            check = false;
            continue;
        }
        try {
            if (userInputData.match(regexPattern[indexOfregexPattern]))
                return userInputData;
            else
                throw Error();
        }
        catch (error) {
            console.log('\nInvalid Input Enter a valid input\n');
        }
    }
}

function printContactNames() {
    for (let i = 0; i < addressBook.length; i++) {
        console.log((i + 1) + ". " + (addressBook[i].contactDetails[0]));
    }
}

function printContacts() {
    printContactNames();
    let userEntry = userInput.question();
    for (let i = 0; i < fields.length; i++) {
        console.log((i + 1) + ". " + fields[i] + ": " + addressBook[userEntry - 1].contactDetails[i]);
    }
    return userEntry - 1;
}

function editContact() {
    console.log("Select which contact to be edited: ");
    let indexOfContact = printContacts();
    let indexOfContactField = (userInput.question("\nEnter which field to be edited: ") - 1);
    addressBook[indexOfContact].contactDetails[indexOfContactField] = patternMatch(indexOfContactField);
    console.log(addressBook[indexOfContact].contactDetails + "\nContact Edited Successfully");
}

function deleteContactByName() {
    printContactNames();
    let indexOfNameToBeDelete = (userInput.question("Select a name which contact to be delete: ")) - 1;
    addressBook.splice(indexOfNameToBeDelete, 1);
    console.log("Contact deleted Successfully");
    printContactNames();
}

function getNoOfContacts() {
    const count = addressBook.reduce((counter, obj) => {
        counter += 1;
        return counter;
    }, 0);
    console.log("Number of Contacts in Address Book: " + count);
}

function searcPersonInCityOrState() {
    let stateOrCityName = userInput.question("Enter City or state Name: ");
    let personFirstName = userInput.question("Enter Person Name: ");
    let searchedContacts = addressBook.filter((contact) => (contact.contactDetails[0] == personFirstName && (contact.contactDetails[3] == stateOrCityName | contact.contactDetails[4] == stateOrCityName)));
    if(searchedContacts.length == 0)
        console.log("\nThe contact with name " + personFirstName + " is not in " + stateOrCityName);
    else
        console.log("Contact is available: \n" + searchedContacts);
}

function addressBookService() {
    let userChoice;
    do {
        userChoice = userInput.question("\n******Menu*****\nEnter 1: Create new Contact \nEnter 2: To Print Contacts " +
            "\nEnter 3: To Edit a Contact \nEnter 4: To Delete a Contact \nEnter 5: To get count of contacts in Addressbook" +
            "\nEnter 6: To Search person in a City or State \nEnter 0: To Exit: \n");
        switch (userChoice) {
            case "1":
                let userEntry;
                do {
                    createContact();
                    userEntry = userInput.question("\nEnter 1: To Create more Contacts: \nEnter 2: To go back to menu: ");
                } while (userEntry == 1);
                break;
            case "2":
                console.log("Select a contact to print details: ");
                printContacts();
                break;
            case "3":
                editContact();
                break;
            case "4":
                deleteContactByName();
                break;
            case "5":
                getNoOfContacts();
                break;
            case "6":
                searcPersonInCityOrState();
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
