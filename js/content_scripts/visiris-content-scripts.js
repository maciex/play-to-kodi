chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        try {

            var videoLink = $('html').html().match("\/hls\/.*?\\.m3u8")[0];
            var hostLink = $('html').html().match("Host: '.*?\\',")[0].slice(7, -2);
            console.log(videoLink);
            console.log(hostLink);
        }catch(e){
            console.log(e);
        }

        if ("getVisirIsUrl" == request.action) {
            if (videoLink) {
                sendResponse({url: 'https://' + hostLink+videoLink});
            }
        }
    }
);

