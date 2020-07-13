git pull origin master
git config merge.theirs.name "Keep changes of upstream branch"
git config merge.theirs.driver "cp -f '%B' '%A'"
call npm install
start cmd.exe /c "run.bat"
