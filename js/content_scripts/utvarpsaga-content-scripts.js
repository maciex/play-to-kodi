chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if ("getUtvarpSagaUrl" == request.action) {
            var link = $('html').html().match("(https|http).*?\\.mp3")[0];
            if (link) {
                sendResponse({url: link.split('?')[0]});
            }
        }
    }
);
