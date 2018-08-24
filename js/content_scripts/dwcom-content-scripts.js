chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        /*
        File format: flv
        Bug: Video starts playing sound but stops after few seconds.
             The screen is black the whole time.
        */
        if ("getDWComUrl" == request.action) {
            var videoLink = $( "input[name='file_name']" ).attr('value');
            if (videoLink) {
                sendResponse({url: videoLink});
            }
        }
    }
);
