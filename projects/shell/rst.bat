@echo off&setlocal enabledelayedexpansion
echo ��ǰUUID�ǣ�
type UUID.txt
choice /c yn /m "ȷ���޸��밴Y��ȡ���밴N"
if %errorlevel%==1 (
 goto :NEXT
) else if %errorlevel%==2 (
cmd /k
)


:NEXT
set firVal=1
set secVal=2
set /p uid=������uid��
echo uid=%uid%
::CD /d E:\myCommand
echo  ��ǰ����·��Ϊ��%cd%
for /f "tokens=1 delims= " %%i in (UUID.txt) do (
  set secVal=%%i
)
for /f "tokens=1 delims= " %%i in (UUID.txt) do (
  set firVal=%%i
  set "firVal=!firVal:%secVal%=%uid%!"
  :: ���޸ĺ��ȫ���д���$
  echo !firVal!>>$
)
echo  ��ǰ����·��Ϊ��%cd%
:: ��$�������滻ԭ������
move $ UUID.txt
pause