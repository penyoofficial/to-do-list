var tasks = [];
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(e => {
        addTask(e.title, e.discription, e.urgency, true);
    });
}

var isNewing = false;
document.getElementById("add-task").onclick = function () {
    if (isNewing)
        document.getElementById("new-task").style.cssText += "top: 100%;";
    else
        document.getElementById("new-task").style.cssText += "top: 72%;";
    isNewing = isNewing ? false : true;
};

document.getElementById("submit").onclick = function () {
    const t = document.getElementById("title");
    const d = document.getElementById("discription");
    const u = document.getElementById("urgency");
    if (!t.value || !d.value)
        return false;
    if (addTask(t.value, d.value, u.value))
        t.value = "", d.value = "", u.value = "";
    else
        return false;
    document.getElementById("add-task").click();
    biAlert("已添加任务", document.getElementById("top-bar"));
    return true;
}

function addTask(title, discription, urgency, isOriginal) {
    if (!title || !discription)
        return false;
    try {
        Array.from(document.getElementsByClassName("event")).forEach(e => {
            if (e.querySelector(".title").innerText == title) {
                throw new Error();
            }
        });
    } catch (e) {
        return false;
    }
    const u = urgency ? urgency : "normal";
    document.getElementById("tasks").innerHTML += `
        <div class="event `+ u + `">
            <h3 class="title">`+ title + `</h3>
            <p class="discription">
                `+ discription + `
            </p>
            <div class="op ok" onclick="finishTask('`+ title + `')">〇</div>
            <div class="op non-ok" onclick="removeTask('`+ title + `')">✕</div>
        </div>
    `;
    Array.from(document.getElementsByClassName("event")).forEach(e => {
        e.onmouseenter = function () {
            e.style.cssText += "--oo: 1";
        };
        e.onmouseleave = function () {
            e.style.cssText += "--oo: 0";
        }
    });
    if (!isOriginal)
        tasks.push({ "title": title, "discription": discription, "urgency": u });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return true;
}

function finishTask(title) {
    if (!title)
        return false;
    try {
        Array.from(document.getElementsByClassName("event")).forEach(e => {
            if (e.querySelector(".title").innerText == title) {
                e.classList.add("done");
                throw new Error();
            }
        });
    } catch (e) {
        ;
    }
    for (let i = 0; i < tasks.length; i++)
        if (tasks[i].title == title)
            tasks.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return true;
}

function removeTask(title) {
    if (!title)
        return false;
    try {
        Array.from(document.getElementsByClassName("event")).forEach(e => {
            if (e.querySelector(".title").innerText == title) {
                e.style.cssText += "animation: delete-event 2s;";
                setTimeout(function () {
                    e.remove();
                }, 1800);
                throw new Error();
            }
        });
    } catch (e) {
        ;
    }
    for (let i = 0; i < tasks.length; i++)
        if (tasks[i].title == title)
            tasks.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    biAlert("已移除任务", document.getElementById("top-bar"));
    return true;
}