let loadTimes = 0
function start(){
    let timeout = setTimeout(() => {
        // match youdao translate box change the css，then it looks purer
        const translateContainer = document.querySelector(".translate-tab-container .tab-body");
        if (translateContainer) {
            translateContainer.style.position = 'fixed'
            translateContainer.style.zIndex =  2000
            translateContainer.style.inset = 0
            loadTimes = 0
            clearTimeout(timeout)
        }else{
            loadTimes ++
            if(loadTimes>6){
                loadTimes = 0
                return
            }
            start()
        }
    }, 500)
}
start()

