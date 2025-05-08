let myLeads = []
let oldLeads = []
// 1. Turn the myLeads string into an array
// myLeads = JSON.parse(myLeads)
// // 2. Push a new value to the array
// myLeads.push("www.lead2.com")
// // 3. Turn the array into a string again
// myLeads = JSON.stringify(myLeads)
// // 4. Console.log the string using typeof to verify that it's a string
// console.log(typeof myLeads)

const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads" ))

// 1. Check if leadsFromLocalStorage is truthy
// 2. If so, set myLeads to its value and call renderLeads()
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function () {
    // chrome and tabs are objects available when running in chrome
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //save url instead of logging it out (console.log)
        myLeads.push(tabs[0].url)
        localStorage.setItem( "myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    // turn array into string, and save myleads to localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // listItems += `<li><a target='_blank' href= '${myLeads[i]} + > + ${myLeads[i]} +  </a></li>`
        listItems += `<li><a target='_blank' href='${leads[i]}'>${leads[i]}</a></li>`
    }

    ulEl.innerHTML = listItems 
}

// 2. Listen for double clicks on the delete button (google it!)
// 3. When clicked, clear localStorage, myLeads, and the DOM
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
}
)

// function renderLeads() {
//         let listItem = "<li>" + inputEl.value + "</li>"
//         ulEl.innerHTML += listItem

//     }
