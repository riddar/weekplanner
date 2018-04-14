// Initialize Firebase
const config = {
apiKey: "AIzaSyBJVavU41BFzL2JiS7a3UNLA8BU3Jb2AhM",
authDomain: "veckoplanerare-bf5ef.firebaseapp.com",
databaseURL: "https://veckoplanerare-bf5ef.firebaseio.com",
projectId: "veckoplanerare-bf5ef",
storageBucket: "veckoplanerare-bf5ef.appspot.com",
messagingSenderId: "433013314805"
};
firebase.initializeApp(config);

let db = firebase.database().ref();

const header = document.getElementById("header");
const text = document.getElementById("text");
const select = document.getElementById("select");
const LoadButton = document.getElementById("LoadButton");
const GetWeekButton = document.getElementById("GetWeekButton");
const list = document.getElementById("list");


GetWeekButton.addEventListener("click", GetWeek);

GetWeeks();

function GetWeeks(event){
    db.on("child_added", function(snap){
        if(snap.key !== null){
            console.log(snap.key);

            let opt = document.createElement("option");
            opt.value = snap.key
            opt.innerHTML = snap.key;
            text.appendChild(opt);
        }
    })
}

function GetWeek(event){
    list.innerHTML = "";
    header.innerText = "Vecka: " + text.value;
    let data = "";

    const week = ["Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag","Söndag"];
    data = "<table><tr><th>Tid</th></tr>";
    for(let i=9;i<=24;i++){
        data += "<tr><td id=time>"+i+":00</td></tr>";
    }
    week.forEach(function(day){ 
        data += "<table id="+day+"><tr><th>" + day + "</th></tr>";
        let ref = db.child(text.value).child(day);
        ref.on("child_added", function(snap){
            if(snap.key !== null){
                data += '<tr>';
                data += '<td id='+snap.key+'><input type="textfield" value='+ snap.val() +'></td>';  
                data += '</tr>';
            }
        })
    });

    list.innerHTML = data;
}

function UpdateWeek(event){
    for ( var i = 0; row = list.rows[i]; i++ ) {
        row = refTab.rows[i];
        for ( var j = 0; col = row.cells[j]; j++ ) {
           alert(col.firstChild.nodeValue);
        }
     }
}
