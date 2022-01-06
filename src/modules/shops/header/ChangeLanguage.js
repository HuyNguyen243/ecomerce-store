import React from 'react';
// import './../assets/css/change-lang.css';
import { useTranslation } from "react-i18next";

const ChangeLanguage = ({pAbsolute = true}) => {
    const { i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = React.useState('vi');

    React.useEffect(() => {
        i18n.changeLanguage(selectedLang)
    }, [selectedLang, i18n])

    const changeLang = (lang) => {
        setSelectedLang(lang)
    }

    return (
        <div className={`change-lang ${pAbsolute ? 'p-absolute' : ''} `}>
            <div className="btn-group">
                <div className="dropdown">
                    <button className="dropbtn"><img src={`/images/${selectedLang}.png`} alt={selectedLang} /></button>
                    <div className="dropdown-content">
                        <span onClick={e => changeLang('vi')} className="dropdown-item">
                            <img src={`/images/vi.png`} alt='vi' />
                        </span>
                        <span onClick={e => changeLang('en')} className="dropdown-item">
                            <img src={`/images/en.png`} alt='en' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeLanguage;