import { useState } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export const Register = () => {

    const BASE_URL = 'http://localhost:3001';
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [country, setCountry] = useState('');
	const [job, setJob] = useState('');
	const [wage, setWage] = useState(0);
	
	const data = {
		name: name.trim(), 
		age,
		country: country.trim(),
		job: job.trim(), 
		wage
	};

	const handleAddEmployee = () => {
		if (
			name.trim() !== '' &&
			age > 0 &&
			age < 150 &&
			country.trim() !== '' &&
			job.trim() !== '' &&
			wage > 0 &&
			wage < 1000000000000)
			{
			Axios.post(`${BASE_URL}/create`, {...data})
			.then(res => {
				if (res.data.error) console.log("An error ocurred and database couldn't be updated.");
				else navigate('/employees');
			})
		} else {
			console.log("Please, review your inputed data.", {...data})
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

