let ul = document.querySelector("ul");
let taskTab = document.querySelector(".task-list");
let completedTab = document.querySelector(".completed-list");
let addBtn = document.querySelector(".add-btn");

if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify([]));
} else {
  loadTasks(false);
}

function loadTasks(completed) {
  let data = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < data.length; i++) {
    if (data[i].completed == completed) {
      let li = document.createElement("li");
      li.setAttribute("data-id", data[i].id);
      li.innerHTML = `<input
                  type="checkbox"
                  class="styled-checkbox"
                  id="${data[i].id}"
                  ${completed ? "checked" : ""}
                />
                <label for="${data[i].id}"></label>
                <p contenteditable="">${data[i].task ? data[i].task : ""}</p>
                <button>X</button>`;

      let innerBtn = li.querySelector("button");
      innerBtn.addEventListener("click", deleteHandler);

      let p = li.querySelector("p");
      p.addEventListener("input", pHandler);

      let checkbox = li.querySelector("input");
      checkbox.addEventListener("change", checkHandler);

      ul.appendChild(li);
    }
  }
}

taskTab.addEventListener("click", function () {
  completedTab.classList.remove("tab-active");
  taskTab.classList.add("tab-active");
  let c = ul.querySelectorAll("li");

  for (let i = 0; i < c.length; i++) {
    c[i].remove();
  }
  loadTasks(false);
});

completedTab.addEventListener("click", function () {
  taskTab.classList.remove("tab-active");
  completedTab.classList.add("tab-active");
  let c = ul.querySelectorAll("li");
  console.log(c);
  for (let i = 0; i < c.length; i++) {
    c[i].remove();
  }
  loadTasks(true);
});

addBtn.addEventListener("click", function () {
  let li = document.createElement("li");
  let id = Date.now();
  li.setAttribute("data-id", id);
  let data = JSON.parse(localStorage.getItem("tasks"));
  data.push({ id, completed: false });
  localStorage.setItem("tasks", JSON.stringify(data));

  li.innerHTML = `<input
              type="checkbox"
              class="styled-checkbox"
              id="${id}"
            />
            <label for="${id}"></label>
            <p contenteditable=""></p>
            <button>X</button>`;

  let innerBtn = li.querySelector("button");
  innerBtn.addEventListener("click", deleteHandler);

  let p = li.querySelector("p");
  p.addEventListener("input", pHandler);

  let checkbox = li.querySelector("input");
  checkbox.addEventListener("change", checkHandler);

  ul.appendChild(li);
});

function checkHandler(e) {
  console.log(1);
  let data = JSON.parse(localStorage.getItem("tasks"));
  let id = e.currentTarget.parentElement.getAttribute("data-id");
  console.log(e.currentTarget.parentElement);
  let index = data.findIndex(function (e) {
    return e.id == id;
  });
  data[index].completed = e.currentTarget.checked;
  localStorage.setItem("tasks", JSON.stringify(data));
}
function pHandler(e) {
  let data = JSON.parse(localStorage.getItem("tasks"));
  let id = e.currentTarget.parentElement.getAttribute("data-id");

  let index = data.findIndex(function (e) {
    return e.id == id;
  });
  data[index].task = e.currentTarget.innerText;
  localStorage.setItem("tasks", JSON.stringify(data));
}
function deleteHandler(e) {
  e.currentTarget.parentElement.remove();
}
