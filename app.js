const firebaseConfig = {
apiKey: "AIzaSyC-Qqj_hAg6FTuusQ-6NET8h0vwchRVaeI",
authDomain: "onlinedata-form.firebaseapp.com",
databaseURL: "https://onlinedata-form-default-rtdb.firebaseio.com",
projectId: "onlinedata-form",
storageBucket: "onlinedata-form.appspot.com",
messagingSenderId: "640918655777",
appId: "1:640918655777:web:c3730c63586a66efa76460",
// measurementId: "G-39TSRDN644"
};
const app = firebase.initializeApp(firebaseConfig);
var database = app.database();
console.log(database);
// const analytics = getAnalytics(app);





const noteList = document.getElementById("noteList");

let addNote = () => {
  let noteTitle = document.getElementById("noteTitle");
  let notedesc = document.getElementById("notedesc");

    if(notedesc.value.length >= 10 && noteTitle.value.length >= 5){

      //                            ..........DB...........
    let key = database.ref("/").push().key;
    let noteBook = {
      desc : notedesc.value,
      key : key,
      title : noteTitle.value
    }
    database.ref("notes").child(key).set(noteBook);
    notedesc.value = "";
    noteTitle.value = "";
}
    else{
    alert("Enter A Title Of Atleast 5 Characters.... AND List Note Of Atleast 10 Characters........");
    notedesc.value = "";
    noteTitle.value = "";
    }
}

//                  --------------------DB-------------------

database.ref("notes").on("child_added" , function(data){

  let li = document.createElement("li");
  li.innerHTML = "<u>TITLE: </u><br />" + data.val().title + "<br /> <u> DESCRIPTION: </u><br />" + data.val().desc + "<br>";
  li.style.fontStyle = "italic";
  li.style.fontWeight = "600";
  
  
  ///// Creating Edit Button /////
  let edtBtn = document.createElement("button");
  edtBtn.innerHTML = "EDIT";
  edtBtn.setAttribute("onclick", "editNote(this)");
  edtBtn.classList = ("button");
  edtBtn.style.color = "#Aa8F01";
  
  
  ///// Creating Delete Button /////
  let delBtn = document.createElement("button");
  delBtn.innerHTML = "DELETE";
  delBtn.setAttribute("onclick", "delNote(this)");
  delBtn.setAttribute("id" , data.val().key)
  delBtn.classList = ("button");
  delBtn.style.color = "#ea2e00";
  
  
  /////Creating Hr //////
  let hr = document.createElement("hr");
  hr.classList = ("hr");
  
  
  /////Creating Update Button/////
  let updBtn = document.createElement("button");
  updBtn.innerHTML = "UPDATE";
  updBtn.setAttribute("onclick", "updNote(this)");
  updBtn.setAttribute("id" , data.val().key)
  updBtn.classList = ("button");
  updBtn.style.color = "#Aa8F01";
  updBtn.style.display = "none";


  li.appendChild(edtBtn);
  li.appendChild(updBtn)
  li.appendChild(delBtn);
  li.appendChild(hr);

  noteList.appendChild(li);
})



let delNotes = () => {
  noteList.innerHTML = "";
  let notedesc = document.getElementById("notedesc");
  let noteTitle = document.getElementById("noteTitle");
  notedesc.value = "";
  noteTitle.value = "";
  notedesc.nextElementSibling.disabled = false;

  //                    -----------------DB-------------------
  database.ref("/notes").remove()
}



let editNote = e => {
  let noteTitle = document.getElementById("noteTitle");
  let notedesc = document.getElementById("notedesc");
  notedesc.nextElementSibling.disabled = true; //add btn
  let ab = e.parentNode; //li
  noteTitle.value = ab.firstChild.nextSibling.nextSibling.nodeValue;
  notedesc.value = ab.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousSibling.nodeValue;
  ab.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "none";  //editbtn
  ab.lastChild.previousSibling.previousSibling.style.display = "inline-block" //update btn
  let parentol = ab.parentNode; //ol
  let olchilds = parentol.children; //li's in array
  for (var i = 0; i < olchilds.length; i++){
    olchilds[i].lastChild.previousSibling.previousSibling.previousSibling.disabled = true; //editBtn disabled
    olchilds[i].lastChild.previousSibling.disabled = true; //delbtn disabled
  }
}



let updNote = g => {
    let parent = g.parentNode; //li

  //////notedesc Value In li//////
    let noteTitle = document.getElementById("noteTitle");
    let notedesc = document.getElementById("notedesc");
    if(notedesc.value.length >= 10 && noteTitle.value.length >= 5){
      notedesc.nextElementSibling.disabled = false; //add btn
      parent.firstChild.nextSibling.nextSibling.nodeValue = noteTitle.value;
      parent.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousSibling.nodeValue = notedesc.value;
      notedesc.value = "";
      noteTitle.value = "";
      parent.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "inline-block";  ///editbtn
      parent.lastChild.previousSibling.previousSibling.style.display = "none"; //update btn
      let ab = g.parentNode; //li
      let parentol = ab.parentNode; //ol
      let olchilds = parentol.children; //li's in array
      let descValue = parent.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousSibling.nodeValue;
      let titleValue = parent.firstChild.nextSibling.nextSibling.nodeValue;

      //                          -------------------DB---------------------
      database.ref("notes").child(g.id).update({
        desc : descValue,
        title : titleValue
      })
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


let delNote = e => {
    e.parentNode.remove();
    let noteTitle = document.getElementById("noteTitle");
    noteTitle.value = "";
    let notedesc = document.getElementById("notedesc");
    notedesc.value = "";
    notedesc.nextElementSibling.disabled = false; // add btn
    //                    ------------------------DB-----------------------
    database.ref("notes").child(e.id).remove();
  }