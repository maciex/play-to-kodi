chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var getMediaUrl = function(){
            try {
                var url = $('meta[property="og:video:url"]').attr('content');
                console.log(url);
                return url;
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
