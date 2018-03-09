
var loc = document.location.href;

chrome.runtime.sendMessage({ dom: 'sound cloud', browser: 'chrome', location: loc });

var scripts = document.querySelectorAll('script')
var last = scripts[scripts.length - 1]
console.log(last)
console.log(scripts)



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
    var command = data['command']
    if (command == 'GET_CLIENT_ID') {
        get_client_id(function (id) {
            console.log('Sending id to main process')
            send_data_to_main_process({
                responding_to: command,
                data: id
            })
        })
    }else if(command == 'SEARCH_SONGS'){
        let val = data.value;
        let client_id = data.client_id;
        let url = "https://api-v2.soundcloud.com/search"
        url += '?q=' + val;
        url += '&client_id=' + client_id;     
        getData(url, function(res_data){
            // console.log(data)
            res_data = escapeJSON(res_data)
            res_data = JSON.parse(res_data)
            let data = res_data.collection;
            console.log(data)
            const MAX_RESULTS = 5;
            toret = [];
            for(var i=0; i<data.length; i++){
                let item = data[i]
                if(item.kind == 'track'){
                    // it is a track item
                    toret.push({
                        'thumbnail': item.artwork_url,
                        'url': item.permalink_url,
                        'title': item.title
                    })
                    if(toret.length >= MAX_RESULTS){
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
    }
}




var escapeJSON = function(s){
    toret = ''
    for(var i=0; i<s.length; i++){
      var code = s.charCodeAt(i);
      if(code > 127){
        console.log(code);
        console.log(s.charAt(i))
      }else{
        toret += s.charAt(i)
      }
    }
    return toret;
  }
  