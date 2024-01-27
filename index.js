
var current_ele=null;

function subdiv_visible(event){
	let ele=event.target;
	let subdiv=ele.parentElement.nextElementSibling.style;
	if(current_ele==null){
		current_ele=subdiv;
		subdiv.display="flex";
	}
	else if(current_ele==subdiv){
		current_ele=null;
		subdiv.display="none";
	}
	else if(current_ele!=subdiv){
		current_ele.display="none";
		subdiv.display="flex";
		current_ele=subdiv;
	}	
}

function create_ele(ele){
	return document.createElement(ele);
}

function subtask(text){
	let div=create_ele("div");
	let p=create_ele("p");
	let span=create_ele("span");
	span.classList.add("material-symbols-outlined");
	span.innerHTML="close";
	span.setAttribute("onclick","remove_subtask(event)")
	p.innerHTML=text;
	div.appendChild(p);
	div.appendChild(span);
	return div;
	
}

var text1='<div><span class="material-symbols-outlined" onclick="subdiv_visible(event)">expand_more</span><span class="material-symbols-outlined" onclick="remove_task(event)">close</span></div>';

var text2='<div><input type="text" placeholder="Enter subtask" value=""><button onclick="add_subtask(event,previousElementSibling.value)">Add</button><p></p></div>';

function task(text){
	let div1=create_ele("div")
	let p=create_ele("p");
	let div2=create_ele("div");
	p.innerHTML=text;
	div2.innerHTML+=text2;
	div1.appendChild(p);
	div1.innerHTML+=text1;
	div1.appendChild(div2);
	return div1;
}

function add_task(event,task_name){
	if(task_name==""){
		event.target.nextElementSibling.innerHTML="please enter the task name";
		return;
	}
	let parent=document.getElementById("taskparent");
	let todo=JSON.parse(task_array());
	let num=search_key(todo,task_name.trim());
	if(num!=-1){
		event.target.nextElementSibling.innerHTML="Task is already exist";	
		return;
	}
	todo.push([task_name]);
	localStorage.setItem("todotask",JSON.stringify(todo));
	event.target.nextElementSibling.innerHTML="";
	event.target.previousElementSibling.value="";
	parent.appendChild(task(task_name));
	
}

function add_subtask(event,task_name){
	if(task_name==""){
		event.target.nextElementSibling.innerHTML="please enter the subtask.";
		return;
	}
	let parent=event.target.parentElement.parentElement;
	let taskp=parent.parentElement.children[0].innerHTML;
	let todo=JSON.parse(task_array());
	let num=search_key(todo,taskp);
	//alert(num);
	if(todo[num].indexOf(task_name.trim())!=-1){
		event.target.nextElementSibling.innerHTML="SubTask already exist.";
		return;
	}
	todo[num].push(task_name);
	localStorage.setItem("todotask",JSON.stringify(todo));
	event.target.nextElementSibling.innerHTML="";
	event.target.previousElementSibling.value="";
	parent.appendChild(subtask(task_name));
}

function remove_task(event){
	let task_name=event.target.parentElement.previousElementSibling.innerHTML;
	event.target.parentElement.parentElement.remove();
	//alert(task_name);
	let todo=JSON.parse(task_array());
	let num=search_key(todo,task_name);
	todo.splice(num,1);
	localStorage.setItem("todotask",JSON.stringify(todo));
}

function remove_subtask(event){
	let subtask=event.target.previousElementSibling.innerHTML;
	let task=event.target.parentElement.parentElement.parentElement.children[0].innerHTML;
	event.target.parentElement.remove();
	//alert(subtask+" "+task);
	let todo=JSON.parse(task_array());
	let num=search_key(todo,task);
	let num1=todo[num].indexOf(subtask,1);
	todo[num].splice(num1,1);
	localStorage.setItem("todotask",JSON.stringify(todo));
	//alert(todo[num]+"/"+todo[num][num1+1]);
	
}

function search_key(array,key){
	for(i in array){
		if(key==array[i][0]) {return i};
	}
	return -1;
}

function search_sub(array,key){
	for(i in array){
		if(key==array[i]) {return i};
	}
	return -1;
}

function task_array(){
	return localStorage.getItem("todotask");
}

window.addEventListener("load",loading_fun);
function loading_fun(){
	if("todotask" in localStorage){
		let todo=JSON.parse(task_array());
		let parent=document.getElementById("taskparent");
		todo.forEach((tsk)=>{
			let div=task(tsk[0]);
			(tsk.slice(1)).forEach((j)=>{
				div.children[2].appendChild(subtask(j))
			})
			parent.appendChild(div);
		})
	}
	else{
		localStorage.setItem("todotask",JSON.stringify([]))
	}
}

//var a=Object.keys(localStorage);
//alert(search_key(a,"name"));

