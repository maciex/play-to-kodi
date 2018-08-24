chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        /*
        Audio working. Video needs work.
        */
        var getVideoLink = function (html){
            try {
                var videoLink = html.match("\/hls\/.*?\\.(m3u8|mp3)")[0];
                console.log(videoLink);
                return videoLink;
            }catch(e){
                console.log(e);
                return null;
            }
        }
        
        var getHostLink = function (html){
            try {
                var hostLink = html.match("Host: '.*?\\',")[0].slice(7, -2);
                console.log(hostLink);
                return hostLink;
            }catch(e){
                console.log(e);
                return null;
            }
        }
        
        var getIframeSrc = function (html){
            try { 
                var iframeUrl = html.find('figure').find('iframe').attr('src');
                var url = 'http://www.visir.is' + iframeUrl;

                var url = $.get(url, function(data, status){
                    var uri = data.match("\/hls\/.*?\\.(m3u8|mp3)")[0]
                    var host = data.match("Host: '.*?\\',")[0].slice(7, -2);
                    console.log('uri: ' + uri);
                    console.log('host: ' + host);
                    var url = host + uri;
                    if ("getVisirIsUrl" == request.action && url) {
                        console.log('play url: https://' + url);
                        play(url);
                    }
                });

                return url;
            }catch(e){
                console.log(e);
                return null;
            }
        }

        var play = function (url) {
            if (sources['videoLink']) {
                sendResponse({url: 'https://' + url});
            }
        }

        var sources = {
            'videoLink': getVideoLink($('html').html()),
            'IframeSrc': getIframeSrc($('html')),
            'hostLink': getHostLink($('html').html())
        }

        var url = sources['hostLink'] + sources['videoLink'];

        if ("getVisirIsUrl" == request.action &&  sources['hostLink'] && sources['videoLink']) {
            console.log('play url: https://' + url);
            play(url);
        }
    }
);
