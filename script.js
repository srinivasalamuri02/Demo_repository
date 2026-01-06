const apiUrl = "http://localhost:8080";

function saveUser() {
  const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then(() => getUsers());
}

function getUsers() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      userTable.innerHTML = "";
      data.forEach((u) => {
        userTable.innerHTML += `
                        <tr>
                            <td>${u.id}</td>
                            <td>${u.name}</td>
                            <td>${u.email}</td>
                            <td>${u.age}</td>
                            <td>
                                <button onclick="editUser(${u.id}, '${u.name}', '${u.email}', ${u.age})">Edit</button>
                                <button onclick="deleteUser(${u.id})">Delete</button>
                            </td>
                        </tr>
                    `;
      });
    });
}

function editUser(idVal, nameVal, emailVal, ageVal) {
  document.getElementById("id").value = idVal;
  document.getElementById("name").value = nameVal;
  document.getElementById("email").value = emailVal;
  document.getElementById("age").value = ageVal;
}

function updateUser() {
  const user = {
    id: document.getElementById("id").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
  };

  fetch(apiUrl + "/" + user.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then(() => getUsers());
}

function deleteUser(userId) {
  fetch(apiUrl + "/" + userId, {
    method: "DELETE",
  }).then(() => getUsers());
}
