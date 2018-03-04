chrome.runtime.sendMessage({dom:'dom data', browser: 'chrome'});

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event){
    console.log(event)
    var data = event.data;
    var command = data['command']
    if(command == 'SONG_NEXT'){
        next_song()
    }else if(command == 'CHANGE_VOLUME'){
        var value = data['value'];
        change_volume(value);
    }else if(command == 'SONG_PLAY'){
        play_song()
    }else if(command == 'SONG_PAUSE'){
        pause_song()
    }
}

function get_video_element(){
    return document.getElementsByTagName("video")[0];
}

function get_next_button(){
    return document.getElementsByClassName("ytp-next-button")[0];
}

function get_play_pause_button(){
    return document.getElementsByClassName("ytp-play-button")[0];
}

function play_song(){
    var play = get_play_pause_button();
    play.click();
}

function pause_song(){
    var pause = get_play_pause_button();
    pause.click();
}

// change volume
function change_volume(vol){
    console.log('in change volume')
    var video = get_video_element()    
    if(vol >= 0 && vol <=1){
        // correct range
        video.volume = vol;
    }else{
        video.volume = 0.3;
    }
}


// next button
function next_song(){
    console.log('in next song')
    var next = get_next_button()
    console.log(next)
    next.click()
}


