import React, { useRef, useState } from 'react';
// import './../assets/css/change-lang.css';
import { useTranslation } from "react-i18next";

const ChangeLanguage = ({pAbsolute = true}) => {
    const { i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = React.useState('vi');
    const [show,setShow] = useState (false)
    let ref = useRef(null);

    React.useEffect(() => {
        let langLocalStorage = localStorage.getItem("lang")
        if(langLocalStorage !== null){
            setSelectedLang(langLocalStorage)
        }
        i18n.changeLanguage(selectedLang)
        const checkIfClickedOutside = e => {
            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false)
            }
          }
          document.addEventListener("mousedown", checkIfClickedOutside)
          return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
          }
    }, [selectedLang, i18n,show])

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
                <div className="dropdown" ref={ref}>
                    <button className="dropbtn"><img src={`/images/${selectedLang}.png`} alt={selectedLang} onClick={handleCLick} /></button>
                    {show && 
                     <div className={`dropdown-content `} >
                        <span onClick={e => changeLang('vi')} className="dropdown-item" >
                            <img src={`/images/vi.png`} alt='vi' />
                        </span>
                        <span onClick={e => changeLang('en')} className="dropdown-item" >
                            <img src={`/images/en.png`} alt='en' />
                        </span>
                    </div>
                    }
                   
                </div>
            </div>
        </div>
    )
}

export default ChangeLanguage;