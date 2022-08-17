import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Employees = () => {

    const [employeeList, setEmployeeList] = useState([]);
    const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [country, setCountry] = useState('');
	const [job, setJob] = useState('');
	const [wage, setWage] = useState('');

    const data = {name, age, country, job, wage};

    const [edit, setEdit] = useState({
        id: undefined,
        isEditing: false
    });


    const handleEditEmployee = (id) => {
        if (
            edit.isEditing && edit.id === id && 
            name.trim() !== '' && age > 0 && age < 150 && 
            country.trim() !== '' && job.trim() !== '' && 
            wage > 0 && wage < 1000000000000
        ){
            axios.put('http://localhost:3001/edit', {...data, id})
            .then(res => setEmployeeList([...res.data]));
            setEdit({id: undefined, isEditing: false})
        }
    }

    const handleRemoveEmployee = (id) => {
        if (!edit.isEditing) {
            axios.delete(`http://localhost:3001/remove/${id}`)
            .then((res) => {
                if (!res.data.error) setEmployeeList([...res.data.result]);
            })
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3001/employees')
        .then(res => {
            if(!res.data.error){
                setEmployeeList([...res.data.result]);
            }
        })
    }, [])

    return (
        <main className={styles.wrapper}>
            {
                employeeList.length > 0 
                    ? employeeList.map(e => (
                        <div className={styles.card} key={e.id}>
                            <span>{e.id}</span>

                            {(edit.isEditing && e.id === edit.id) ? (
                            <>
                                <input 
                                    type="text"
                                    placeholder="Name"
                                    defaultValue={e.name}
                                    onChange={v => setName(v.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Country"
                                    defaultValue={e.country}
                                    onChange={v => setCountry(v.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Age"
                                    defaultValue={e.age}
                                    onChange={v => setAge(+v.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Job"
                                    defaultValue={e.job}
                                    onChange={v => setJob(v.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder={e.wage}
                                    defaultValue={e.wage}
                                    onChange={v => setWage(+v.target.value)}
                                />
                                <div>
                                    <button 
                                        onClick={() => {
                                            setEdit({id: undefined, isEditing: false})
                                            setName('');
                                            setAge(0);
                                            setCountry('');
                                            setJob('');
                                            setWage(0);
                                    }}>
                                        Cancel
                                    </button>
                                    <button onClick={() => handleEditEmployee(e.id)}>Save</button>
                                </div>
                            </>
                            ) : (<>
                                <p>{e.name}</p>
                                <p className={styles.afterName}>{e.country}, {e.age} years old</p>
                                <p>{e.job}</p>
                                <p>Wage: {e.wage}</p>
                        
                                <div>
                                    <button onClick={() => {
                                        if (!edit.isEditing) {
                                            setEdit({id: e.id, isEditing: true})
                                            setName(e.name);
                                            setAge(e.age);
                                            setCountry(e.country);
                                            setJob(e.job);
                                            setWage(e.wage);
                                        }
                                    }}>Edit</button>
                                    <button onClick={() => handleRemoveEmployee(e.id)}>Delete</button>
                                </div>
                            </>)}
                        </div>
                    ))
                    : <p>Any employees were found!</p>
            }
        </main>
    )
}