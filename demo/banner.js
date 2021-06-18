window.addEventListener('load', function () {
    const bannerBox = document.querySelector('.banner-box');
    const arrowLeft = document.querySelector('.left');
    const arrowRight = document.querySelector('.right');
    const dotList = document.querySelector('.dot-list');
    const imageList = document.querySelector('.image-list');
    // 鼠标在图片上显示左右箭头
    bannerBox.addEventListener('mouseenter', function () {
        arrowLeft.style.display = 'block';
        arrowRight.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    bannerBox.addEventListener('mouseleave', function () {
        arrowLeft.style.display = 'none';
        arrowRight.style.display = 'none';
        timer = setInterval(function () {
            arrowRight.click();
        }, 2000)
    })
    // 自动生成小圈圈
    let imageCount = imageList.childElementCount;
    let listArray = [];
    for (let i = 0; i < imageCount; i++) {
        listArray[i] = '<li><a href="javascript:void(0)"></a></li>';
        dotList.innerHTML = listArray.join('');
    }
    dotList.firstChild.firstChild.className = 'dot-current';
    for (let i = 0; i < imageCount; i++) {
        dotList.children[i].firstChild.dataIndex = i;
    }
    // 克隆第一张和最后一张图片
    let firstImage = imageList.lastElementChild.cloneNode(true);
    imageList.insertBefore(firstImage, imageList.firstChild);
    let lastImage = imageList.children[1].cloneNode(true);
    imageList.appendChild(lastImage);
    //初始化index和left
    let index = 1;
    imageList.style.left = -400 * index + 'px';
    // 小圈圈点击事件
    dotList.addEventListener('click', function (e) {
        if ((e.target.tagName === 'A')) {
            let nextIndex = e.target.dataIndex + 1;
            clickEvent(nextIndex);
        }
    })
    arrowLeft.addEventListener('click', function () {
        let nextIndex = index - 1;
        clickEvent(nextIndex)
    })
    arrowRight.addEventListener('click', function () {
        let nextIndex = index + 1;
        clickEvent(nextIndex)
    })
    let timer = setInterval(function () {
        arrowRight.click();
    }, 2000)

    function clickEvent(nextIndex) {
        for (let i = 0; i < imageCount; i++) {
            dotList.children[i].firstChild.className = '';
        }
        animation(imageList, nextIndex * (-400), function () {
            if (nextIndex > imageCount) {
                imageList.style.left = '-400px';
            } else if (nextIndex < 1) {
                imageList.style.left = -400 * imageCount + 'px'
            }
        });
        if (nextIndex > imageCount) {
            index = 1;
        } else if (nextIndex < 1) {
            index = imageCount;
        } else {
            index = nextIndex;
        }
        dotList.children[index - 1].firstChild.className = 'dot-current'
    }
})
