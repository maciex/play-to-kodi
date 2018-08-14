chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if ("getTeamCocoUrl" == request.action) {
            var videoLink = $('html').find('video').attr('src');
            if (videoLink) {
                sendResponse({url: videoLink});
            }
            
        }
    }
);

