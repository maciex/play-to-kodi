chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var getMediaUrl = function(){
            try {
                return $('html').html().match("(https|http)://videos.full30.com.*?\\.mp4")[0];
            } catch(e){
                console.log(e);
                return null;
            }
        }
        if ("getFull30Url" == request.action) {
            var videoLink = getMediaUrl();
            if (videoLink) {
                sendResponse({url: videoLink});
            }
        }
    }
);
