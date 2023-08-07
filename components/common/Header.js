import { FormattedMessage } from "react-intl"
import { useDispatch } from "react-redux";
import { setLanguage } from "../../features/webConfig/webConfigSlice"
import ButtonSelectors from "./ButtonSelectors";

const Header = props => {

    const { language } = props

    const dispatch = useDispatch()

    const language_option = [
        // Set to Chinese
        {
            name: "site-language", labelId: "header--language-zh", value: "zh",
            checked: language === "zh", onChange: () => dispatch(setLanguage("zh"))
        },
        // Set to English
        {
            name: "site-language", labelId: "header--language-en", value: "en",
            checked: language === "en", onChange: () => dispatch(setLanguage("en"))
        }
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

export default Header