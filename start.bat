@echo off
Set _os_bitness=64
IF %PROCESSOR_ARCHITECTURE% == x86 (
	IF NOT DEFINED PROCESSOR_ARCHITEW6432 Set _os_bitness=32
)
node\node%_os_bitness%.exe server.js