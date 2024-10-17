import React, { Component } from 'react'

export default class Table extends Component {

  clickHandler(id){
    this.props.onRemove(id)
  }

  render() {
    return (
        <tr className='h-14 w-44 cursor-pointer'>
          <td>{this.props.id}</td>
          <td>{this.props.name}</td>
          <td>{this.props.lastname}</td>
          <td>{this.props.description}</td>
          <td onClick={this.clickHandler.bind(this , this.props.id)} className='rounded-md text-red-600 hover:bg-red-500 hover:text-white duration-150 transition-all'>Remove</td>
        </tr>
    )
  }
}
