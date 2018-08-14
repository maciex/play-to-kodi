chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
            console.log('Rúv!');
            try {
                thing = $('html').html().match("(https|http)://www.ruv.is/utvarp/static/js/main..*?\\.js")[0];
            
                $.get(thing, function(contents) {
                },'text').then(function(contents){
                    radio_url = contents.match("(https|http)://ruvruv-live.hls.adaptive.level3.net/.*?\\.m3u8")[0];
                    console.log('radio_url inside get: ' + radio_url)
                    sendResponse({url: radio_url});
                });
            }

            catch(e){
               radio_url = null;
            }
            try {
                audio_url = $('html').html().match("(https|http).*?\\.mp3")[0];
                console.log('audio_url: ' + audio_url);
            }
            catch(e){
               audio_url = null;
            }
    
            try {
                video_url = $('html').html().match("(https|http)://.*?\\.m3u8")[0];
                console.log('video_url: ' + video_url);
            }
            catch(e){
               video_url = null;
            }

            if(audio_url){
                url = audio_url;
            }
            else if(video_url){
                url = video_url
            }
            else{
                url = radio_url;
            }

        if ("getRuvIsUrl" == request.action) {

                sendResponse({url: url});
        }
    }
);
