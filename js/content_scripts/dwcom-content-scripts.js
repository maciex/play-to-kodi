chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var videoLink = $( "input[name='file_name']" ).attr('value');
        console.log(videoLink);
        if ("getDWComUrl" == request.action) {
            //var videoLink = $('html').find('source').attr('src');
            if (videoLink) {
                sendResponse({url: videoLink});
            }
        }
    }
);
