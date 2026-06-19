(function(){
var video=document.querySelector('.movie-player');
var trigger=document.querySelector('.play-trigger');
if(!video)return;
var source=video.getAttribute('src');
var ready=false;
function prepare(){
if(ready)return;
ready=true;
if(window.Hls&&window.Hls.isSupported()){
video.removeAttribute('src');
var hls=new window.Hls({enableWorker:true,lowLatencyMode:true});
hls.loadSource(source);
hls.attachMedia(video);
}else if(source){
video.src=source;
}
}
function start(){
prepare();
if(trigger)trigger.classList.add('hide');
var play=video.play();
if(play&&play.catch)play.catch(function(){});
}
if(trigger)trigger.addEventListener('click',start);
video.addEventListener('click',function(){if(video.paused)start();});
video.addEventListener('play',function(){if(trigger)trigger.classList.add('hide');});
})();