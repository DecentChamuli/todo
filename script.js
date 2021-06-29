function getAndupdate(){
    let tit = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') == null){
        itemsJsonArray = [];
        itemsJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    }
    else{
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        itemsJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    }
    // console.log("Task Added" );
    update();
}


function update(){
    if (localStorage.getItem('itemsJson') == null){
        itemsJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    }
    else{
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    }

    // Fetching Data to Table
    let tableBody = document.getElementById("tablebody");
    let str = "";
    itemsJsonArray.forEach((element, index) => {
        str += `
            <tr>
              <th scope="row">${index+1}</th>
              <td>${element[0]}</td>
              <td>${element[1]}</td>
              <td><buttton class="btn btn-sm btn-outline-danger" onclick="deleted(${index})">Delete</buttton></td>
            </tr>`;
    });
    tablebody.innerHTML = str;
}

let addTask = document.getElementById("add-task");
addTask.addEventListener("click", getAndupdate);
update();

function deleted(itemIndex){
    // console.log("Deleted", itemIndex);
    itemsJsonArrayStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    // Delete itemIndex from Array
    itemsJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    update();

}