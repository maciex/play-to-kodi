chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        /*
        Currently not working needs more work.
        */
        if ("getVisirIsUrl" == request.action) {
            var getVideoLink = function(html){
                try {
                    var videoLink = html.match("\/hls\/.*?\\.(m3u8|mp3)")[0];
                    console.log(videoLink);
                    return videoLink;
                }catch(e){
                    console.log(e);
                    return null;
                }
            }
            
            var getHostLink = function(html){
                try {
                    var hostLink = html.match("Host: '.*?\\',")[0].slice(7, -2);
                    console.log(hostLink);
                    return hostLink;
                }catch(e){
                    console.log(e);
                    return null;
                }
            }
            
            var getIframeSrc = function(html){
                try {
                    var iframeUrl = html.find('figure').find('iframe').attr('src');
                    var url = 'http://www.visir.is' + iframeUrl;

                    $.get(url, function(data, status){
                        //alert("Data: " + data + "\nStatus: " + status);
                        var uri = data.match("\/hls\/.*?\\.(m3u8|mp3)")[0]
                        var host = data.match("Host: '.*?\\',")[0].slice(7, -2);

                        return host + uri
                    }).then(function(url){
                        sendResponse({url: 'http://' + url});
                    });
                }catch(e){
                    console.log(e);
                    return null;
                }
            }

            try{
                var videoLink = getVideoLink($('html').html());
            }catch(e){
                console.log(e);
            }

            try{
                var hostLink = getHostLink($('html').html());
            }catch(e){
                console.log(e);
            }

            try{
                var IframeSrc = getIframeSrc($('html'));
            }catch(e){
                console.log(e);
            }

            if (videoLink) {
                sendResponse({url: 'http://' + hostLink+videoLink});
            }else if(IframeSrc){
                console.log(IframeSrc);
                sendResponse({url: 'http://' + IframeSrc});
            }
        }
    }
);
