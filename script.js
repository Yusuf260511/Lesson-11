const usersContainer = document.getElementById("users");
const sortspace_select = document.getElementById("sortspace_select");
const search = document.getElementById("search");
const loader = document.getElementById("loader");

let userList = []; // Сохраняем список пользователей

function showUsers(users) {
    usersContainer.innerHTML = "";
    users.forEach(element => {
        const user = document.createElement("div");
        user.classList.add("user");
        user.innerHTML = `
            <img src="${element.picture.large}" alt="" class="user_icon">
            <h1 class="name">${element.name.first} ${element.name.last}</h1>
            <p class="age"><b>Yosh:</b> ${element.dob.age}</p>
            <p class="telefon"><b>Telefon:</b> ${element.phone}</p>
            <p class="email"><b>Email:</b> ${element.email}</p>
            <p class="manzil"><b>Manzil:</b> ${element.location.city}</p>
        `;
        usersContainer.appendChild(user);
    });
}

async function getUsers() {
    try {
        loader.style.display = "block";
        const response = await fetch('https://randomuser.me/api/?results=100');
        const data = await response.json();
        userList = data.results; // Сохраняем пользователей в глобальную переменную
        showUsers(userList);
    } catch (error) {
        console.log(error);
    } finally {
        loader.style.display = "none";
    }
}

function sortUsersByName() {
    const sortedUsers = [...userList].sort((a, b) => {
        const nameA = a.name.first.toLowerCase();
        const nameB = b.name.first.toLowerCase();
        return nameA.localeCompare(nameB);
    });
    showUsers(sortedUsers);
}

function sortUsersByAge() {
    const sortedUsers = [...userList].sort((a, b) => a.dob.age - b.dob.age);
    showUsers(sortedUsers);
}

function searchUsers() {
    const filteredUsers = userList.filter(user => {
        return user.name.first.toLowerCase().includes(search.value.toLowerCase()) || user.name.last.toLowerCase().includes(search.value.toLowerCase());
    });
    showUsers(filteredUsers);
}
search.addEventListener("input", searchUsers);

if (sortspace_select) {
    sortspace_select.addEventListener("change", () => {
        if (sortspace_select.value === "Ism") {
            sortUsersByName();
        } else if (sortspace_select.value === "Yosh") {
            sortUsersByAge();
        }
    });
}

getUsers();