function bubble(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j + 1] > array[j]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}

let box = document.querySelector('.box');

box.addEventListener('mousedown', function (e) {
    var x = e.pageX - box.offsetLeft;
    var y = e.pageY - box.offsetTop;
    var move = function (e) {
        box.style.left = e.pageX - x + 'px';
        box.style.top = e.pageY - y + 'px';
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', move);
    })
});
