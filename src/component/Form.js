import { useState, useEffect} from 'react';
import './Form.css';

function Form() {

    const getData=()=>{
        const data = localStorage.getItem('items')
        if(data){
            return JSON.parse(data);
        }
        else{
            return []
        }
    }
       
    const [items, setItems] = useState(getData());

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState('')
    const [age , setAge] = useState('')

    const [error,setErrors] = useState({name:'',email:'',phone:'',date:'',age:''})
   

    function getAge(e) {
        let bdt = e.target.value,
        bday = new Date(bdt),
        bday_val = bday.getTime(),
        today = new Date(),
        now = today.getTime(),
        value = now - bday_val,
        var_year = Math.floor(value / (1000 * 60 * 60 * 24 * 365.25));

        setAge(var_year);
    }

    function getTarget(e) {
        setDate(e.target.value);
    }

    const getFormData = (e) => {
        e.preventDefault();
        let emailErr = items.filter((elem)=>elem.email === email) 
        let errorCount = 0;
        if(name===''){
            errorCount++
            setErrors((prevState)=>{
                return {...prevState,name:"Name is required"}
            })
         } else if(name.length<3 && name.length>20){
            errorCount++
            setErrors((prevState)=>{
                return {...prevState,name:"Name is too short"}
            })
         } 
        else{
            setErrors((prevState)=>{
                return {...prevState,name:""}
            })
        }
        if(email===''){
            errorCount++
            setErrors((prevState)=>{
                return {...prevState,email:"Email is required"}
            })
         } else if(emailErr.length>0){
            errorCount++
            setErrors((prevState)=>{
                return {...prevState,email:"Email is already registered"}
            })
        } 
         else{
            setErrors((prevState)=>{
                return {...prevState,email:""}
            })
         }
        if(phone.length!==10){
            errorCount++
            setErrors((prevState)=>{
                return {...prevState,phone:"Number is not valid"}
            })
         } else{
            setErrors((prevState)=>{
                return {...prevState,phone:""}
            })
        }
        if(age<18){
            errorCount++
            setErrors((prevState)=>{
                return {...prevState,age:"Age is not valid"}
            })
         } else{
            setErrors((prevState)=>{
                return {...prevState,age:""}
            })
        }
        if(errorCount===0){
            let item = {
                name,
                email,
                phone,
                date
            }
            setItems([...items, item]);
            setName('')
            setEmail('')
            setPhone('')
            setDate('')
            setAge('')

        }
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(items))
    }, [items])

    return (
        <div className="container">
            <div className="form">
            <h1>Sign UP!</h1>
                <form  onSubmit={getFormData}>
                    <input type="text" placeholder="Enter Your Name" name='name' value={name} onChange={(e) => setName(e.target.value)} /><br></br>{error.name && <span className='error'>{error.name}</span>}<br></br>
                    <input type="Email" placeholder="Enter Your Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)}  /><br></br>{error.email && <span className='error'>{error.email}</span>}<br></br>
                    <input type="number" placeholder="Enter Your Phone Number" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} /><br></br>{error.phone && <span className='error'>{error.phone}</span>}<br></br>
                    <input type="date" placeholder="DD/MM/YY" value={date} name='date' onChange={(e) => { getAge(e); getTarget(e); }}  /> <span className='uio' onChange={(e)=>setAge(e.target.value)}>AGE: {age}</span><br></br>{error.age && <span className='error'>{error.age}</span>}<br></br>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className='userdata'>
                <h1>Registered User List</h1>
               {
                items.map((elem,ind)=>{
                    return (
                        <ul className='list'>
                            <li key={ind}>Thank you for the registering : {elem.name}</li>
                        </ul>
                    )
                })
               }
            </div>
        </div>
    );
}

export default Form;