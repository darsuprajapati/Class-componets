import React, { Component } from 'react'

export class FormInClass extends Component {

    constructor(){
        super();
        this.state = {
            obj : {},
            array : [],
            count: 0
        }

        let a = { abc : 'sdfsd' , age : 54 , address : 'sdfgdfgdfg'}
        Object.keys(a).map(x => {
            console.log(x)
        })
    }

    getInputValue = (e) => {
        if(e.target.type == 'checkbox'){
            if(this.state.obj[e.target.name] == undefined){
                this.state.obj[e.target.name] = [];
            }
            if(e.target.checked){
                this.setState({ obj :{ ...this.state.obj , [e.target.name]: [ ...this.state.obj[e.target.name], e.target.value ]}})
            }else{
                this.setState({ obj :{ ...this.state.obj , [e.target.name]: this.state.obj[e.target.name].filter(x => x != e.target.value)}})
            }
        }else if(e.target.type == 'file'){
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                this.setState({ obj : { ...this.state.obj, [e.target.name] : reader.result}})
            };
        }
        else{
            this.setState({obj : { ...this.state.obj , [e.target.name] : e.target.value}})
        }
    }

    saveData = (e) => {
        e.preventDefault();

        if(this.state.obj.id){
            let index = this.state.array.findIndex(x => x.id == this.state.obj.id);
            this.state.array.splice(index, 1, this.state.obj);
            this.setState({array : [...this.state.array]})
        }else{
            this.setState({count : this.state.count+1})
            this.state.obj.id = this.state.count + 1;
            this.setState({obj : {...this.state.obj}})
            this.setState({array : [ ...this.state.array ,this.state.obj]})
        }

        this.setState({obj : {}})
    }
    editData = (ediObj) => {
        this.setState({obj : {...ediObj}})
    }
    deleteData = (id) =>{
        let index = this.state.array.findIndex(x => x.id == id);
        this.state.array.splice(index, 1);
        this.setState({array : [...this.state.array]})
    }
  render() {
    return (
      <>
        <h2 className='text-center'>FormHandling</h2>

            <form className='w-50 mx-auto p-3 rounded' style={{backgroundColor:'lightgray'}}>
                <h4>Registration</h4>
                <div>
                    <label className='w-100'>First Name</label>
                    <input type="text" className='w-100 border-0 rounded py-1 px-2 mb-2 abc' name='fname' value={this.state.obj.fname ?? ''} onChange={this.getInputValue} />
                </div>
                <div>
                    <label className='w-100'>Middle Name</label>
                    <input type="text" className='w-100 border-0 rounded py-1 px-2 mb-2' name='mname' value={this.state.obj.mname ?? ''} onChange={this.getInputValue}  />
                </div>
                <div>
                    <label className='w-100'>Last Name</label>
                    <input type="text" className='w-100 bśorder-0 rounded py-1 px-2 mb-2' name='lname' value={this.state.obj.lname ?? ''} onChange={this.getInputValue} />
                </div>
                <div>
                    <label className='w-100'>Password</label>
                    <div className='d-flex align-items-center justify-content-between'>
                    <input type="password" className='w-100 border-0 rounded py-1 px-2 mb-2' name='password' value={this.state.obj.password ?? ''} onChange={this.getInputValue} autoComplete='on' /> 
                    {/* <button type='button' className=' btn p-0' onClick={() => setshowPassword(!showPassword)}>{showPassword ? "HIDE": "SHOW" }</button> */}
                    </div>
                </div>
                <div>
                    <label className='w-100'>Gender</label>
                    <input type="radio" className='py-1 px-2 mb-2' name='gender' value="Male" checked={this.state.obj.gender == "Male"} onChange={this.getInputValue} />Male
                    <input type="radio" className='py-1 px-2 mb-2' name='gender' value="Female" checked={this.state.obj.gender == "Female"} onChange={this.getInputValue} />Female
                </div>

                <div>
                    <label className='w-100'>Hobby</label>
                    <input type="checkbox" className='py-1 px-2 mb-2' name='hobby' value="Playing" onChange={this.getInputValue} checked={this.state.obj.hobby?.includes('Playing') ?? false} />Playing
                    <input type="checkbox" className='py-1 px-2 mb-2' name='hobby' value="Coding" onChange={this.getInputValue} checked={this.state.obj.hobby?.includes('Coding') ?? false} />Coding
                    <input type="checkbox" className='py-1 px-2 mb-2' name='hobby' value="Dancing" onChange={this.getInputValue} checked={this.state.obj.hobby?.includes('Dancing') ?? false} />Dancing
                </div>

                <div>
                    <label className='w-100'>City</label>
                    <select name="city" onChange={this.getInputValue}  value={this.state.obj.city ?? ""} >
                        <option value="" defaultValue disabled>--SELECT--</option>
                        <option value="Surat">Surat</option>
                        <option value="Bharuch">Bharuch</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Vadodara">Vadodara</option>
                    </select>
                </div>

                <div>
                    <label className='w-100'>Profile</label>
                    <input type="file" className='w-100 border-0 rounded py-1 px-2 mb-2' name='profile' onChange={this.getInputValue}/>

                    <img src={this.state.obj.profile} alt="" width={"auto"} height={"auto"} style={{maxWidth:'100px'}} />
                </div>
                
                <input type='submit' className='btn btn-success border-0 mt-4' style={{backgroundColor:'purple'}} onClick={this.saveData} value='Save' />
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
                        this.state.array.map((element, index) => {
                            console.log(element)
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
                                    <button className='btn btn-warning py-0 me-2' onClick={() => this.editData(element)}>EDIT</button>
                                    <button className='btn btn-danger py-0' onClick={() => this.deleteData(element.id)}>DELETE</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
      </>
    )
  }
}

export default FormInClass