var page = {

  messageListener: function() {
    console.log('translate: page activated');
    page.appendDom();

    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.theresult) {
        sendResponse('resOK');
        page.addResult(request.theresult);
      } else {
        sendResponse('resError');
      }
    });
  },

  appendDom: function() {
    if ($('#translate-box').length > 0) {
      return;
    }

    var inserted = '<div style="position: fixed;right: 10px;bottom: 10px;" id="translate-box"><p style="font-family:Microsoft Yahei;background: #eee;border-radius: 5px;padding: 10px;font-size: 14px" id="translate-text"></p></div>';

    $("body").append(inserted);

  },

  addResult: function(result) {
    var temp = $('#translate-box').is(":hidden");
    if (temp) {
      $('#translate-box').show();
    }
    $('#translate-text').html(result);

    $('#translate-box').bind('click', function() {
      $(this).hide();
    })
  },


  init: function() {
    page.messageListener();
  }
}

page.init();