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

var usersTable = document.createElement("table");
var usersTablerow = usersTable.createTHead().insertRow();

for(let eachHeader of usersTableHeaders) {
    var th = document.createElement("th");
    th.textContent = eachHeader;
    usersTablerow.appendChild(th);
}

for(let eachUser of usersData) {
    console.log(eachUser)
    var eachRow = usersTable.insertRow();
    
    var cell1 = eachRow.insertCell();
    cell1.textContent = eachUser.roomNo;
    var cell2 = eachRow.insertCell();
    cell2.textContent = eachUser.name;
    var cell3 = eachRow.insertCell();
    cell3.textContent = eachUser.phone;
}

btnAddNewUser.addEventListener("click", f1);

var mainTab = document.getElementsByClassName("main")[0];
mainTab.appendChild(btnAddNewUser);
mainTab.appendChild(usersTable)

/*
1. create a form in the top next to add new user 
2. have  


*/


function f1() {
    document.getElementsByClassName("dialog")[0].style = "visibility: visible";
}