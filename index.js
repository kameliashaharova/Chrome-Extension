import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";


const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-100ca-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})

document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
    }
})

onValue(referenceInDB, function(snapshot){
    const snapshotExists = snapshot.exists()
    if (snapshotExists) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
}) 

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // listItems += `<li><a target='_blank' href= '${myLeads[i]} + > + ${myLeads[i]} +  </a></li>`
        listItems += `<li><a target='_blank' href='${leads[i]}'>${leads[i]}</a></li>`
    }

    ulEl.innerHTML = listItems 
}

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})
