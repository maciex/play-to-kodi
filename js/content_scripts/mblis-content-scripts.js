chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var getMedia = function() {
            try{
                return $('html').find('source').attr('src');
            }catch(e){
                return null;
            }
        }

        var link = getMedia();
        console.log(link);
        if ("getMblIsUrl" == request.action) {
            if (link) {
                console.log(link);
                sendResponse({url: link});
            }
        }
    }
);
