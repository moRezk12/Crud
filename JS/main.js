let title = document.getElementById("title");
let add = document.getElementById("add");

let span = document.querySelector('span');

let mood = 'add';
let tmp;


title.addEventListener("keyup" , function(event){
    if(event.key == "Enter"){
        renderTask();
    };
})

window.onload = function(){
    title.focus();
};

let AllTasks =[];
if(localStorage.name != null){
    AllTasks = JSON.parse(localStorage.name)
}else
{
    AllTasks = [];
}
//Render User Input
function renderTask()
{
    let value = title.value.toLowerCase();

    if(value.trim() == ''){
        alert('please enter valid data')
    }
    else
    {   
        singletask = {
            task: value.trim(),
        };
        
        if(mood === 'add'){
        
        AllTasks.push(singletask);
       
        }else{
            AllTasks [tmp] = singletask;
            mood = 'add';
            add.innerHTML = 'ADD';
        }
        
        title.value = '';
        readTasks ();
    }

    // save localStorage
    localStorage.setItem('name' , JSON.stringify(AllTasks));
};
//Delete tasks from AllTasks
function deleteData (index)
{
    AllTasks.splice(index , 1);
    readTasks ();
};

//Read tasks from AllTasks 
function readTasks ()
{
    let box = '';
    span.innerText = (AllTasks.length);
    for(let i=0 ; i<AllTasks.length ; i++)
    {
        box += `
        <div id="row">
        <h1>${AllTasks[i].task}</h1>
            <div class="button">
                <button onclick="updateData(${i})" id="btnEdit" >Edit</button>
                <button onclick="deleteData(${i})"  id="btnDelete" >Delete</button>
            </div>
        </div>
    `;
    }
    document.getElementById("box").innerHTML = box;
    let deleteAll = document.getElementById('deleteAll');
    if(AllTasks.length > 0){
        deleteAll.innerHTML =`
        <button onclick="deleteAll()">Delete All (${AllTasks.length})</button>
         `
    }else{
        deleteAll.innerHTML = '';
    }
}
readTasks ();


// update
function updateData(index){

    

    title.value = AllTasks[index].task;
    add.innerHTML = 'update';
    mood = 'update';
    tmp = index;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
    title.focus()

}



function deleteAll()
{
    localStorage.clear();
    AllTasks.splice(0); 
    readTasks ()
}


// Search

let searchMood = 'title';
function getSearchMood(id){

    let searchs = document.getElementById('search');
    // searchs.focus();
    searchMood = 'title';  
    searchs.value = '';
};

function searchData(value)
{
    let box = '';
    for(let i=0 ; i<AllTasks.length; i++){
        if(AllTasks[i].task.includes(value.toLowerCase())){
            box += `
            <div id="row">
            <h1>${AllTasks[i].task}</h1>
                <div class="button">
                    <button onclick="updateData(${i})" id="btnEdit" >Edit</button>
                    <button onclick="deleteData(${i})"  id="btnDelete" >Delete</button>
                </div>
            </div>
        `;
        }
    }

    document.getElementById("box").innerHTML = box;
    
}

