@echo off
setlocal EnableDelayedExpansion
title �޸�config
color 8

set lines=0
set append=0
set configall=config.xml
set config=config.xml
set cmdPath=E:\myCommand
SET uid=123456
:: ����Ĭ��·��
SET pluginsPath=F:\WebWorkspace\projects\shell
SET assetsPathUpdate=F:\WebWorkspace\projects\shell
SET assetsPathStable=F:\WebWorkspace\projects\shell
SET assetsPathInline=F:\WebWorkspace\projects\shell
SET assetsPath=F:\WebWorkspace\projects\shell
::�ű�·��
CD /d %cmdPath%
for /f "tokens=1 delims= " %%i in (UUID.txt) do (
  set uid=%%i
)
::ѡ��Ҫ���config�İ汾
:MENU
ECHO.=-=-=-=-=��ѡ��װ�汾=-=-=-=-=
ECHO.
ECHO.          1 - ���°�
ECHO.
ECHO.          2 - �ȶ���
ECHO.
ECHO.          3 - ����������
ECHO.
ECHO.          4 - �˳�
ECHO.
ECHO.=-=-=-=-=������ѡ�����=-=-=-=-=
set /p  ID=

if "%id%"=="1" (
 goto cmd1
) else if "%id%"=="2" (
 goto cmd2
) else if "%id%"=="3" (
 goto cmd3
) else if "%id%"=="4" (
cmd /k
) else (
echo ������Ч������������
ECHO.
 goto :MENU
)

:cmd1
CD /d %assetsPathUpdate%
SET assetsPath=%assetsPathUpdate%
goto :NEXT

:cmd2
CD /d %assetsPathStable%
SET assetsPath=%assetsPathStable%
goto :NEXT

:cmd3
CD /d %assetsPathInline%
SET assetsPath=%assetsPathInline%
goto :NEXT


:NEXT
::��release����ѹ
"C:\Program Files\7-Zip\7z.exe" x -y -aoa -orelease release.zip
echo release����ѹ���
CD release

::���˶�Ӧuid��config�еĵ�һ������
set path=F:\WebWorkspace\projects\shell\%uid%
cd /d %path%\config
set config=%path%\config\config.xml
set configline=0
for /f "tokens=*" %%i in (!config!) do (
  set /A configline=!configline!+1
  if !configline! gtr 1 (
    echo %%i>>val.txt
  )
)
::�����˺�����ݸ��Ƶ�release����config��
set configall=%assetsPath%^\release^\config.xml
cd /d %assetsPath%^\release

for /f "tokens=*" %%i in (!configall!) do (
  set /A lines=!lines!+1
)
set /A append=%lines%-1
set lines=0
for /f "tokens=*" %%i in (!configall!) do (
  set /A lines=!lines!+1
  if !lines! lss !append! (
    ::echo ������%%i
    echo %%i>>$
  ) else if !lines! equ !append! (
    echo %%i>>$
    type %path%^\config^\val.txt>>$
  )
)
echo.>>$
echo ^<^/devices^>>>$
del %path%^\config^\val.txt
del %configall%
move $ %configall%

::��ԭrelease��
"C:\Program Files\7-Zip\7z.exe" -tZip -aoa a release.zip ../release\*
echo ѹ�����
copy release.zip ../assets
echo releaseѹ�����������
CD ../
rd /s /q release
echo release�ļ���ɾ�����, �޸����