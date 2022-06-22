import { FormattedMessage } from "react-intl"
import ButtonSelectors from "./ButtonSelectors";

const Header = props => {

    const { language, setLanguage } = props

    const language_option = [
        { name: "site-language", labelId: "header--language-zh", value: "zh", checked: language === "zh", onChange: () => setLanguage("zh") },
        { name: "site-language", labelId: "header--language-en", value: "en", checked: language === "en", onChange: () => setLanguage("en") }
    ]

    return (
        <div className="flex h-20 bg-zinc-600 bg-gradient-to-r from-neutral-600 to-slate-900">
            <div className="flex mx-3 mt-3 w-screen bg-gradient-to-r from-neutral-600 to-slate-900">
                <div className="flex-none h-5 w-1/6">
                </div>
                <div className="flex-auto h-5 w-1/6">
                    <div className="flex mt-1 justify-center text-white sm:text-2xl font-bold">
                        <FormattedMessage id="header--title" />
                    </div>
                    <div className="flex mt-1 justify-center text-white sm:text-sm font-medium">
                        <FormattedMessage id="header--subtitle" />
                    </div>
                </div>
                <div className="flex h-6 w-1/6 justify-end">
                    <ButtonSelectors style={`button-set sm:text-xs mx-1`} option={language_option} />
                </div>
            </div>
        </div>
    )
}

{ result_lang: "chi" / "eng" }
export default Header