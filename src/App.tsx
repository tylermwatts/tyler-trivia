import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'
import app from './app.styles.module.css'
import Button from './components/Button/Button'
import ClueCard from './components/ClueCard/ClueCard'

export type Clue = {
	value: number
	category: {
		id: number
		title: string
	}
	question: string
	answer: string
	id: number
	invalid_count: null | number
}

const App: FunctionComponent = () => {
	const [money, setMoney] = useState(1000)
	const [clue, setClue] = useState<undefined | Clue>()
	const [answer, setAnswer] = useState('')
	const [prevAnswer, setPrevAnswer] = useState('')
	const [correct, setCorrect] = useState(false)

	const getClue = () => {
		fetch('http://jservice.io/api/random?count=1')
			.then((res) => res.json())
			.then((clueArr: Clue[]) => {
				const [clue] = clueArr
				if (
					(clue.invalid_count && clue.invalid_count > 1) ||
					!clue.value ||
					!clue.category.title
				) {
					getClue()
				} else {
					setClue(clue)
				}
			})
	}

	useEffect(() => {
		getClue()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value },
		} = event
		setAnswer(value)
	}

	const onAnswer = () => {
		if (clue) {
			if (clue.answer.match(new RegExp(answer, 'gi'))) {
				setMoney(money + clue.value)
				setPrevAnswer(clue.answer)
				setCorrect(true)
			} else {
				setCorrect(false)
				setMoney(money - clue.value)
				setPrevAnswer(clue.answer)
			}
			setAnswer('')
			getClue()
		} else {
			getClue()
		}
	}

	return (
		<div className={app.container}>
			{money > 0 ? (
				<div>
					{clue ? <ClueCard clue={clue} /> : 'Loading clue...'}
					<div className={app.inputContainer}>
						<input
							className={app.input}
							type='text'
							value={answer}
							onChange={onChange}
						/>
					</div>
					<Button disabled={answer ? false : true} onClick={onAnswer}>
						Answer
					</Button>
					<h1>Your Winnings: ${money.toLocaleString()}</h1>
					{prevAnswer && (
						<>
							<p>You answered {correct ? 'correctly' : 'incorrectly'}!</p>
							<p>Previous question's answer: {prevAnswer}</p>
						</>
					)}
				</div>
			) : (
				<div>
					<h2>Game over!</h2>
					<p>The correct answer was {prevAnswer}</p>
					<Button onClick={() => window.location.reload()}>Start Over</Button>
				</div>
			)}
		</div>
	)
}

export default App
