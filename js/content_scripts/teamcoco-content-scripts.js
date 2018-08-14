chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    	console.log('TeamCoco!');
        if ("getTeamCocoUrl" == request.action) {
        	console.log('TeamCoco getTeamCocoUrl!!!')

            var videoLink = $('html').find('video').attr('src');
            console.log('Video link: ' + videoLink);
            
            if (videoLink) {
                sendResponse({url: videoLink});
            }
            
        }
    }
);

