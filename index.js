let todocontainer=document.getElementById("todo-container");
let addbut=document.getElementById("addtodo");
let saveBtn=document.getElementById("saveBtn");
let todocount=0;
function gettodoList(){
    let stringifiedTodoList = localStorage.getItem("Todolist");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todolist=gettodoList();
todocount=todolist.length;

function todochanges(checkboxid,labelid,todoid){
    let checkboxElement = document.getElementById(checkboxid);
    let Labelid=document.getElementById(labelid);
    let index=todolist.findIndex(function(item){
        let todoobj="todo"+item.uniqueno;
           if(todoobj===todoid){
            return true;
           }
           else{
            return false;
           }
    });
    let todoindex=todolist[index];
    if(todoindex.ischecked===false){
        todoindex.ischecked=true;
    }
    else{
        todoindex.ischecked=false;
    }

    Labelid.classList.toggle("checked");

   
}
function deletelist(todoid){
    let labelcon=document.getElementById(todoid);
    todocontainer.removeChild(labelcon);
    let index=todolist.findIndex(function(eachvalue){
        let eachtodoid="todo"+eachvalue.uniqueno;
        if(eachtodoid === todoid){
            return true;

        }else{
            return false;
        }
    });
    todolist.splice(index,1);
    localStorage.setItem("Todolist",JSON.stringify(todolist));
   
}
function onadd(){
    let inputvalue=document.getElementById("Value");
    let values=inputvalue.value;
    if(values===""){
        alert("enter a valid input");
        return;
    }
    todocount=todocount+1;

  let  newtodo=
    {
    text:values,
    uniqueno:todocount,
    ischecked:false,
    }


  todolist.push(newtodo);
  createtodoandappend(newtodo);

inputvalue.value="";

}
function createtodoandappend(todo){
    let checkboxid="checkbox"+todo.uniqueno;
    let labelid="label"+todo.uniqueno;
    let todoid="todo"+todo.uniqueno;

    let todoelement=document.createElement("li");
    todoelement.classList.add("todo-item-container","d-flex","flex-row");
    todoelement.id=todoid;
    todocontainer.appendChild(todoelement);


    let checkboxinput=document.createElement("input");
    checkboxinput.type="checkbox";
    checkboxinput.classList.add("checkbox-input");
    checkboxinput.id=checkboxid;
    checkboxinput.checked=todo.ischecked;
    checkboxinput.onclick=function(){
        todochanges(checkboxid,labelid,todoid);
    }
    todoelement.appendChild(checkboxinput);


    let labelcontainer=document.createElement("div");
    labelcontainer.classList.add("label-container","d-flex","flex-row");
    todoelement.appendChild(labelcontainer);


    let labelelement=document.createElement("label");
    labelelement.classList.add("checkbox-label");
    labelelement.id=labelid;
    if(todo.ischecked===true){
        labelelement.classList.add("checked");
    }
    labelelement.setAttribute("for", checkboxid);
    labelelement.textContent=todo.text;
    labelelement.classList.add("checkbox-label");
    labelcontainer.appendChild(labelelement);

    
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelcontainer.appendChild(deleteIconContainer);


    let deleteicon=document.createElement("i");
    deleteicon.onclick=function(){
        deletelist(todoid);
    }
    deleteicon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteicon);

   

}
for(let item of todolist){
    createtodoandappend(item);
}

addbut.onclick=function(){
    onadd();
}
saveBtn.onclick=function(){

    localStorage.setItem("Todolist",JSON.stringify(todolist));

}