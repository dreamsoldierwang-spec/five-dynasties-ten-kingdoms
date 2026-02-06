@echo off
chcp 65001
REM GDAL 环境变量配置脚本

REM 设置 GDAL 安装路径（根据你的安装位置修改）
set GDAL_HOME=C:\Program Files\GDAL
set PROJ_LIB=%GDAL_HOME%\projlib
set GDAL_DATA=%GDAL_HOME%\gdal-data

REM 添加到 PATH
set PATH=%GDAL_HOME%;%PATH%

echo GDAL 环境变量已设置
echo GDAL_HOME: %GDAL_HOME%
echo PROJ_LIB: %PROJ_LIB%
echo GDAL_DATA: %GDAL_DATA%

echo.
echo 现在可以运行 ogr2ogr 命令了
echo.
cmd /k
