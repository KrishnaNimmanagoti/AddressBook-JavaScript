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
                throw new Error;
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

function getNoOfContacts(contactArrayToBePrint) {
    const count = contactArrayToBePrint.reduce((counter, obj) => {
        counter += 1;
        return counter;
    }, 0);
    console.log("\nNumber of Contacts are: " + count);
}

function searchPersonInCityOrState() {
    let stateOrCityName = userInput.question("Enter City or state Name: ");
    let personFirstName = userInput.question("Enter Person Name: ");
    let searchedContacts = addressBook.filter((contact) => (contact.contactDetails[0] == personFirstName && (contact.contactDetails[3] == stateOrCityName | contact.contactDetails[4] == stateOrCityName)));
    if (searchedContacts.length == 0)
        console.log("\nThe contact with name " + personFirstName + " is not in " + stateOrCityName);
    else
        console.log("\nContact is available: \n");
    console.log(searchedContacts);
}

function viewPersonsInCityOrState() {
    let stateOrCityName = userInput.question("\nEnter City or state Name: ");
    let savedSearchedContacts = addressBook.filter((contact) => (contact.contactDetails[3] == stateOrCityName | contact.contactDetails[4] == stateOrCityName));
    if (savedSearchedContacts.length == 0)
        console.log("\nNo contacts in city or state: " + stateOrCityName);
    else
        console.log("\n" + savedSearchedContacts.map(contact => contact.contactDetails[0]));
    return savedSearchedContacts;
}

let sortByPersonsName = (indexOfContactDetails) => {
    let allFirstNameInContacts = addressBook.map(contactObject => contactObject.contactDetails[indexOfContactDetails]).sort();
    return allFirstNameInContacts;
}

function sortEntriesByCityOrState(indexOfContactDetails) {
    console.log();
    let allCityOrStateOrZip = sortByPersonsName(indexOfContactDetails);
    let uniqueArr = [];
    for (let i of allCityOrStateOrZip) {
        if (uniqueArr.indexOf(i) === -1) {
            uniqueArr.push(i);
        }
    }
    uniqueArr.sort();
    for (let state of uniqueArr) {
        let personInSpecificCity = new Array();
        let i = 0;
        for (let contact of addressBook) {
            if (state == contact.contactDetails[indexOfContactDetails]) {
                personInSpecificCity.push(contact.contactDetails[0]);
            }
        }
        personInSpecificCity.sort();
        console.log(state);
        for (person of personInSpecificCity) {
            console.log(person);
        }
    }
}

function addressBookService() {
    let userChoice;
    do {
        userChoice = userInput.question("\n******Menu******\n\nEnter 1: Create new Contact \nEnter 2: To Print Contacts " +
            "\nEnter 3: To Edit a Contact \nEnter 4: To Delete a Contact \nEnter 5: To get count of contacts in Addressbook" +
            "\nEnter 6: To Search person in a City or State \nEnter 7: To View Persons in  City or State " +
            "\nEnter 8: TO get no.of persons in city or state \nEnter 9: To sort entries by person names " +
            "\nEnter 10: To Sort By City or State or Zip \nEnter 0: To Exit: \n");
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
                getNoOfContacts(addressBook);
                break;
            case "6":
                searchPersonInCityOrState();
                break;
            case "7":
                viewPersonsInCityOrState();
                break;
            case "8":
                getNoOfContacts(viewPersonsInCityOrState());
                break;
            case "9":
                console.log("Persons after Sorting: \n" + sortByPersonsName(3));
                break;
            case "10":
                let userChoice = (parseInt(userInput.question("\nEnter 1: To Sort by City: \nEnter 2: To Sort by State: \nEnter 3: To Sort by Zip: "))) + 2;
                sortEntriesByCityOrState(userChoice);
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