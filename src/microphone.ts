const select_language = document.getElementById('select_language') as HTMLSelectElement;
const select_dialect = document.getElementById('select_dialect') as HTMLSelectElement;
const start_button = document.getElementById('start_button') as HTMLButtonElement;
const info = document.getElementById('info') as HTMLDivElement;
const start_img: HTMLImageElement = document.getElementById('start_img') as HTMLImageElement;

const showInfo: (s: string) => void = (s: string) => {
  if (s) {
    for (let child: HTMLElement = info.firstChild as HTMLElement; child; child = child.nextSibling as HTMLElement) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}

const upgrade: () => void = () => {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}

showInfo('info_start');

let final_transcript: string = '';
let recognizing: boolean = false;
let ignore_onend: boolean;
let start_timestamp: number;
let recognition: SpeechRecognition;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  start_button.style.display = 'inline-block';
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    recognizing = true;
    showInfo('info_speak_now');
    start_img.src = 'img/microphone/mic-animate.gif';
  };

  recognition.onerror = (event: SpeechRecognitionError) => {
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
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = () => {
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

  recognition.onresult = (event) => {
    let interim_transcript: string = '';
    for (let i: number = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    if (final_transcript || interim_transcript) {
      showButtons('inline-block');
    }
  };
}

const two_line: RegExp = /\n\n/g;
const one_line: RegExp = /\n/g;
const linebreak: (s: string) => string = (s: string) => s.replace(two_line, '<p></p>').replace(one_line, '<br>');

const first_char: RegExp = /\S/;
const capitalize: (s: string) => string = (s: string) => s.replace(first_char, function(m: string) { return m.toUpperCase(); });

const startButton: (event: Event) => void = (event: Event) => {
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
}

let current_style: string;
const showButtons = (style: string): void => {
  if (style == current_style) {
    return;
  }
  current_style = style;
};

start_button.addEventListener('click', startButton);
