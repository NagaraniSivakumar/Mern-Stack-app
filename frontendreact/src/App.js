import React, {Component} from 'react';
import "./App.css";

class Home extends Component{
    constructor(){
        super();
 this.state={
      show: false,
      data: [],
      rating:1,
    }
}

componentDidMount=()=>{
     this.handleGetData()
    .then(res => {this.setState({ data:res})
  })
    .catch(err => console.log(err));
  }
  
handleGetData = async () => {
      try {
        const response = await fetch('http://localhost:8001/courses/get');

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (err) {
        
      }
     
};

handleApply=async(id)=>{
   this.handleDrop()
   await fetch(`http://localhost:8001/courses/enroll/${id}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    }
  })
.then(response => response.json())
.then(res => {
  console.log(res);
  return res
}).catch(err => console.error(err))
}
 

handleRating=(e)=>{
    this.setState({rating:e.target.value}, () => {
      console.log(this.state.rating);
    })
 
  }
  
  
handleAddRating=async(id)=>{
try{
   const result=await fetch(`http://localhost:8001/courses/rating/${id}`, {
  	method: "PATCH",
    body: JSON.stringify({
     rating:this.state.rating
	}),
	headers: {
		"Content-Type": "application/json"
	}
})
result=await result.json()
console.log(result)
}
catch{

}
 }
 
 
handleDrop=async(id)=>{
    fetch(`http://localhost:8001/courses/drop/${id}`, {
	
     
      method: "DELETE",
          headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => console.log(json));
}
  

render(){
  return (
          <div className="home">
              <header>
                  <h2>ABC Learning</h2>
              </header>
             <div className='cardContainer'>
              {this.state.data && this.state.data.map(user => (
                
                  <div className='card'>
                      <ul>
                      <div className='header'>
                              <li>{user.courseName}</li>   
                              <li>{user.courseDept}</li>   
                              <li>{user.description}</li>   
                             { user.isApplied && <li>
                          {(!user.isRated)&&<li>Rate:
                                      <select className='rating' name='rating'  
                                      value={this.state.rating} 
                                      onChange={this.handleRating}>
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                          <option value="5">5</option>
                                      </select>
                                 <button className='rate' onClick={() =>this.handleAddRating(user._id)}>Add</button>
                                  </li>}
                                 <button className='drop' onClick={() =>this.handleDrop(user._id)}>Drop Course</button>
                              </li>}
                            {!user.isApplied && <li><button className='btn'  onClick={() =>this.handleApply(user._id)}>apply</button></li>}
  
                          </div>
                          <div className='footer'>
                         <li>{user.duration} hrs . {user.noOfRatings} Ratings . {user.rating}/5</li>
                          </div>
                      </ul>
                  </div>
                   ))}
              </div>
              
          </div>
         );
  }
}
export default Home;



