var noteList = document.getElementById("noteList");

function addNote() {
    var notedesc = document.getElementById("notedesc");
    var noteTitle = document.getElementById("noteTitle");

    if(notedesc.value.length >= 10 && noteTitle.value.length >= 5){
    // var liTitle = 
    var li = document.createElement("li");
    li.innerHTML = "<u>TITLE: </u><br />" + noteTitle.value + "<br /> <u> DESCRIPTION: </u><br />" + notedesc.value + "<br>";
    li.style.fontStyle = "italic";
    li.style.fontWeight = "600";


  ///// Creating Edit Button /////
    var edtBtn = document.createElement("button");
    edtBtn.innerHTML = "EDIT";
    edtBtn.setAttribute("onclick", "editNote(this)");
    edtBtn.classList = ("button");
    edtBtn.style.color = "#Aa8F01";


  ///// Creating Delete Button /////
    var delBtn = document.createElement("button");
    delBtn.innerHTML = "DELETE";
    delBtn.setAttribute("onclick", "delNote(this)");
    delBtn.classList = ("button");
    delBtn.style.color = "#ea2e00";


  /////Creating Hr //////
    var hr = document.createElement("hr");
    hr.classList = ("hr");


  /////Creating Update Button/////
    var updBtn = document.createElement("button");
    updBtn.innerHTML = "UPDATE";
    updBtn.setAttribute("onclick", "updNote(this)");
    updBtn.classList = ("button");
    updBtn.style.color = "#Aa8F01";
    updBtn.style.display = "none";


    li.appendChild(edtBtn);
    li.appendChild(updBtn)
    li.appendChild(delBtn);
    li.appendChild(hr);

    noteList.appendChild(li);
    notedesc.value = "";
    noteTitle.value = "";
}
    else{
    alert("Enter A Title Of Atleast 5 Characters.... AND List Note Of Atleast 10 Characters........");
    notedesc.value = "";
    noteTitle.value = "";
    }
}



function delNotes() {
    noteList.innerHTML = "";
    var notedesc = document.getElementById("notedesc");
    var noteTitle = document.getElementById("noteTitle");
    notedesc.value = "";
    noteTitle.value = "";
    notedesc.nextElementSibling.disabled = false;
}



function editNote(e){
  var notedesc = document.getElementById("notedesc");
  var noteTitle = document.getElementById("noteTitle");
  notedesc.nextElementSibling.disabled = true; //add btn
  var ab = e.parentNode; //li
  noteTitle.value = ab.firstChild.nextSibling.nextSibling.nodeValue;
  notedesc.value = ab.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousSibling.nodeValue;
  ab.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "none";  //editbtn
  ab.lastChild.previousSibling.previousSibling.style.display = "inline-block" //update btn
  var parentol = ab.parentNode; //ol
  var olchilds = parentol.children; //li's in array
  for (var i = 0; i < olchilds.length; i++){
    olchilds[i].lastChild.previousSibling.previousSibling.previousSibling.disabled = true; //editBtn disabled
    olchilds[i].lastChild.previousSibling.disabled = true; //delbtn disabled
  }
}



function updNote(g){
    var parent = g.parentNode; //li

  //////notedesc Value In li//////
    var notedesc = document.getElementById("notedesc");
    var noteTitle = document.getElementById("noteTitle");
    if(notedesc.value.length >= 10 && noteTitle.value.length >= 5){
    notedesc.nextElementSibling.disabled = false; //add btn
    parent.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousSibling.nodeValue = notedesc.value;
    parent.firstChild.nextSibling.nextSibling.nodeValue = noteTitle.value;
    notedesc.value = "";
    noteTitle.value = "";
    parent.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "inline-block";  ///editbtn
    parent.lastChild.previousSibling.previousSibling.style.display = "none"; //update btn
    var ab = g.parentNode; //li
    var parentol = ab.parentNode; //ol
    var olchilds = parentol.children; //li's in array
    for (var i = 0; i < olchilds.length; i++){
      olchilds[i].lastChild.previousSibling.previousSibling.previousSibling.disabled = false; //editBtn disabled
      olchilds[i].lastChild.previousSibling.disabled = false; //delbtn disabled
      }
    }

    else{
      alert("Enter A Title Of Atleast 5 Characters.... AND List Note Of Atleast 10 Characters........");
    noteTitle.value = parent.firstChild.nextSibling.nextSibling.nodeValue;
    notedesc.value = parent.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousSibling.nodeValue;
    }
}


function delNote(e){
    e.parentNode.remove();
    var notedesc = document.getElementById("notedesc");
    notedesc.value = "";
    notedesc.nextElementSibling.disabled = false; // add btn
    var noteTitle = document.getElementById("noteTitle");
    noteTitle.value = "";}