import React from "react"
import cx from "classnames"
import { Color } from "constants/enums/color"
import { Shape } from "constants/enums/shape"
import { Size } from "constants/enums/size"
import "./Button.scss"

export type ButtonProps = {
	className?: string
	color?: Color
	size?: Size
	shape?: Shape
	invertedColor?: boolean
	importance?: "primary" | "secondary" | "tertiary"
	type?: string // TODO
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type Button = React.ForwardRefExoticComponent<React.PropsWithoutRef<ButtonProps> & any>

/**
 * Button Functional Component
 * @param {string} className - used to set a class on a higher element tag
 * @param children
 * @param color
 * @param invertedColor
 * @param shape
 * @param size
 * @param args
 * @return {}
 */
const Button: Button = React.forwardRef(
	({ className, children, color = Color.Primary, importance = "primary", shape, size, ...args }, ref) => {
		const classes: string = cx("button", className, {
			"button--small": size === Size.Small, // TODO: for more perf, use string concatenation like `button--${size}` (pro: perf, con: refactor of var name)
			"button--medium": size === Size.Med,
			"button--large": size === Size.Large,
			"button--rounded": shape === Shape.Rounded,
			"button--circled": shape === Shape.Circled,
			"button--primary": color === Color.Primary,
			"button--info": color === Color.Info,
			"button--warning": color === Color.Warning,
			"button--danger": color === Color.Error,
			"button--success": color === Color.Success,
			[`button--${importance}-importance`]: importance,
		})

		return (
			<button ref={ref} {...args} className={classes}>
				{children}
			</button>
		)
	}
)

export default Button
