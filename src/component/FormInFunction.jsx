import React, { useMemo, useState } from 'react'

function FormInFunction() {
    const [obj, setobj] = useState({})
    const [array, setarray] = useState([])
    let [count, setcount] = useState(0)
    const [showPassword, setshowPassword] = useState(false)

    const saveData = (e) => {
        e.preventDefault();

        if(obj.id){
            let index = array.findIndex(x => x.id == obj.id);
            array.splice(index, 1, obj);
            setarray([...array]) // delete id in delete button and not get a same id
        }else{
            setcount(count+1);
            obj.id = count + 1;
            setobj({...obj})
            setarray([ ...array ,obj]) // id leva
        }

        setobj({})
    }

    const getInputValue = (e) => {
        if(e.target.type == 'checkbox'){
            if(obj[e.target.name] == undefined){
                obj[e.target.name] = [];
            }
            if(e.target.checked){
                setobj({ ...obj , [e.target.name]: [ ...obj[e.target.name], e.target.value ]})
            }else{
                setobj({ ...obj , [e.target.name]: obj[e.target.name].filter(x => x != e.target.value)})
            }
        }else if(e.target.type == 'file'){
            debugger
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setobj({...obj , [e.target.name] : reader.result})
            };
        }
        else{
            setobj({ ...obj , [e.target.name] : e.target.value})// input mathi data leva 
        }
    }

    const deleteData = (id) => {
        let index = array.findIndex(x => x.id == id);
        array.splice(index, 1);
        setarray([...array])
    }

    const editData = (ediObj) => {
        setobj(ediObj)
    }

  return (
    <>

        <h2 className='text-center'>FormHandling</h2>

        <form className='w-50 mx-auto p-3 rounded' style={{backgroundColor:'lightgray'}}>
            <h4>Registration</h4>
            <div>
                <label className='w-100'>First Name</label>
                <input type="text" className='w-100 border-0 rounded py-1 px-2 mb-2 abc' name='fname' value={obj.fname ?? ''} onChange={getInputValue} />
            </div>
            <div>
                <label className='w-100'>Middle Name</label>
                <input type="text" className='w-100 border-0 rounded py-1 px-2 mb-2' name='mname' value={obj.mname ?? ''} onChange={getInputValue}  />
            </div>
            <div>
                <label className='w-100'>Last Name</label>
                <input type="text" className='w-100 border-0 rounded py-1 px-2 mb-2' name='lname' value={obj.lname ?? ''} onChange={getInputValue} />
            </div>
            <div>
                <label className='w-100'>Password</label>
                <div className='d-flex align-items-center justify-content-between'>
                <input type={showPassword ? "text" : "password"} className='w-100 border-0 rounded py-1 px-2 mb-2' name='password' value={obj.password ?? ''} onChange={getInputValue} autoComplete='on' /> <button type='button' className=' btn p-0' onClick={() => setshowPassword(!showPassword)}>{showPassword ? "HIDE": "SHOW" }</button>
                </div>
            </div>
            <div>
                <label className='w-100'>Gender</label>
                <input type="radio" className='py-1 px-2 mb-2' name='gender' value="Male" checked={obj.gender == "Male"} onChange={getInputValue} />Male
                <input type="radio" className='py-1 px-2 mb-2' name='gender' value="Female" checked={obj.gender == "Female"} onChange={getInputValue} />Female
            </div>

            <div>
                <label className='w-100'>Hobby</label>
                <input type="checkbox" className='py-1 px-2 mb-2' name='hobby' value="Playing" onChange={getInputValue} checked={obj.hobby?.includes('Playing') ?? false} />Playing
                <input type="checkbox" className='py-1 px-2 mb-2' name='hobby' value="Coding" onChange={getInputValue} checked={obj.hobby?.includes('Coding') ?? false} />Coding
                <input type="checkbox" className='py-1 px-2 mb-2' name='hobby' value="Dancing" onChange={getInputValue} checked={obj.hobby?.includes('Dancing') ?? false} />Dancing
            </div>

            <div>
                <label className='w-100'>City</label>
                <select name="city" onChange={getInputValue}  value={obj.city ?? ""} >
                    <option value="" defaultValue disabled>--SELECT--</option>
                    <option value="Surat">Surat</option>
                    <option value="Bharuch">Bharuch</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Vadodara">Vadodara</option>
                </select>
            </div>

            <div>
                <label className='w-100'>Profile</label>
                <input type="file" className='w-100 border-0 rounded py-1 px-2 mb-2' name='profile' onChange={getInputValue}  />

                <img src={obj.profile} alt="" width={"auto"} height={"auto"} style={{maxWidth:'100px'}} />
            </div>
            
            <input type='submit' className='btn btn-success border-0 mt-4' style={{backgroundColor:'purple'}} onClick={saveData} value='Save' />
        </form>

        <table className='table mt-3 myTable'>
            <thead>
                <tr>
                    <th className='bg-dark text-white'>ID</th>
                    <th className='bg-dark text-white'>Profile</th>
                    <th className='bg-dark text-white'>First Name</th>
                    <th className='bg-dark text-white'>Middle Name</th>
                    <th className='bg-dark text-white'>Last Name</th>
                    <th className='bg-dark text-white'>Gender</th>
                    <th className='bg-dark text-white'>Hobby</th>
                    <th className='bg-dark text-white'>City</th>
                    <th className='bg-dark text-white'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    array.map((element, index) => {
                        return <tr key={index}>
                            <td>{element.id}</td>
                            <td><img src={element.profile} alt="" width={30} height={30} /></td>
                            <td>{element.fname}</td>
                            <td>{element.mname}</td>
                            <td>{element.lname}</td>
                            <td>{element.gender}</td>
                            <td>{element.hobby?.join(', ')}</td>
                            <td>{element.city}</td>
                            <td>
                                <button className='btn btn-warning py-0 me-2' onClick={() => editData(element)}>EDIT</button>
                                <button className='btn btn-danger py-0' onClick={() => deleteData(element.id)}>DELETE</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
  )
}

export default FormInFunction