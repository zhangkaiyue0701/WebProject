$(function () {
    const toDoKey = "toToList";
    loadData();
    $(".input-box").on("keyup", function (e) {
        if (e.keyCode === 13) {
            const title = $(this).val().replace(/(^\s*)|(\s*$)/g, "");
            if (title !== null && title !== "") {
                let items = JSON.parse(localStorage.getItem(toDoKey));
                if (items === null) {
                    items = [];
                }
                items.push({title: title, done: false});
                localStorage.setItem(toDoKey, JSON.stringify(items));
                loadData()
                $(this).val("")
            }
        }
    })

    function loadData() {
        let items = JSON.parse(localStorage.getItem(toDoKey));
        let doneList = $(".done ul");
        let doingList = $(".doing ul");
        doneList.empty();
        doingList.empty();
        $(items).each(function (index, ele) {
            let li = $("<li data-index=" + index + "><input type='checkbox'/><p>" + ele.title + "</p><a href='javascript:'></a></li>");
            if (ele.done === true) {
                doneList.append(li);
            } else {
                doingList.append(li);
            }
            let input = li.children("input");
            input.prop("checked", ele.done);
            input.on("change", function () {
                let items = JSON.parse(localStorage.getItem(toDoKey));
                items[input.parent().attr("data-index")].done = input.prop("checked");
                localStorage.setItem(toDoKey, JSON.stringify(items));
                loadData();
            })
            li.children("a").on("click", function () {
                let items = JSON.parse(localStorage.getItem(toDoKey));
                items.splice(input.parent().attr("data-index"), 1);
                localStorage.setItem(toDoKey, JSON.stringify(items));
                loadData();
            })
        })
        $(".doing .title p").text(doingList[0].childElementCount);
        $(".done .title p").text(doneList[0].childElementCount);
    }
})