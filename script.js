let addTask = document.getElementById("add-task");
addTask.addEventListener("click", getAndupdate);
update();

function EmptyCheck(){
    let locl_str = localStorage.getItem('itemsJson');
    if ((locl_str == null) || (locl_str == "[]")){
        document.getElementById("no-task").style.display = "initial";
        document.getElementById("table-content").style.display = "none";
    }
    else{
        document.getElementById("no-task").style.display = "none";
        document.getElementById("table-content").style.display = "initial";
    }
}

function getAndupdate(){
    let tit = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    if ((!tit.match(/([^\s])/))){
        document.getElementById("title-empty").style.display = "initial";
    }
    else{
        document.getElementById("title-empty").style.display = "none";
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
    }
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
              <td class="todoTitle">${element[0]}</td>
              <td class="todoDesc">${element[1]}</td>
              <td>
                <buttton class="btn btn-sm btn-outline-info mx-1" onclick="editTodo(${index}, event)">Edit</buttton>
                <buttton class="btn btn-sm btn-outline-danger mx-1" onclick="deleted(${index})">Delete</buttton>
              </td>
            </tr>`;
    });
    tablebody.innerHTML = str;
    EmptyCheck();
    document.getElementsByClassName('clear-title')[0].value = '';
    document.getElementsByClassName('clear-desc')[0].value = '';

}

function deleted(itemIndex){
    itemsJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    update();
}
function editTodo(itemIndex, event){
    var editRow = event.currentTarget.parentNode.parentNode
    var allTD = editRow.getElementsByTagName('td')
    editRow.innerHTML = `
    <th scope="row">${itemIndex+1}</th>
    <td><input type="text" value='${allTD[0].innerHTML}' class="form-control px-2 py-1 clear-title" id="changedTitle" placeholder="Title of your TO-DO"></td>
    <td><input type="text" value='${allTD[1].innerHTML}' class="form-control px-2 py-1 clear-title" id="changedDesc" placeholder="Description of your TO-DO"></td>
    <td>
      <buttton class="btn btn-sm btn-outline-success py-1" onclick="changeTodo(${itemIndex})">Save Todo</buttton>
    </td>
    `
}
function clearStorage(){
    localStorage.removeItem('itemsJson')
    update();
}

function changeTodo(itemIndex){
    var title = document.getElementById('changedTitle').value
    var desc = document.getElementById('changedDesc').value

    if(!title.match(/([^\s])/)){
        update()
        return
    }
    var editedTodo = []
    editedTodo.push(title, desc)
    itemsJsonArray.splice(itemIndex, 1, editedTodo)
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    update();
}