// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash, item.priority);
  });
}

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash, priority = 0) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const PRIORITY_STARS =
    "<span class='priority'>" + "★".repeat(priority) + "</span>";

  const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}" title="${LINE}">${toDo}</p>
                    ${PRIORITY_STARS} <!-- 显示优先级 -->
                    <i class="fa fa-edit ed" job="edit" id="${id}"></i> <!-- 编辑按钮 -->
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    // if the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      // add item to localstorage ( this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.getAttribute("job"); // 获取 job 属性
  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  } else if (elementJob == "edit") {
    // 显示编辑模态框
    $("#editTaskModal").modal("show");

    // 保存当前编辑的任务ID
    $("#saveEdit").data("id", element.id);

    // 预填充任务内容和优先级
    const taskToEdit = LIST[element.id];
    $("#editTaskInput").val(taskToEdit.name);
    $("#editTaskPriority").val(taskToEdit.priority || 1);
  }

  // add item to localstorage ( this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

// 处理保存编辑
$("#saveEdit").click(function () {
  const id = $(this).data("id"); // 获取当前编辑任务的ID
  const updatedName = $("#editTaskInput").val(); // 获取更新后的任务名
  const updatedPriority = $("#editTaskPriority").val(); // 获取更新后的优先级

  // 更新LIST数组中的任务
  LIST[id].name = updatedName;
  LIST[id].priority = updatedPriority;

  // 更新本地存储
  localStorage.setItem("TODO", JSON.stringify(LIST));

  // 关闭模态框
  $("#editTaskModal").modal("hide");

  // 更新用户界面
  updateTaskInUI(id, updatedName, updatedPriority);
});

function updateTaskInUI(id, updatedName, updatedPriority) {
  // 找到对应的任务列表项
  let listItem = document.querySelector(`.item i[ id="${id}"]`).parentNode;

  // 更新任务名和优先级显示
  listItem.querySelector(".text").innerHTML = updatedName;
  listItem.querySelector(".priority").innerHTML = "★".repeat(updatedPriority);

  // 需要确保如果任务完成或删除状态有变，也能够在这里处理
}

// 加载已有任务
document.addEventListener("DOMContentLoaded", function () {
  let data = localStorage.getItem("TODO");
  if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST); // 加载并显示LIST中的所有任务
  } else {
    LIST = [];
    id = 0;
  }
});
