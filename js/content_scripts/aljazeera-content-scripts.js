chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        /*
        17.08.2018 - Partially working.
        */
        var getIframeSrc = function(){
            try {
                var iframeUrl = $('iframe').attr('src');
                console.log(iframeUrl);
                $.get(iframeUrl, function(data, status){
                    console.log('status: ' + status);
                    console.log(data);
                    //var url = $(data).find('video').attr('src');
                    //console.log(url);
                    //var url = '';
                    //return url;
                }).done(function(data){
                    console.log('AlJazeera iframe done!');
                    console.log(data);
                }).fail(function(e){
                    console.log('AlJazeera iframe failed!');
                    console.log(e.message);
                });
            }catch(e){
                console.log(e);
                return null;
            }
        }

        var videoLink = getIframeSrc();
        console.log(videoLink);
        if ("getAlJazeeraUrl" == request.action) {
            if (videoLink) {
                sendResponse({url: videoLink});
            }
        }
    }
);
