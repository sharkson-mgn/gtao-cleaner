@echo off
@SETLOCAL EnableDelayedExpansion

rem USTAWIENIA
set sekundy=10


del "sleeping.tmp" 1>nul 2>&1

:: Installed OS
Set _os_bitness=64
IF %PROCESSOR_ARCHITECTURE% == x86 (
	IF NOT DEFINED PROCESSOR_ARCHITEW6432 Set _os_bitness=32
)

echo 20 > sleeping.tmp
@assets\pssuspend%_os_bitness% -accepteula GTA5.exe 1>nul 2>&1

call :sleep %sekundy%

@assets\pssuspend%_os_bitness% -r GTA5.exe 1>nul 2>&1

del "sleeping.tmp" 1>nul 2>&1

goto :exit

:sleep
	set /a liczdo=%1
	FOR /L %%i IN (0,1,%liczdo% ) DO (
		del "clearsession\sleeping.tmp" 1>nul 2>&1
		set /a pozostalo=%1-%%i
		echo !pozostalo! > sleeping.tmp
		cls
		echo !pozostalo!
		ping 127.0.0.1 -n 2 -w 1000 > NUL
	)
goto :eof

:exit

