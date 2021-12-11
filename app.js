var noteList = document.getElementById("noteList");

function addNote() {
    var notedesc = document.getElementById("notedesc");
    var noteTitle = document.getElementById("noteTitle");

    if(notedesc.value.length >= 10 && noteTitle.value.length >= 5){
    // var liTitle = 
    var li = document.createElement("li");
    li.innerHTML = noteTitle.value + "<br>" + notedesc.value;
    li.style.color = "royalblue";


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
  notedesc.nextElementSibling.disabled = true;
  var ab = e.parentNode; //li
  console.log(ab); //li
  noteTitle.value = ab.firstChild.nodeValue;
  notedesc.value = ab.firstChild.nextSibling.nextSibling.nodeValue;
  ab.firstChild.nextSibling.nextSibling.nextSibling.style.display = "none";  //editbtn
  ab.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.style.display = "inline-block" //update btn
  var parentol = ab.parentNode; //ol
  var olchilds = parentol.children; //li's in array
  for (var i = 0; i < olchilds.length; i++){
    olchilds[i].firstElementChild.nextElementSibling.disabled = true; //editBtn disabled
    olchilds[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.disabled = true; //delbtn disabled
    }
  }



function updNote(g){
    var parent = g.parentNode; //li

  //////notedesc Value In li//////
    var notedesc = document.getElementById("notedesc");
    var noteTitle = document.getElementById("noteTitle");
    if(notedesc.value.length >= 10 && noteTitle.value.length >= 5){
    notedesc.nextElementSibling.disabled = false; //add btn
    parent.firstChild.nextSibling.nextSibling.nodeValue = notedesc.value;
    parent.firstChild.nodeValue = noteTitle.value;
    notedesc.value = "";
    noteTitle.value = "";
    parent.firstChild.nextSibling.nextSibling.nextSibling.style.display = "inline-block";  ///editbtn
    parent.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.style.display = "none"; //update btn
    var ab = g.parentNode; //li
    var parentol = ab.parentNode; //ol
    var olchilds = parentol.children; //li's in array
    for (var i = 0; i < olchilds.length; i++){
      olchilds[i].firstElementChild.nextElementSibling.disabled = false; //editBtn disabled
      olchilds[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.disabled = false; //delbtn disabled
      }
    }

    else{
      alert("Enter A Title Of Atleast 5 Characters.... AND List Note Of Atleast 10 Characters........");
    noteTitle.value = parent.firstChild.nodeValue;
    notedesc.value = parent.firstChild.nextSibling.nextSibling.nodeValue;
    }
}



function delNote(e) {
    e.parentNode.remove();
    var notedesc = document.getElementById("notedesc");
    notedesc.value = "";
    notedesc.nextElementSibling.disabled = false;
    var noteTitle = document.getElementById("noteTitle");
    noteTitle.value = "";
}