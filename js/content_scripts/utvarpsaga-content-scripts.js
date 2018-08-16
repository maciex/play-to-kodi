chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if ("getUtvarpSagaUrl" == request.action) {
            var videoLink = $('html').find('video').attr('src');
            if (videoLink) {
                sendResponse({url: videoLink});
            }
            
        }
    }
);

