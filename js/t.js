var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function newElement() {

  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var priorityValue = document.getElementById("taskPriority").value; // 获取选择的等级
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

  // 创建等级显示元素
  var prioritySpan = document.createElement("SPAN");
  var priorityText = document.createTextNode(" [" + priorityValue.toUpperCase() + "]");
  prioritySpan.className = "priority " + priorityValue;
  prioritySpan.appendChild(priorityText);
  li.appendChild(prioritySpan);

  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  // 添加关闭按钮
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // 添加编辑按钮
  var editSpan = document.createElement("SPAN");
  var editText = document.createTextNode("\u270E"); // Unicode 编辑图标
  editSpan.className = "edit";
  editSpan.appendChild(editText);
  li.appendChild(editSpan);

  // 关闭按钮事件
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }

  // 编辑按钮事件
  editSpan.onclick = function () {
    var listItem = this.parentElement;
    var currentText = listItem.childNodes[0].nodeValue;
    var currentPriority = listItem.getElementsByClassName("priority")[0].textContent.trim();
    var newText = prompt("Edit the task", currentText); // 使用prompt来编辑任务文本
    if (newText) {
      listItem.childNodes[0].nodeValue = newText;
    }
    // 这里可以进一步添加逻辑来允许用户编辑任务等级
  };

}
