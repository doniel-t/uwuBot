del "*.log" /q /f
set datetimef=%date:~-4%_%date:~3,2%_%date:~0,2%_|_%time:~1,1%_%time:~3,2%_%time:~6,2%
node . > %datetimef%.log