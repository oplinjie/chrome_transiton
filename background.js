function queryWord(info, tab, ev) {
    var xmlhttp;
    var apiURL = 'http://fanyi.youdao.com/openapi.do?keyfrom=op-chrome-plugin&key=1753593094&type=data&doctype=json&version=1.1&q=' + info.selectionText;
    xmlhttp = new XMLHttpRequest();
    var result, id = tab.id;


   /* var ev = ev || window.event,
        left = ev.clientX,
        top = ev.clientY;

    console.log(left, top);*/

    console.log(arguments);

    var selection = document.getSelection();
    console.log(selection);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var resultObj = JSON.parse(xmlhttp.responseText);
            if (resultObj.errorCode == 0) {
                if (resultObj.basic) {
                    result = (resultObj.translation + ' [' + resultObj.basic.phonetic + ']' + ' ' + resultObj.basic.explains);
                } else {
                    result = (resultObj.translation);
                }
            }
            if (resultObj.errorCode == 20) {
                result = ("要翻译的文本过长！")
            }
            if (resultObj.errorCode == 30) {
                result = ("无法进行有效的翻译！")
            }
            if (resultObj.errorCode == 40) {
                result = ("不支持该类型的语言！")
            }
            if (resultObj.errorCode == 50) {
                result = ("无效的key！")
            }

            chrome.tabs.executeScript(null, {
                allFrames: false,
                file: "inc/jquery-2.1.0.min.js"
            }, function() {
                console.log('jquery executed');
                chrome.tabs.executeScript(null, {
                    allFrames: false,
                    file: "translate.js"
                }, function() {
                    console.log('translate executed')
                    chrome.tabs.sendMessage(id, {
                        theresult: result
                    }, function(response) {
                        console.log(response);
                    })
                });
            });
        }
    }

    xmlhttp.open("GET", apiURL, true);
    xmlhttp.send();
}

/*
使用%s显示选定的文本
*/
chrome.contextMenus.create({
    "title": "翻译选中的单词： %s",
    "contexts": ["selection"],
    "onclick": queryWord
});