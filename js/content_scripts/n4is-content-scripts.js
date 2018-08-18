chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if ("getN4IsUrl" == request.action) {
            var videoLink = $('html').find('source').attr('src');
            if (videoLink) {
                sendResponse({url: videoLink});
            }
        }
    }
);
