@ECHO OFF
title ��װAPP
color 8
::����Ĭ��·��
SET rootPath=F:\WebWorkspace\projects\shell
::������������Ҫ��
SET uid=10001
::�ű�·��
::CD /d E:\myCommand
for /f "tokens=1 delims= " %%i in (UUID.txt) do (
  set uid=%%i
)
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
call pack.bat
CD /d %rootPath%
SET greeAssetsPath=%rootPath%
goto :NEXT

:cmd2
call pack.bat
CD /d %rootPath%
SET greeAssetsPath=%rootPath%
goto :NEXT

:cmd3
call pack.bat
CD /d %rootPath%
SET greeAssetsPath=%rootPath%
adb reverse tcp:8081 tcp:8081
adb reverse tcp:8098 tcp:8098
echo 8081, 8098�˿�ӳ��ɹ���
goto :NEXT

:NEXT
"C:\Program Files\7-Zip\7z.exe" x -y -aoa -oshell shell.zip
echo shell����ѹ���
CD shell\Plugins
rd /s /q %uid%
echo %uid%�ļ���ɾ�����
CD ../../
xcopy %pluginsPath% %greeAssetsPath%\shell\Plugins /y /c /e /i
echo ����������
CD shell
"C:\Program Files\7-Zip\7z.exe" -tZip -aoa a shell.zip ../shell\*
echo ѹ�����
copy shell.zip ../assets
echo shellѹ�����������
CD ../
rd /s /q shell
echo shell�ļ���ɾ�����
CD ../../../../
echo ��ʼ��װ�������װʧ�ܣ������豸�Ƿ����ӳɹ���
gradlew installDebug