chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var link = null
        try{
            link = $('html').find('video').attr('src');
        }catch(e){
            console.log('Video tag not found.');
        }
        try{
            link = $('html').find('audio').attr('src');
        }catch(e){
            console.log('Video tag not found.');
        }
        if ("getUtvarpSagaUrl" == request.action) {
            if (link) {
                console.log(link);
                sendResponse({url: link});
            }
        }
    }
);
