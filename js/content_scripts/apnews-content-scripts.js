chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if ("getAPNewsUrl" == request.action) {
            var videoLink = $('html').find('source').attr('src');
            if (videoLink) {
                sendResponse({url: videoLink});
            }
            
        }
    }
);

