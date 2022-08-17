import { useState } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export const Register = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [country, setCountry] = useState('');
	const [job, setJob] = useState('');
	const [wage, setWage] = useState(0);
	
	const data = {name, age, country, job, wage};

	const handleAddEmployee = () => {
		if (
			name.trim() !== '' &&
			age > 0 &&
			age < 150 &&
			country.trim() !== '' &&
			job.trim() !== '' &&
			wage > 0 &&
			wage < 1000000000000
		) {
			Axios.post('http://localhost:3001/create', {...data})
			.then(res => {
				if (res.data.error) console.log("Database couldn't be updated. ", res.data.error);
				else navigate('/employees');
			})
		} else {
			console.log("Database couldn't be updated.")
		}
	}

	window.onkeydown = e => {
		if(e.key === "Enter") handleAddEmployee();
	}

	return (<>
		<main className={styles.wrapper}>
			<label>
				Name
				<input
					type="text"
					placeholder="Type the employee's name."
					onChange={v => setName(v.target.value)}
					autoFocus
				/>
			</label>
			<label>
				Age
				<input
					type="number"
					placeholder='Type his age.'
					onChange={v => setAge(+v.target.value)}
				/>
			</label>
			<label>
				Country
				<input
					type="text"
					placeholder='Tell us his country.'
					onChange={v => setCountry(v.target.value)}
				/>
			</label>
			<label>
				Job
				<input
					type="text"
					placeholder='What is his job?'
					onChange={v => setJob(v.target.value)}
				/>
			</label>
			<label>
				Wage (Year)
				<input 
					type="number" 
					placeholder='Type his yearly wage.'
					onChange={v => setWage(+v.target.value)}
				/>
			</label>
			<button onClick={() => handleAddEmployee()}>Add employee</button>
		</main>
	</>);
}

