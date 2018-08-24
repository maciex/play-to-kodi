chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var getMediaUrl = function(){
            try {
                return $('meta[property="og:video:url"]').attr('content');
            } catch(e){
                console.log(e);
                return null;
            }
        }
        if ("getNeatClipUrl" == request.action) {
            var videoLink = getMediaUrl();
            if (videoLink) {
                sendResponse({url: videoLink});
            }
        }
    }
);
