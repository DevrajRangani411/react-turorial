import React, {Component} from 'react';
import './App.css';
import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person' 


class App extends Component {
  state={
    person:[
      {id:'1', name:"Dev", color:"White"},
      {id:'2', name:"Raj", color:"Blue"},
      {id:'3', name:"Raj!", color:"Blue"},
    ],
    showPerson: false
  } 

  switchNameHandler =(newName) =>{
    this.setState({
      person:[
        {name:newName, color:"White"},
        {name:"Raj", color:"Black"} 
     ]
   })
  }

  // this function for Get Text Input from user and make change in content
  nameChangeHandler=(event,id)=>{

    //findIndex() : find array index of every element same as Map()
    const personIndex=this.state.person.findIndex(p =>{
      return p.id === id;
    });

    const per={
      ...this.state.person[personIndex]
    };

    per.name=event.target.value;

    const persons= [...this.state.person];
    persons[personIndex]=per;

    this.setState({ person:persons});



  //  this.setState({
  //   person:[
  //     {name:"Dev", color:"White"},
  //     {name:"Raj", color:"Black"},
  //     {name:event.target.value, color:"Blue"}
  //     ]
  //   })
  }


  // Toggling function
  togglePersonHandler=()=>{
    const doesShow=this.state.showPerson;
    this.setState({showPerson : !doesShow})
  }

  //Delete Person Element
  deletePersonHandler=(personIndex)=>{
    const persons = [...this.state.person];
    persons.splice(personIndex,1);
    this.setState({person:persons});
  }

  render(){

    const style={
      backgroundColor:'#ccc',
      font:'inherit',
      border:'1px solid Gray',
      padding:'5px',
      cursor: 'pointer',
      margin:'0px 5px auto',
      ':hover':{
        backgroundColor:'lightgreen',
        color:'gray'
      }
    }


    const classes=[];

    if(this.state.person.length<=2){
      classes.push('red');
    }
    if(this.state.person.length<=1){
      classes.push('bold')
    }





    let persons=null;

    if(this.state.showPerson){
      persons=(
        //Using Static Person element of state
        // <div>
        //     <Person name={this.state.person[0].name} color={this.state.person[0].color} />
        //     <Person 
        //     name={this.state.person[1].name} color={this.state.person[1].color}/>
        //     <Person 
        //     name={this.state.person[2].name} color={this.state.person[2].color}
        //     click={this.switchNameHandler.bind(this,'Devraj!!')}
        //     changed={this.nameChangeHandler}
        //     > I Like to do Bike Ridding.click here!
        //     </Person>
        //   </div> 


        //Person show and Delete Using Dynamic List

        <div>
          {this.state.person.map((person,index)=>{
            return <Person 
              click={()=>this.deletePersonHandler(index)}
              name={person.name}
              color={person.color}
              key={person.id}
              changed={(event)=>this.nameChangeHandler(event,person.id)}
            />
          })}
        </div>
      );

      style.backgroundColor='White'
      style[':hover']={
        backgroundColor:'salmon',
        color:'gray'
      }
    }

    return (

      <StyleRoot>
        <div className="App">
        <h1>This's React App.</h1>
        <p className={classes.join(' ')}>Awesome Person List.</p>
        
        {/* simple event calling <button onClick={this.switchNameHandler}>Switch Name</button> */}

        {/* <button  
        style={style}
        onClick={() => this.switchNameHandler('Dev!')}>Switch Name</button> */}

        {/* Toggle button using ternary operator */}
        <button 
        style={style}
        onClick={this.togglePersonHandler}>Toggle</button>
        
        {persons}
           
      </div>
      </StyleRoot>
      
    );
  }
}

export default Radium(App);
