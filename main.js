var usersData = [
    {name: "bhanu", roomNo: 200, phone: "9009878788"},
    {name: "meher", roomNo: 2001, phone: "9009878788"},
    {name: "mouli", roomNo: 200, phone: "9009878788"},
    {name: "meghana", roomNo: 200, phone: "9009878788"},
    {name: "sai", roomNo: 200, phone: "9009878788"}
];

var usersTableHeaders = ["Room No", "Name", "Phone no"];

var btnAddNewUser = document.createElement("button");
btnAddNewUser.textContent = "Add New User";
btnAddNewUser.addEventListener("click", displayNewUserDialog);

var usersTable = document.createElement("table");
usersTable.className = "usersTable";
var usersTablerow = usersTable.createTHead().insertRow();

for(let eachHeader of usersTableHeaders) {
    var th = document.createElement("th");
    th.textContent = eachHeader;
    usersTablerow.appendChild(th);
}

for(let eachUser of usersData) {
    var eachRow = usersTable.insertRow();
    
    var cell1 = eachRow.insertCell();
    cell1.textContent = eachUser.roomNo;
    var cell2 = eachRow.insertCell();
    cell2.textContent = eachUser.name;
    var cell3 = eachRow.insertCell();
    cell3.textContent = eachUser.phone;

    var cell4 = eachRow.insertCell();
    cell4.innerHTML = `<div><i class="bi bi-pencil-square"></i></div>`;
    cell4.addEventListener("click", updateUser);
    var cell5 = eachRow.insertCell();
    cell5.innerHTML = `<div><i class="bi bi-trash3-fill"></i></div>`;
    cell5.addEventListener("click", deleteUser);
}


var mainTab = document.getElementsByClassName("main")[0];
mainTab.appendChild(btnAddNewUser);
mainTab.appendChild(usersTable)


var dialogElement = document.getElementsByClassName("dialog")[0];

function displayNewUserDialog() {
    dialogElement.style = "display:block; ";
    dialogElement.innerHTML = "Add new user<br>";

    var errorPrompt = document.createElement("div");
    errorPrompt.className = "errorPrompt"
    errorPrompt.style = "color:red;"
    var roomNoInput = document.createElement("input");
    roomNoInput.className = "roomNoInput";
    roomNoInput.placeholder = "Enter Room No";
    var nameInput = document.createElement("input");
    nameInput.className = "nameInput"
    nameInput.placeholder = "Enter Name";
    var phoneNoInput = document.createElement("input");
    phoneNoInput.className = "phoneNoInput"
    phoneNoInput.placeholder = "Enter Phone No";

    var closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", closeDialog);
    var saveBtn = document.createElement("button");
    saveBtn.textContent = "Add User";

    saveBtn.addEventListener("click", addNewUser)

    dialogElement.appendChild(errorPrompt);
    dialogElement.appendChild(roomNoInput);
    dialogElement.appendChild(nameInput);
    dialogElement.appendChild(phoneNoInput);
    dialogElement.appendChild(closeBtn);
    dialogElement.appendChild(saveBtn);

}

function closeDialog() {
    dialogElement.style = "display:none;";
}

function addNewUser() {
    var roomNoInput = document.getElementsByClassName("roomNoInput")[0];
    var nameInput = document.getElementsByClassName("nameInput")[0];
    var phoneNoInput = document.getElementsByClassName("phoneNoInput")[0];
    var errorPrompt = document.getElementsByClassName("errorPrompt")[0];
    
    var usersTable = document.getElementsByClassName("usersTable")[0];

    if(roomNoInput.value != "" && nameInput.value != "" && phoneNoInput.value != "") {
        errorPrompt.textContent = "";
        var row = usersTable.insertRow();

        row.insertCell().textContent = roomNoInput.value;
        row.insertCell().textContent = nameInput.value;
        row.insertCell().textContent = phoneNoInput.value;
        usersData.push({name: nameInput.value, roomNo: roomNoInput.value, phoneNo:phoneNoInput.value })
        console.log(usersData)
        dialogElement.textContent = "User added Successfully";
        setTimeout(removeDialog, 5000);
    } else {
        errorPrompt.textContent = "Enter all the input fields";
    }
}

function removeDialog() {
    dialogElement.style = "display:nonex"
}

