const NavigationBar = props => {
    const {onSelectMenu} = props

    return (
        <div className="m-1 rounded-lg bg-slate-700">
            <nav className="py-2 space-x-2">
                {[
                    ['路線站位', '/'],
                    ['路線到站預計時間', '/'],
                ].map(([title, url]) => (
                    <a key={title} onClick={() => onSelectMenu(title)} className="text-white text-sm rounded-lg px-3 py-2 bg-slate-700 font-medium 
                    hover:bg-slate-100 hover:text-slate-900 hover:font-bold">{title}</a>
                ))}
            </nav>
        </div>
    )
}

export default NavigationBar