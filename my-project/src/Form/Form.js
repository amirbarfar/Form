import React, { Component } from 'react'
import Table from './Table'

export default class Form extends Component {

  constructor(props){
    super(props)

    this.state = {
      data : [],
      Name : '',
      LastName : '',
      Description : '',
      status : false
    }

    
  }

  submitHandler(event){
    event.preventDefault()
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
  }


  clickHandler(){

    if (this.state.Name && this.state.LastName && this.state.Description) {
      this.state.status = true

      let newdata = {
        id : this.state.data.length + 1,
        name : this.state.Name,
        lastname : this.state.LastName,
        description : this.state.Description
      }

      this.setState({
        data : [...this.state.data , newdata],
        Name : '',
        LastName : '',
        Description : ''
      })

    }else{
      alert("Please fill the form first and then press the button :)")
    }
  }

  render() {
    return (
      <div>
        <div className="font-mono text-xl flex justify-evenly gap-20 items-start my-10 container mx-auto">
        <div>
          <form action="" className="w-[450px] h-[450px] border-2 rounded-md border-white p-5" onSubmit={(event) => this.submitHandler(event)}>
            <h2 className="text-center mb-10">Form Send Comments</h2>
            <label>Name: </label>
            <input type="text" className="w-[405px] h-12 border-2 border-slate-800 rounded-md p-3" value={this.state.Name} onChange={(event) => this.NameHandler(event)}/>
            <label>LastName: </label>
            <input type="text" className="w-[405px] h-12 border-2 border-slate-800 rounded-md p-3" value={this.state.LastName} onChange={(event) => this.LastNameHandler(event)}/>
            <label>Description: </label>
            <input type="text" className="w-[405px] h-12 border-2 border-slate-800 rounded-md p-3" value={this.state.Description} onChange={(event) => this.DescriptionHandler(event)}/>
            <button type="submit" className="w-[405px] h-12 bg-slate-800 text-white rounded-md mt-5" onClick={this.clickHandler.bind(this)}>Send :)</button>
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
                this.state.status === true && (
                  this.state.data.map((item)=>
                    <Table {...item} onRemove={this.removeHandler.bind(this)} key={item.id}/>
                  )
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
