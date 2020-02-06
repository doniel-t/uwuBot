module.exports = {
    parseMods: function(mods) {
        let result = "";
        for (let x = 0;x<mods.length;x++) {

            if (mods[x] != 'FreeModAllowed' && mods[x] != 'ScoreIncreaseMods') {
                result += mods[x] + ',';
            }
        }

        result = result.substring(0,result.length-1);
        return result;
    }
}