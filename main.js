var mainTab = document.getElementsByClassName("main")[0];

// Users region
var usersData = [
    {name: "bhanu", roomNo: 200, phone: "9009878788"},
    {name: "meher", roomNo: 2001, phone: "9009878788"},
    {name: "mouli", roomNo: 200, phone: "9009878788"},
    {name: "meghana", roomNo: 200, phone: "9009878788"},
    {name: "sai", roomNo: 200, phone: "9009878788"}
];

var usersTab = document.getElementsByClassName("usersTab")[0];
usersTab.addEventListener("click", displayUsersTab);

function displayUsersTab() {
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

    mainTab.innerHTML = "";
    mainTab.appendChild(btnAddNewUser);
    mainTab.appendChild(usersTable)

}

function updateUser(e) {
    let tempRow = e.target.parentNode.parentNode.parentNode;
    console.dir(tempRow);
    roomNo = tempRow.children[0].textContent;
    phoneNo = tempRow.children[1].textContent;
    var name = tempRow.children[2].textContent;

    console.log(roomNo, phoneNo, name)
    tempRow.remove();

}

function deleteUser(e) {
    console.log(e.target.parentNode.parentNode.parentNode);
    e.target.parentNode.parentNode.parentNode.remove();
}

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
        var cell4 = row.insertCell();
        cell4.innerHTML = `<div><i class="bi bi-pencil-square"></i></div>`;
        cell4.addEventListener("click", updateUser);
        var cell5 = row.insertCell();
        cell5.innerHTML = `<div><i class="bi bi-trash3-fill"></i></div>`;
        cell5.addEventListener("click", deleteUser);
        usersData.push({name: nameInput.value, roomNo: roomNoInput.value, phoneNo:phoneNoInput.value })
        console.log(usersData)
        dialogElement.textContent = "User added Successfully";
        setTimeout(removeDialog, 5000);
    } else {
        errorPrompt.textContent = "Enter all the input fields";
    }
}

function removeDialog() {
    dialogElement.style = "display:none"
}

// Users region ends


//Dashboard region starts

let dashboardTab = document.getElementsByClassName("dashboardTab")[0];

dashboardTab.addEventListener("click", displayDashBoardTab);

pendingPaymentsArr = [];
updateUserArr = [];
newUsersArr = [];

function displayDashBoardTab() {
    mainTab.innerHTML = "";
    console.log("Dashboard")


    let tabs = document.createElement("div");
    tabs.className = "tabInterface";

    let paymentPendingUsersTab = document.createElement("div");
    paymentPendingUsersTab.className = "paymentPendingUsersTab eachTab activeUsersTab";
    paymentPendingUsersTab.textContent = "Pending Payments";
    paymentPendingUsersTab.addEventListener("click", displayUsersDashboardTable);

    let upcomingPaymentUsersTab = document.createElement("div");
    upcomingPaymentUsersTab.className = "upcomingPaymentUsersTab eachTab";
    upcomingPaymentUsersTab.textContent = "Upcoming Payments";
    upcomingPaymentUsersTab.addEventListener("click", displayUsersDashboardTable);

    let newUsersTab = document.createElement("div");
    newUsersTab.className = "newUsersTab eachTab";
    newUsersTab.textContent = "New Users";
    newUsersTab.addEventListener("click", displayUsersDashboardTable);

    tabs.appendChild(paymentPendingUsersTab);
    tabs.appendChild(upcomingPaymentUsersTab);
    tabs.appendChild(newUsersTab);
    
    fetchUsersData().then(usersData => {
        for(let e of usersData) {
            if(e.roomNo <= 300 ) {
                pendingPaymentsArr.push(e);
            } else if (e.roomNo <= 500) {
                updateUserArr.push(e)
            } else if (e.roomNo <= 700) {
                newUsersArr.push(e)
            }
        }
      }).catch(error => {
        console.log('Error:', error);
      });
    
    

    
    
    
    
    mainTab.appendChild(tabs);
}


function displayUsersDashboardTable(e) {
    updateActiveTabTheme(e.target)
    updateDashboardTableData(e.target);
}

function updateDashboardTableData(target) {
    // let allDataRows = document.getElementsByClassName("dataRow");
    // let usersLength = allDataRows.length;
    // for(let i = 0; i<usersLength; i++) {
    //     allDataRows[0].remove();
    // }

    if(target.classList.contains("upcomingPaymentUsersTab")) {
        usersData = updateUserArr;
    } else if(target.classList.contains("paymentPendingUsersTab")) {
        usersData = pendingPaymentsArr;
    } else if(target.classList.contains("newUsersTab")) {
        usersData = newUsersArr;
    }

    document.getElementsByClassName("dashboardUsersTable")[0]?.remove();

    var usersTableHeaders = ["Room No", "Name", "Phone no" ];
    var dashboardUsersTable = document.createElement("table");
    dashboardUsersTable.className = "dashboardUsersTable";
    var usersTablerow = dashboardUsersTable.createTHead().insertRow();
    for(let eachHeader of usersTableHeaders) {
        var th = document.createElement("th");
        th.textContent = eachHeader;
        usersTablerow.appendChild(th);
    }

    for(let eachUser of usersData) {
        var eachRow = dashboardUsersTable.insertRow();
        eachRow.classList.add("dataRow");

        var cell1 = eachRow.insertCell();
        cell1.textContent = eachUser.roomNo;
        var cell2 = eachRow.insertCell();
        cell2.textContent = eachUser.name;
        var cell3 = eachRow.insertCell();
        cell3.textContent = eachUser.phone;
    }

    mainTab.appendChild(dashboardUsersTable);
}

function updateActiveTabTheme(target) {
    let allTabs = document.getElementsByClassName("eachTab");
    for(let eachTab of allTabs) {
        eachTab.classList.remove("activeUsersTab")
    }

    target.classList.add("activeUsersTab")

}



function fetchUsersData() {

  return new Promise((resolve, reject) => {

    // Simulating an API call with setTimeout

    setTimeout(() => {

      const usersData = [    {name: "bhanu", roomNo: 200, phone: "9009878788", doj: "1689377161"},
      {name: "meher", roomNo: 300, phone: "9009878788", doj: "1689377161" },
      {name: "mouli", roomNo: 400, phone: "9009878788", doj: "1689377161"},
      {name: "meghana", roomNo: 500, phone: "9009878788"},
      {name: "sai", roomNo: 600, phone: "9009878788"}]
      resolve(usersData); // Resolving the promise with the weather data

    }, 2000); // Simulating a delay of 2 seconds

  });

}



// Consuming the promise and displaying the weather


//Dashboard region ends


// fetchUsersData().then((data) => {
//     console.log(data);
// }).then().then()

async function FetchData() {
    let value = await fetchUsersData();
    let value2 = fetchUsersData();

    console.log(value)
    console.log(value2)
}

(function () {
    console.log("Helloworld!");
})();


let a = (data) => {
    console.log(data)
}

a("Helloworld");


for(let eachuser in usersData) {
    console.log(usersData[eachuser])
}

function windowHistory() {
    
    console.log(window.location.href)
}

windowHistory();