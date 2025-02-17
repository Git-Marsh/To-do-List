let Input = document.getElementById(`input`);
let plusButton = document.getElementById(`plus-button`);
// let pressIndicaitor = document.getElementById(`press-indicaitor`);
let taskList = [];

let taskObject = {};
let tabMenu = document.querySelectorAll(`.tab span`);
let filterList = [];
let etID = `all`;
let List = [];

plusButton.addEventListener(`click`, addTask);
Input.addEventListener(`keyup`, (e) => {
  if (e.key == `Enter`) {
    document.getElementById("plus-button").click();
  }
});
tabMenu.forEach((menu) => menu.addEventListener(`click`, (e) => filter(e)));
// tabMenu.forEach((menu) => menu.addEventListener(`click`, (e) => Indicator(e)));

function addTask() {
  taskObject = {
    spID: newID(),
    taskContent: Input.value,
    isComplete: false,
  };

  if (taskObject.taskContent.length < 1) {
    alert(`내용을 입력해 주세요`);
    return;
  }

  taskList.push(taskObject); //배열추가야 정신차려
  filterList.push(taskObject); //배열추가야 정신차려

  rendering();
  Input.value = ``;
}

function rendering() {
  addHtml = ``;
  List = [];
  if (etID === `yet` || etID === `complete`) {
    List = filterList;
  } else {
    //all
    List = taskList;
  }

  for (i = 0; i < List.length; i++) {
    if (List[i].isComplete == true) {
      addHtml += `<div class="tasks" style="box-shadow: none;">
            <section>${List[i].taskContent}</section>
            <section>
            <a href="#" onclick="checked('${List[i].spID}')"><i class="fa-solid fa-rotate-right"></i></a>
            </section>
            </div>`;
    } else {
      addHtml += `<div class="tasks">
            <section>${List[i].taskContent}</section>
            <section>
            <a href="#" onclick="trashCan('${List[i].spID}')"><i class="fa-regular fa-trash-can"></i></a>
            <a href="#" onclick="checked('${List[i].spID}')"><i class="fa-solid fa-check"></i></a>
            </section>
            </div>`;
    }
  }

  document.querySelector(`.add-tasks`).innerHTML = addHtml;
}

function trashCan(spID) {
  for (i = 0; i < List.length; i++) {
    if (List[i].spID == spID) {
      taskList.splice([i], 1);
      filterList.splice([i], 1);
      break;
    }
  }
  rendering();
}
function checked(spID) {
  for (i = 0; i < taskList.length; i++) {
    if (taskList[i].spID == spID) {
      taskList[i].isComplete = !taskList[i].isComplete;

      break;
    }
  }
  rendering();
}

function filter(e) {
  etID = e.currentTarget.id;
  filterList = [];
  if (etID == `complete`) {
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    rendering();
  } else if (etID == `yet`) {
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    rendering();
  } else {
    rendering();
  }
}

// function Indicator(e) {
//   pressIndicaitor.style.left = e.currentTarget.offsetLeft + `px`;
//   pressIndicaitor.style.width = e.currentTarget.offsetWidth + `px`;
//   pressIndicaitor.style.top =
//     e.currentTarget.offsetTop + e.currentTarget.offsetHeight + `px`;
// }

function newID() {
  return Math.random().toString(36).substr(2, 16);
}

//이제 탭따라 list 나눠 addEventListner는 event정보로 뭘 눌렸는지 받아와.
// 500 밑으로 미디어스크린
