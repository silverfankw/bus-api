export const RouteDecorator = props => {
    const { co, route } = props

    if (route) return <span></span>

    else if (route.match(/(^N)(\d|[A-Z]){1,4}/))
        return <span className="bg-black text-white px-2 py-0.5 font-bold">{route}</span>
    else if (route.match(/(^1)(\d|[A-Z]){2,4}/) || route.route.match(/(^3)(\d|[A-Z]){2,4}/) || route.route.match(/(^6)(\d|[A-Z]){2,4}/))
        return <span className="bg-red-700 px-2 py-0.5 font-bold">{route}</span>
    else if (route.match(/(^9)(\d|[A-Z]){2,4}/))
        return <span className="bg-green-900 px-2 py-0.5">{route}</span>
    else
        return <span className="px-2 py-0.5">{route}</span>
}