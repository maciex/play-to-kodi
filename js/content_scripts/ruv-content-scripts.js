'use strict';

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('Rúv!');
        var url = null,
            MediaType = 'audio',
            radio_url = null,
            audio_url = null,
            video_url = null;
            
        /*

        thing = $('html').html().match("(https|http)://www.ruv.is/utvarp/static/js/main..*?\\.js");
        radio_url = content.match("(https|http)://ruvruv-live.hls.adaptive.level3.net/.*?\\.m3u8")[0];
        audio_url = $('audio').html().match("(https|http).*?^\s-\\.mp3")[0];
        video_url = $('video').html().match("(https|http)://.*?[^\s-]\\.m3u8")[0];

        */

        try{
            audio_url = $('html').html().match("src=\"(https|http)://sip-ruv-vod.dcp.adaptive.level3.net.*?\\.mp3")[0].slice(5);
        }catch(e){
            console.log(e);
        }

        try{
            video_url = $('html').html().match("(https|http)://.*?\\.m3u8")[0];
        }catch(e){
            console.log(e);
        }

        if (audio_url) {
            url = audio_url;
        } else if (video_url) {
            url = video_url;
            MediaType = 'video';
        } else {
            url = radio_url;
        }

        if ("getRuvIsUrl" === request.action && url) {
            console.log('MediaType: ' + MediaType);
            console.log('url: ' + url);
            sendResponse({url: url, MediaType: MediaType});
        }else{
            console.log('No match found!');
        }
    }
);
