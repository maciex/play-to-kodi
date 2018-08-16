chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var findAudioLink = function(){
            try {
                return $('html').html().match("(https|http).*?\\.mp3")[0];
            }catch(e){
                return null;
            }
        }

        var findStreamLink = function(){
            try {
                return $('html').find('source').attr('src');
            }catch(e){
                return null;
            }
        }

        var play_file = function(link){
            sendResponse({url: link.split('?')[0]});
        }

        if ("getUtvarpSagaUrl" == request.action) {
            var link = findStreamLink();
            if (link) {
                console.log('Stream');
                play_file(link);
            }else{
                console.log('File');
                play_file(findAudioLink());
            }
        }
    }
);
