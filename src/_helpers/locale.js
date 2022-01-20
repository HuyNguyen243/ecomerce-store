import { LANG_VI } from './../_config/shop.config';
var LocaleHelper = {
    setLang : (lang) => {
        localStorage.setItem('coca_current_lang', lang)
    },
    getLang : () => {
        let lang = localStorage.getItem('coca_current_lang')
        if(lang === undefined || lang === null) {
            lang = LANG_VI;
        }
        return lang;
    },
    
    parseData: (key, data) => {
        let lang = LocaleHelper.getLang();
        for (let i = 0; i < data.length; i++) {
            if(lang !== LANG_VI && data[i][key+"_"+lang] !== undefined && data[i][key+"_"+lang] !== '') {
                if(data[i][key+"_"+LANG_VI] === undefined){
                    data[i][key+"_"+LANG_VI] = data[i][key]
                }
                data[i][key] = data[i][key+"_"+lang]
            }else {
                if(data[i][key+"_"+LANG_VI] !== undefined) {
                    data[i][key] = data[i][key+"_"+LANG_VI]
                }
            }
            if(data[i].products !== undefined) {
                LocaleHelper.parseData('name', data[i].products );
            }
        }
        return data;
    }
}
export default LocaleHelper;