import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCyk6aMP1U0WmVmQdDwb8DhwJKk2kszH8I",
  authDomain: "t6progressivewebapp.firebaseapp.com",
  databaseURL: "https://t6progressivewebapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "t6progressivewebapp",
  storageBucket: "t6progressivewebapp.appspot.com",
  messagingSenderId: "602714925402",
  appId: "1:602714925402:web:b3383d35f01da02026ab63",
  measurementId: "G-7NRERVS911"
};
 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const shoppingListInDB = ref(analytics, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}