
var loc = document.location.href;

chrome.runtime.sendMessage({ dom: 'sound cloud', browser: 'chrome', location: loc });

var scripts = document.querySelectorAll('script')
var last = scripts[scripts.length - 1]
console.log(last)
console.log(scripts)


// function round(value, decimals) {
//     return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
// }

function get_play_pause_button() {
    let buttons = document.querySelectorAll('.sc-button-play')
    return buttons[0];
}


function get_volume_element() {
    let vol = document.querySelectorAll('.volume')
    return vol[0];
}


function get_next_button() {
    return document.querySelector('.playControls__next')
}

function play() {
    let play_pause = get_play_pause_button()
    let start = play_pause.getAttribute('title')
    if (start == 'Play') {
        play_pause.click()
    }
}

function pause() {
    let play_pause = get_play_pause_button()
    let start = play_pause.getAttribute('title')
    if (start == 'Pause') {
        play_pause.click()
    }
}

function next_song() {
    // let next = get_next_button();
    // next.click()
    var next = document.querySelector('.soundBadgeList__item')
    next = next.querySelector('.soundTitle__title')
    var href = next.getAttribute('href')
    document.location.href = 'https://soundcloud.com' + href
}


function get_current_song_info() {
    let bad = document.querySelector('.playbackSoundBadge__avatar')
    let url = bad.getAttribute('href')
    url = 'https://soundcloud.com' + url

    let img = bad.querySelector('.image__full')
    let style = img.getAttribute('style')
    let img_url = style.split(';')[0]
    let title = img.getAttribute('aria-label')

    const regex = /"(.*)"/g;
    img_url = regex.exec(img_url)[1]

    let toret = {
        'thumbnail': img_url,
        'url': url,
        'title': title
    }
    return toret
}



function change_volume(vol) {
    let vol_el = get_volume_element();
    let currvol = vol_el.getAttribute('data-level');
    currvol = parseInt(currvol)
    vol = Math.round(vol * 10)
    let diff = currvol - vol;
    let key = null;
    if (diff > 0) {
        // current volume is more, reduce it
        key = 'ArrowDown';
    } else {
        key = 'ArrowUp'
    }
    diff = Math.abs(diff)
    for (var i = 0; i < diff; i++) {
        document.dispatchEvent(new KeyboardEvent('keydown', { 'key': key, 'shiftKey': true }));
    }


}

getData = function (url, callback) // How can I use this callback?
{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseText); // Another callback here
        }
    };
    request.open('GET', url);
    request.send();
}

// getText('https://a-v2.sndcdn.com/assets/app-663bb2e-3eac5ea-3.js', function (data) {
//     // console.log(data)
//     console.log("id is: ", find_client_id(data))
// })


function find_client_id(str) {
    const regex = /client_id:\"[a-zA-Z0-9]+\"/g;

    let m;
    let id = null;
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        console.log(m)
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
            id = match;
        });

        const reg = /\"([a-zA-Z0-9]+)\"/g;
        var gp = reg.exec(id)
        return gp[1];
    }
}


function get_client_id(callback) {
    getData('https://a-v2.sndcdn.com/assets/app-663bb2e-3eac5ea-3.js', function (data) {
        // console.log(data)
        let id = find_client_id(data)
        callback(id)
    })
}

// #######################################
// communication with main process
// #######################################

function send_data_to_main_process(data) {
    chrome.runtime.sendMessage(data);
}

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    console.log(event)
    var data = event.data;
    if (data.for != 'SOUNDCLOUD') {
        return
    }
    var command = data['command']
    if (command == 'GET_CLIENT_ID') {
        get_client_id(function (id) {
            console.log('Sending id to main process')
            send_data_to_main_process({
                responding_to: command,
                data: id
            })
        })
    } else if (command == 'SEARCH_SONGS') {
        let val = data.value;
        let client_id = data.client_id;
        let url = "https://api-v2.soundcloud.com/search"
        url += '?q=' + val;
        url += '&client_id=' + client_id;
        getData(url, function (res_data) {
            // console.log(data)
            res_data = escapeJSON(res_data)
            res_data = JSON.parse(res_data)
            let data = res_data.collection;
            console.log(data)
            const MAX_RESULTS = 5;
            toret = [];
            for (var i = 0; i < data.length; i++) {
                let item = data[i]
                if (item.kind == 'track') {
                    // it is a track item
                    toret.push({
                        'thumbnail': item.artwork_url,
                        'url': item.permalink_url,
                        'title': item.title
                    })
                    if (toret.length >= MAX_RESULTS) {
                        break;
                    }
                }
            }
            send_data_to_main_process({
                responding_to: command,
                data: toret,
                query: val
            })
        })
    } else if (command == 'SONG_NEXT') {
        next_song()
    } else if (command == 'CHANGE_VOLUME') {
        var value = data['value'];
        change_volume(value);
    } else if (command == 'SONG_PLAY') {
        play()
    } else if (command == 'SONG_PAUSE') {
        pause()
    } else if (command == 'GET_SONG_INFO') {
        let data = get_current_song_info();
        send_data_to_main_process({
            responding_to: command,
            data: data
        })
    }
}




var escapeJSON = function (s) {
    toret = ''
    for (var i = 0; i < s.length; i++) {
        var code = s.charCodeAt(i);
        if (code > 127) {
            console.log(code);
            console.log(s.charAt(i))
        } else {
            toret += s.charAt(i)
        }
    }
    return toret;
}
