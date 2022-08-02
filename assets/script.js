$(document).ready(function(){
	
	var watchdog = undefined;
	
	function run ()
	{
		clearTimeout(watchdog);
		$.ajax({
			url: "run"
		}).always(function() {
			ping();
		});
		hideStart();
	}
	
	function hideStart()
	{
		$('#czysc').fadeOut(function(){
			$(this).after('<div id="komunikat"></div>');
			$(this).remove();
			$('#komunikat').css('display','none').append('<span>Czyszczenie skończy się za <span id="licznik">10</span> sekund.</span><br /><span>Po tym czasie wróć do GTAO.</span>').fadeIn();
		});
	}
	
	function hideProcess()
	{
		$('#komunikat').fadeOut(function(){
			$(this).after('<span id="czysc">Wyczyść sesję!</span>').remove();
			$('#czysc').click(function(){run();});
			$('#czysc').css('display','none').fadeIn();
		});
	}
	
	function startWatch()
	{
		$.ajax({
			url: "./sleeping.tmp"
		}).done(function(){
			hideStart();
			ping();
		}).fail(function(){
			watchdog = setTimeout(function(){startWatch();},500);
		});
	}
	
	function ping ()
	{
		console.log('ping');
		$.ajax({
			url: "./sleeping.tmp" 
		}).done(function(d) {
			$('#licznik').html(d);
			console.log(d);
			setTimeout(function(){ping();},250);
		}).fail(function(){
			hideProcess();
			console.log('fail, file not exist');
			startWatch();
		}).always(function(){
			console.log('pong');
		});
	}
	
	$('#czysc').click(function(){run();});
	
	ping();
	//$('#czysc').click();
	
});