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





var noteList = document.getElementById("noteList");

function addNote() {
  var noteTitle = document.getElementById("noteTitle");
  var notedesc = document.getElementById("notedesc");

    if(notedesc.value.length >= 10 && noteTitle.value.length >= 5){

      //                            ..........DB...........
    var key = database.ref("/").push().key;
    var noteBook = {
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

  var li = document.createElement("li");
  li.innerHTML = "<u>TITLE: </u><br />" + data.val().title + "<br /> <u> DESCRIPTION: </u><br />" + data.val().desc + "<br>";
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
  delBtn.setAttribute("id" , data.val().key)
  delBtn.classList = ("button");
  delBtn.style.color = "#ea2e00";
  
  
  /////Creating Hr //////
  var hr = document.createElement("hr");
  hr.classList = ("hr");
  
  
  /////Creating Update Button/////
  var updBtn = document.createElement("button");
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



function delNotes() {
  noteList.innerHTML = "";
  var notedesc = document.getElementById("notedesc");
  var noteTitle = document.getElementById("noteTitle");
  notedesc.value = "";
  noteTitle.value = "";
  notedesc.nextElementSibling.disabled = false;

  //                    -----------------DB-------------------
  database.ref("/notes").remove()
}



function editNote(e){
  var noteTitle = document.getElementById("noteTitle");
  var notedesc = document.getElementById("notedesc");
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
    var noteTitle = document.getElementById("noteTitle");
    var notedesc = document.getElementById("notedesc");
    if(notedesc.value.length >= 10 && noteTitle.value.length >= 5){
      notedesc.nextElementSibling.disabled = false; //add btn
      parent.firstChild.nextSibling.nextSibling.nodeValue = noteTitle.value;
      parent.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousSibling.nodeValue = notedesc.value;
      notedesc.value = "";
      noteTitle.value = "";
      parent.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "inline-block";  ///editbtn
      parent.lastChild.previousSibling.previousSibling.style.display = "none"; //update btn
      var ab = g.parentNode; //li
      var parentol = ab.parentNode; //ol
      var olchilds = parentol.children; //li's in array
      var descValue = parent.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousSibling.nodeValue;
      var titleValue = parent.firstChild.nextSibling.nextSibling.nodeValue;

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


function delNote(e){
    e.parentNode.remove();
    var noteTitle = document.getElementById("noteTitle");
    noteTitle.value = "";
    var notedesc = document.getElementById("notedesc");
    notedesc.value = "";
    notedesc.nextElementSibling.disabled = false; // add btn
    //                    ------------------------DB-----------------------
    database.ref("notes").child(e.id).remove();
  }