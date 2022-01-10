import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import LocaleHelper from './../../../_helpers/locale';
import { onLanguageChanged } from './../../../redux/actions/index';
import { useDispatch } from "react-redux";

const ChangeLanguage = ({pAbsolute = true}) => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const [selectedLang, setSelectedLang] = React.useState(LocaleHelper.getLang());
    const [show,setShow] = useState (false)

    React.useEffect(() => {
        i18n.changeLanguage(selectedLang)
    }, [selectedLang, i18n])

    const changeLang = (lang) => {
        setSelectedLang(lang)
        LocaleHelper.setLang(lang)
        dispatch(onLanguageChanged(lang))
        setShow(false)
    }

    const handleCLick = ()=>{
        setShow(!show)
    }

    return (
        <div className={`change-lang ${pAbsolute ? 'p-absolute' : ''} `}>
            <div className="btn-group">
                <div className="dropdown">
                    <button className="dropbtn"><img src={`/images/${selectedLang}.png`} alt={selectedLang} onClick={handleCLick}/></button>
                    <div className={`dropdown-content ${show ? "show" : "hide" }`}>
                        <span onClick={e => changeLang('vi')} className="dropdown-item" >
                            <img src={`/images/vi.png`} alt='vi' />
                        </span>
                        <span onClick={e => changeLang('en')} className="dropdown-item" >
                            <img src={`/images/en.png`} alt='en' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeLanguage;