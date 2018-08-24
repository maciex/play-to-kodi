chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var findAudioLink = function(){
            try {
                return $('#fancybox-outer').find('video').attr('src');
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
            console.log(link);
            sendResponse({url: link.split('?')[0]});
        }

        if ("getUtvarpSagaUrl" == request.action) {
            var link = findStreamLink();
            if (link) {
                play_file(link);
            }else{
                play_file(findAudioLink());
            }
        }
    }
);
