import ReactDOMServer from "react-dom/server"

function convert(el: JSX.Element) {
	return ReactDOMServer.renderToStaticMarkup(el)
}

/**
 * Used to create a stringified HTML document
 * @param initialElement
 */
export function useStaticMarkup(initialElement?: JSX.Element) {
	const converted = initialElement ? convert(initialElement) : initialElement
	return [converted, convert]
}
