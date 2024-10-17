import React, { Component } from 'react'
import Table from './Table'

export default class Form extends Component {

  constructor(props){
    super(props)

    this.state = {
      data : JSON.parse(localStorage.getItem("data")) ?? [],
      Name : '',
      LastName : '',
      Description : '',
      submited : false
    }

    
  }

  submitHandler(event){
    event.preventDefault()

    this.setState({
      submited : true
    })

    if (this.state.Name && this.state.LastName && this.state.Description) {
      let newdata = {
        id : this.state.data.length + 1,
        name : this.state.Name,
        lastname : this.state.LastName,
        description : this.state.Description
      }

      if (localStorage.getItem("data")) {
        let test = JSON.parse(localStorage.getItem("data"))
        localStorage.setItem("data" , JSON.stringify([...test , newdata]))
      }else{
        localStorage.setItem("data" , JSON.stringify([newdata]))
      }

      
      this.setState({
        data : [...this.state.data , newdata],
        Name : '',
        LastName : '',
        Description : '',
        submited : false
      })

    }
  }

  NameHandler(event){
    this.setState({
      Name : event.target.value
    })
  }

  LastNameHandler(event){
    this.setState({
      LastName : event.target.value
    })
  }

  DescriptionHandler(event){
    this.setState({
      Description : event.target.value
    })
  }

  removeHandler(id){
    let itemId = this.state.data.findIndex((item)=>{
      return id === item.id
    })

    this.state.data.splice(itemId , 1)

    this.setState({
      data : [...this.state.data]
    })

    let dataLocal = JSON.parse(localStorage.getItem("data"))

    let indexLocal = dataLocal.findIndex((item)=>{
      return id === item.id
    })

    dataLocal.splice(indexLocal , 1)

    localStorage.setItem("data" , JSON.stringify(dataLocal))
  }

  render() {
    return (
      <div>
        <div className="font-mono text-xl flex justify-evenly gap-20 items-start my-10 container mx-auto">
        <div>
          <form action="" className="w-[450px] h-[450px] border-2 rounded-md  p-5 border-black" onSubmit={(event) => this.submitHandler(event)}>
            <h2 className="text-center mb-5">Form Send Comments</h2>
            <label>Name: </label>
            <input type="text" className="w-[405px] h-12 border-2 border-slate-800 rounded-md p-3" value={this.state.Name} onChange={(event) => this.NameHandler(event)}/>
            {
              this.state.submited && !this.state.Name && 
              <div className='text-red-400 text-sm'>First enter your Name :)</div>
            }
            <label>LastName: </label>
            <input type="text" className="w-[405px] h-12 border-2 border-slate-800 rounded-md p-3" value={this.state.LastName} onChange={(event) => this.LastNameHandler(event)}/>
            {
              this.state.submited && !this.state.LastName && 
              <div className='text-red-400 text-sm'>First enter your LastName :)</div>
            }
            <label>Description: </label>
            <input type="text" className="w-[405px] h-12 border-2 border-slate-800 rounded-md p-3" value={this.state.Description} onChange={(event) => this.DescriptionHandler(event)}/>
            {
              this.state.submited && !this.state.Description && 
              <div className='text-red-400 text-sm'>First enter your Description :)</div>
            }
            <button type="submit" className="w-[405px] h-12 bg-slate-800 text-white rounded-md mt-5">Send :)</button>
          </form>
        </div>
        <div className='max-h-[500px] overflow-y-scroll'>
          <table>
            <thead>
            <tr>
              <th className='w-full h-12 px-10'>#</th>
              <th className='w-full h-12 px-10'>Name</th>
              <th className='w-full h-12 px-10'>LastName</th>
              <th className='w-full h-12 px-10'>Description</th>
              <th className='w-full h-12 px-10'>Action</th>
            </tr>
            </thead>
            <tbody className='text-center'>
              {
                  this.state.data.map((item)=>
                    <Table {...item} onRemove={this.removeHandler.bind(this)} key={item.id}/>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>
      </div>
    )
  }
}
