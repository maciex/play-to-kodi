'use strict';

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('Rúv!');
        var url = null,
            mediaType = 'audio',
            radio_url = null,
            audio_url = null,
            video_url = null;
            
        /*
        thing = $('html').html().match("(https|http)://www.ruv.is/utvarp/static/js/main..*?\\.js");
        radio_url = content.match("(https|http)://ruvruv-live.hls.adaptive.level3.net/.*?\\.m3u8")[0];
        audio_url = $('audio').html().match("(https|http).*?^\s-\\.mp3")[0];
        video_url = $('video').html().match("(https|http)://.*?[^\s-]\\.m3u8")[0];
        */

        var findAudio = function(html){
            try{
                return $(html).html().match("src=\"(https|http)://sip-ruv-vod.dcp.adaptive.level3.net.*?\\.mp3")[0].slice(5);
            }catch(e){
                console.log(e);
                return null;
            }
        }

        var findVideo = function(html){
            try{
                return $(html).html().match("(https|http)://.*?\\.mp4")[0];
            }catch(e){
                console.log(e);
                return null;
            }
        }

        if (findAudio('html')) {
            console.log('Audio found!');
            url = findAudio('html');
        } else if (findVideo('html')) {
            console.log('Video found!');
            url = findVideo('html');
            mediaType = 'video';
        } else {
            console.log('Something found!');
            //url = radio_url;
        }
        console.log(url);
        if ("getRuvIsUrl" === request.action) {
            console.log('MediaType: ' + mediaType);
            console.log('url: ' + url);
            sendResponse({url: url, mediaType: mediaType});
        }
    }
);
