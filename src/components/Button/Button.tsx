import { FunctionComponent } from 'react'
import btn from './styles.module.css'

type ButtonProps = {
	onClick?: () => void
	disabled?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({
	onClick,
	disabled = false,
	children,
}) => {
	return (
		<button onClick={onClick} disabled={disabled} className={btn.default}>
			{children}
		</button>
	)
}

export default Button
