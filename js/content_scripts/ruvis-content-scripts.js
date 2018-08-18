'use strict';

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        /*
        Most of the media formats on the page will play.
        */

        var url = null,
            mediaType = 'audio',
            radio_url = null,
            audio_url = null,
            video_url = null;

        var findAudio = function(){
            try{
                return $('html').html().match("src=\"(https|http)://sip-ruv-vod.dcp.adaptive.level3.net.*?\\.mp3")[0].slice(5);
            }catch(e){
                console.log(e);
                return null;
            }
        }

        var findVideo = function(){
            try{
                var url = $('html').html().match("(https|http)://.*?\\.mp4")[0];
                if(url.includes('?')){
                    var x = $('html').html().match("(https|http)://.*:500.*:800.*1200.*2400.*3600")[0]
                    var stream = x.match('\\d+/\\d+/\\d+/3600kbps/\\w+.mp4')[0];
                    var url = x.match('(https|http)://..*.\\w+.\\w+.\\w+.net/\\w+/')[0];
                    console.log('stream: ' + url+stream);
                    return url+stream;
                }
                return url;
            }catch(e){
                console.log(e);
                return null;
            }
        }

        var findUrl = function(){
            try{
                if (findAudio()) {
                    console.log('Audio found!');
                    return findAudio();
                } else if (findVideo()) {
                    console.log('Video found!');
                    mediaType = 'video';
                    return findVideo();
                } else {
                    console.log('Something found!');
                    var data = $('html').find('video')[0].src;
                    console.log(data);
                    return data;
                }
            }catch(e){
                console.log(e);
                return null;
            }
        }

        var url = findUrl();
        console.log('url: ' + url);
        
        if ("getRuvIsUrl" === request.action) {
            if(url && typeof url == 'string'){
                console.log('MediaType: ' + mediaType);
                sendResponse({url: url, mediaType: mediaType});
            }
        }
    }
);
