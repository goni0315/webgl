/*********************************************************
 * 엔진 파일을 로드합니다.
 * 파일은 asm.js파일, html.mem파일, js 파일 순으로 로드하며,
 * 로드 시 버전 명(engineVersion)을 적용합니다.
 *********************************************************/

;(function(){   
	
	// 1. XDWorldEM.asm.js 파일 로드
	var file = "js/XDWorldEM.asm.js?p="+engineVersion;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', file, true);
	xhr.onload = function() {
	  	
		var script = document.createElement('script');
		script.innerHTML = xhr.responseText;
		document.body.appendChild(script);
	
		// 2. XDWorldEM.html.mem 파일 로드
		setTimeout(function() {
			(function() {
				
			    var memoryInitializer = 'js/XDWorldEM.html.mem?p='+engineVersion;
				var xhr = Module['memoryInitializerRequest'] = new XMLHttpRequest();
			    xhr.open('GET', memoryInitializer, true);
			    xhr.responseType = 'arraybuffer';
			    xhr.onload =  function(){
					
					// 3. XDWorldEM.js 파일 로드
			        var url = "js/XDWorldEM.js?p="+engineVersion;
					var xhr = new XMLHttpRequest();
					xhr.open('GET',url , true);
					xhr.onload = function(){
					   	var script = document.createElement('script');
					   	script.innerHTML = xhr.responseText;
					   	document.body.appendChild(script);
					};
					xhr.send(null);
				}  
			    xhr.send(null);
			})();	
		}, 1);
	};
	xhr.send(null);

})();


/* 브라우저 이벤트 등록 */
window.onresize = function(e) {
	Module.Resize(window.innerWidth, window.innerHeight);	// 화면 크기 조정
	Module.getMap().MapRender();							// 화면 갱신
};


/*********************************************************
 *	엔진파일 로드 후 Module 객체가 생성되며,
 *  Module 객체를 통해 API 클래스에 접근 할 수 있습니다. 
 *	 - Module.postRun : 엔진파일 로드 후 실행할 함수를 연결합니다.
 *	 - Module.canvas : 지도를 표시할 canvas 엘리먼트를 연결합니다.
 *********************************************************/
 
var Module = {
	postRun: [init],
	canvas: (function() {
		
		// Canvas 엘리먼트 생성
		var canvas = document.createElement('canvas');
		
		// Canvas id, Width, height 설정
		canvas.id = "canvas";
		canvas.width="calc(80%)";
		canvas.height="100%";
		
		// Canvas 스타일 설정
		canvas.style.position = "fixed";
		canvas.style.top = "0px";
		canvas.style.left = "0px";

		// canvas 이벤트 설정
		canvas.addEventListener("contextmenu", function(e){
			e.preventDefault();
		});
		
		// 생성한 Canvas 엘리먼트를 body에 추가합니다.
		document.body.appendChild(canvas);
		
		return canvas;
		
	})()
};


/* 엔진 로드 후 실행할 초기화 함수(Module.postRun) */
function init() {

    // 엔진 초기화 API 호출(필수)
    Module.Start(window.innerWidth, window.innerHeight);

    // 지도 데이터 로드
    var url = "http://xdworld.vworld.kr:8080";
	Module.XDEMapCreateLayer("poi_bound", url, 8080, false, true, false, 5, 0, 15);
}