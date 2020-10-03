const data = localStorage.getItem("tasks");
document.querySelector(".clear-tasks").addEventListener("click", (e) => {
  let contaienr = document.querySelector("ul");
  let tasks = document.querySelectorAll("ul li");

  for (var i of tasks) {
    contaienr.removeChild(i);
  }
  localStorage.clear();
});

document.querySelector(".add-task").addEventListener("click", (e) => {
  var task = document.querySelector("#task");
  if (task.value === "") {
    alert("Please add a task");
    return;
  }
  saveDataInLocalStorage(task.value);
  const data = gatDataFromLocalStorge();

  var li = document.createElement("li");
  li.className = "collection-item";
  var links = document.createElement("a");
  links.className = "delete-item secondary-content";
  links.innerHTML = "Delete";
  data.forEach((data) => {
    li.innerText = data;
  });

  task.value = "";
  document.querySelector(".collection").appendChild(li).appendChild(links);
  e.preventDefault();
});
const saveDataInLocalStorage = (data) => {
  let arrTasks;
  if (localStorage.getItem("tasks") === null) {
    arrTasks = [];
  } else {
    arrTasks = JSON.parse(localStorage.getItem("tasks"));
  }
  arrTasks.push(data);
  localStorage.setItem("tasks", JSON.stringify(arrTasks));
};
const gatDataFromLocalStorge = () => {
  if (localStorage.getItem("tasks") !== null) {
    return JSON.parse(localStorage.getItem("tasks"));
  }
};
const gatDataFromLocalStorgeOnIntialRendering = () => {
  let arrTasks;
  if (localStorage.getItem("tasks") === null) {
    arrTasks = [];
  } else {
    arrTasks = JSON.parse(localStorage.getItem("tasks"));
  }
  localStorage.setItem("tasks", JSON.stringify(arrTasks));
  if (localStorage.getItem("tasks") !== null) {
    return JSON.parse(localStorage.getItem("tasks"));
  }
};
window.onload = function () {
  const data = gatDataFromLocalStorgeOnIntialRendering();

  data.forEach((data) => {
    var li = document.createElement("li");
    li.className = "collection-item";
    var links = document.createElement("a");
    links.className = "delete-item secondary-content";
    links.innerHTML = "DELETE";
    li.innerText = data;
    document.querySelector(".collection").appendChild(li).appendChild(links);
  });
};

document.body.addEventListener("click", (e) => {
  //   console.log(e.target.classList);
  if (e.target.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to remove the item")) {
      e.target.parentElement.remove();
      removeElementFromLocalStorage(e.target.parentElement);
    }
  }
});

const removeElementFromLocalStorage = (task) => {
  const data = JSON.parse(localStorage.getItem("tasks"));
  console.log(task.textContent);
  data.forEach((d, index) => {
    // console.log(task.textContent, "===", data);
    if (task.textContent === `${d}DELETE`) {
      console.log(index);
      data.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(data));
};
