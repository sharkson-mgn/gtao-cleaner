actions['run.js'] = function ()
{
	var child_process = require('child_process');

	/*child_process.exec('clear.bat', function(error, stdout, stderr) {
		//console.log(stdout);
	});*/
	child_process.exec('clear.bat');
}