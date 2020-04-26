git clone https://github.com/danieltheil/uwuBot.git
cd uwuBot
call npm install
git config merge.theirs.name "Keep changes of upstream branch"
git config merge.theirs.driver "cp -f '%B' '%A'"