import { FunctionComponent } from 'react'
import { Clue } from '../../App'
import { titleCase } from '../../utils'
import clueStyles from './styles.module.css'

const ClueCard: FunctionComponent<{ clue: Clue }> = ({ clue }) => {
	const { category, question, value } = clue

	return (
		<div className={clueStyles.container}>
			<h2>{titleCase(category.title)}</h2>
			<h2>${value.toLocaleString()}</h2>
			<p className={clueStyles.question}>{question}</p>
		</div>
	)
}

export default ClueCard
