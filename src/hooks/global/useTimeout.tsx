import React from "react"
import { AnonymousFunction } from "constants/types/anonymousFunction"

/**
 * Use time out
 * @param callback
 * @param delay
 */
export function useTimeout(callback: AnonymousFunction, delay: number): void {
	const savedCallback = React.useRef<AnonymousFunction | null>(null)

	React.useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	React.useEffect(() => {
		function tick() {
			if (savedCallback.current) savedCallback.current()
		}
		if (delay !== null) {
			const id = setTimeout(tick, delay)
			return () => clearTimeout(id) // unmount
		}
	}, [delay])
}
