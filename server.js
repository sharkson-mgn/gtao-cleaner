var http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs")
	port = process.argv[2] || 80,
	mimeTypes = {
		"html": "text/html",
		"jpeg": "image/jpeg",
		"jpg": "image/jpeg",
		"png": "image/png",
		"js": "text/javascript",
		"css": "text/css"
	},
	actions = {};

http.createServer(function(request, response) {

	var uri = url.parse(request.url).pathname,
		filename = path.join(process.cwd(), uri);

	var action = false;


	action = filename.replace(uri.substring(1),'actions\\'+uri.substring(1)).replace('.html','.js');
	if (action.split('.').pop() !== 'js')
		action += '.js';

	//console.log([filename,uri,action]);

	if (filename.split('.').pop() == 'html')
		filename = filename.replace(uri.substring(1),'html\\'+uri.substring(1));

	fs.exists(action, function(exists) {
		if(!exists) {
			return;
		}
		//console.log(action.split('\\')[action.split('\\').length-2]);
		if (action.split('\\')[action.split('\\').length-2] == 'actions')
		{
			require(action);
			actions['run.js']();
		}
	});

	fs.exists(filename, function(exists) {
		if(!exists) {
			response.writeHead(404, { "Content-Type": "text/plain" });
			response.write("404 Not Found\nuri: "+uri+"\nfilename: "+filename);
			response.end();
			return;
		}

		if (fs.statSync(filename).isDirectory())
			filename += '/html/index.html';

		var mimeType = mimeTypes[filename.split('.').pop()];

		if (!mimeType)
			mimeType = 'text/plain';

		fs.readFile(filename, "binary", function(err, file) {
			if(err) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}

			response.writeHead(200, { "Content-Type": mimeType });
			response.write(file, "binary");
			response.end();
		});
	});
}).listen(parseInt(port, 10));

function cls()
{
	process.stdout.write('\033c');
}

function random(min,max)
{
	if (min > max)
	{
		var tmp = min;
		min = max;
		max = tmp;
	}
	return Math.floor(Math.random() * max) + min
}

function getIp()
{
	var os = require('os');

	var interfaces = os.networkInterfaces();
	var addresses = [];
	for (var k in interfaces) {
		for (var k2 in interfaces[k]) {
			var address = interfaces[k][k2];
			if (address.family === 'IPv4' && !address.internal) {
				addresses.push('http://'+address.address+'/');
			}
		}
	}
	return addresses;
}

var komunikat = "Session washing powder in, cleaning agent ready to be activated. This window may be open. The washing machine did not work on the windows! To be able to press CTRL + C or ESC. To use it in the browser of any device belonging to the local network:";
// var komunikat = "Proszek do prania sesji wsypany, srodek czyszczacy gotowy do aktywowania. To okno może być zminimalizowane. Pralka nie działa po zamknięciu okna! Aby wyłączyć wciśnij CTRL+C lub ESC. Aby z niego skorzystac wpisz w przegladarce dowolnego urzadzenia nalezacego do sieci lokalnej:";

var logos = [
['   _______  _______  _______  _______           ',
'  (_______)(_______)(_______)(_______)          ',
'   _   ___     _     _______  _     _           ',
'  | | (_  |   | |   |  ___  || |   | |          ',
'  | |___) |   | |   | |   | || |___| |          ',
'   \_____/    |_|   |_|   |_| \_____/           ',
' _______  _                                     ',
'(_______)| |                                    ',
' _       | |  _____  _____  ____   _____   ____ ',
'| |      | | | ___ |(____ ||  _ \ | ___ | / ___)',
'| |_____ | | | ____|/ ___ || | | || ____|| |    ',
' \______) \_)|_____)\_____||_| |_||_____)|_|    ',
'                                                '],
['          ▄████ ▄▄▄█████▓ ▄▄▄       ▒█████                       ',
'         ██▒ ▀█▒▓  ██▒ ▓▒▒████▄    ▒██▒  ██▒                     ',
'        ▒██░▄▄▄░▒ ▓██░ ▒░▒██  ▀█▄  ▒██░  ██▒                     ',
'        ░▓█  ██▓░ ▓██▓ ░ ░██▄▄▄▄██ ▒██   ██░                     ',
'        ░▒▓███▀▒  ▒██▒ ░  ▓█   ▓██▒░ ████▓▒░                     ',
'         ░▒   ▒   ▒ ░░    ▒▒   ▓▒█░░ ▒░▒░▒░                      ',
'          ░   ░     ░      ▒   ▒▒ ░  ░ ▒ ▒░                      ',
'        ░ ░   ░   ░        ░   ▒   ░ ░ ░ ▒                       ',
'              ░                ░  ░    ░ ░                       ',
' ▄████▄   ██▓    ▓█████ ▄▄▄       ███▄    █ ▓█████  ██▀███  ',
'▒██▀ ▀█  ▓██▒    ▓█   ▀▒████▄     ██ ▀█   █ ▓█   ▀ ▓██ ▒ ██▒',
'▒▓█    ▄ ▒██░    ▒███  ▒██  ▀█▄  ▓██  ▀█ ██▒▒███   ▓██ ░▄█ ▒',
'▒▓▓▄ ▄██▒▒██░    ▒▓█  ▄░██▄▄▄▄██ ▓██▒   ███▒▒▓█  ▄ ▒██▀▀█▄  ',
'▒ ▓███▀ ░░██████▒░▒████▒▓█   ▓██▒▒██░   ▓██░░▒████▒░██▓ ▒██▒',
'░ ░▒ ▒  ░░ ▒░▓  ░░░ ▒░ ░▒▒   ▓▒█░░ ▒░   ▒ ▒ ░░ ▒░ ░░ ▒▓ ░▒▓░',
'  ░  ▒   ░ ░ ▒  ░ ░ ░  ░ ▒   ▒▒ ░░ ░░   ░ ▒░ ░ ░  ░  ░▒ ░ ▒░',
'░          ░ ░      ░    ░   ▒      ░   ░ ░    ░     ░░   ░ ',
'░ ░          ░  ░   ░  ░     ░  ░         ░    ░  ░   ░     ']


];

var strTool = function strTool(str)
{
	this.string = str;
	this.width = process.stdout.columns-1;
	this.shift = this.width;


}

var k = '';

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
	k = key.name;
	if ((key.ctrl && key.name === 'c') || key.name === 'escape') {
		process.exit();
	}
});

strTool.prototype = {
	animate: function()
	{
		var that = this;

		if (this.start == undefined)
			this.start = true;

		var tmpstr = ' '.repeat(this.width)+this.string+' '.repeat(this.width);
		if (this.shift >= tmpstr.length-this.width)
			this.shift = 0;

		process.stdout.write('\033c');
		console.log('');
		for (var a in logos[1])
			new strTool(logos[1][a].replace('\\','\\\\')).center();
		new strTool('!!!! #### >>>> GTAO Cleaner v0.1 <<<< #### !!!!').center();
		new strTool('by Sharkson(c) 2018 for all players GTAO on PC!').center();

		if (this.start)
		{
			this.timeout = 2000;
			this.start = false;
		}
		else
		{
			if (this.timeout > 100)
				this.timeout = this.timeout - (this.timeout-Math.floor(this.timeout/1.3));
			if (this.timeout < 100)
				this.timeout = 100;
		}

		console.log(tmpstr.substring(this.shift,this.width+this.shift));
		new strTool(getIp().join(' lub ')).center();
		if (fs.existsSync('./sleeping.tmp')) {
			new strTool("Washing in progress! Just one more "+fs.readFileSync('./sleeping.tmp', 'utf8').replace(/(\r\n|\n|\r|\s+)/gm,"")+" seconds!").center();
			// new strTool("Pranie w toku! Jeszcze tylko "+fs.readFileSync('./sleeping.tmp', 'utf8').replace(/(\r\n|\n|\r|\s+)/gm,"")+" sekund!").center();
		}
		setTimeout(function(){that.animate()},that.timeout);
		this.shift++;
	},
	center: function(str)
	{
		var r = this.width - this.string.length;
		var left = Math.floor(r/2);
		console.log(' '.repeat(left)+this.string)
	}
};

new strTool(komunikat).animate();
