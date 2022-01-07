import React, { useState } from 'react';
// import './../assets/css/change-lang.css';
import { useTranslation } from "react-i18next";

const ChangeLanguage = ({pAbsolute = true}) => {
    const { i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = React.useState('vi');
    const [show,setShow] = useState (false)

    React.useEffect(() => {
        let langLocalStorage = localStorage.getItem("lang")
        if(langLocalStorage !== null){
            setSelectedLang(langLocalStorage)
        }
        i18n.changeLanguage(selectedLang)
    }, [selectedLang, i18n])

    const changeLang = (lang) => {
        setSelectedLang(lang)
        localStorage.setItem("lang",lang)
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