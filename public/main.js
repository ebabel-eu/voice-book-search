"use strict";
var select_language = document.getElementById('select_language');
var select_dialect = document.getElementById('select_dialect');
var start_button = document.getElementById('start_button');
var info = document.getElementById('info');
var start_img = document.getElementById('start_img');
var showInfo = function (s) {
    if (s) {
        for (var child = info.firstChild; child; child = child.nextSibling) {
            if (child.style) {
                child.style.display = child.id == s ? 'inline' : 'none';
            }
        }
        info.style.visibility = 'visible';
    }
    else {
        info.style.visibility = 'hidden';
    }
};
var upgrade = function () {
    start_button.style.visibility = 'hidden';
    showInfo('info_upgrade');
};
showInfo('info_start');
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var recognition;
if (!('webkitSpeechRecognition' in window)) {
    upgrade();
}
else {
    start_button.style.display = 'inline-block';
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = function () {
        recognizing = true;
        showInfo('info_speak_now');
        start_img.src = 'img/microphone/mic-animate.gif';
    };
    recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
            start_img.src = 'img/microphone/mic.gif';
            showInfo('info_no_speech');
            ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
            start_img.src = 'img/microphone/mic.gif';
            showInfo('info_no_microphone');
            ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
                showInfo('info_blocked');
            }
            else {
                showInfo('info_denied');
            }
            ignore_onend = true;
        }
    };
    recognition.onend = function () {
        recognizing = false;
        if (ignore_onend) {
            return;
        }
        start_img.src = 'img/microphone/mic.gif';
        if (!final_transcript) {
            showInfo('info_start');
            return;
        }
        showInfo('');
    };
    recognition.onresult = function (event) {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            }
            else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        final_transcript = capitalize(final_transcript);
        if (final_transcript || interim_transcript) {
            showButtons('inline-block');
        }
    };
}
var two_line = /\n\n/g;
var one_line = /\n/g;
var linebreak = function (s) { return s.replace(two_line, '<p></p>').replace(one_line, '<br>'); };
var first_char = /\S/;
var capitalize = function (s) { return s.replace(first_char, function (m) { return m.toUpperCase(); }); };
var startButton = function (event) {
    if (recognizing) {
        recognition.stop();
        return;
    }
    final_transcript = '';
    recognition.lang = select_dialect.value;
    recognition.start();
    ignore_onend = false;
    start_img.src = 'img/microphone/mic-slash.gif';
    showInfo('info_allow');
    showButtons('none');
    start_timestamp = event.timeStamp;
};
var current_style;
var showButtons = function (style) {
    if (style == current_style) {
        return;
    }
    current_style = style;
};
start_button.addEventListener('click', startButton);
