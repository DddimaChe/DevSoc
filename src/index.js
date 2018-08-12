import React from 'react';
import ReactDOM from 'react-dom';
import {AddDev} from './adddevelopers';
import {EditDev} from './editDev';
import './index.css';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup,ListGroupItem,Jumbotron} from 'react-bootstrap';


class Describe extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            developers: [
                {name: "John", skills: ["HTML", "CSS", "JavaScript"]},
                {name: "Bob", skills: ["Python", "Blockchain", "JavaScript"]},
                {name: "Paul", skills: ["C", "C++", "Linux"]}
            ],
            showAdd: false,
            showEdit: false,
            currentlyEditing: 0
        };
    }

    showAddModal = () => {
        this.setState({showAdd: !this.state.showAdd})
    }
    showEditModal= index =>{
        this.setState({showEdit: !this.state.showEdit, currentlyEditing: index});
    }

    addDev = developer => {
        let developers = this.state.developers;
        developers.push(developer);
        this.setState({developers: developers});
        this.showAddModal();
    }

    editDev = (newName, newSkills, currentlyEditing) => {
        let developers = this.state.developers;
        developers[currentlyEditing] = {name: newName, skills: newSkills};
        this.setState({developers: developers});
        this.showEditModal(currentlyEditing);
    }
    deleteDev = index => {
        let developers = this.state.developers.slice();
        developers.splice(index,1);
        this.setState({developers: developers, currentlyEditing: 0});
    }
    render(){
    const {developers} = this.state;
        return(
            <div className="jumbotron">
                <Jumbotron>
                    <h1>DEV SOCIAL</h1>
                </Jumbotron>
                <PanelGroup accordion id="recipes">
                    {developers.map((developer, index) => (
                        <Panel  eventKey={index} key={index} bsStyle="primary">
                            <Panel.Heading>
                                <Panel.Title bbStyle="primary" className="title" toggle>{developer.name}</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <ListGroup>
                                    {developer.skills.map((skill, index) => (
                                        <ListGroupItem key={index}>{skill}</ListGroupItem>
                                    ))}
                                </ListGroup>
                                <ButtonToolbar>
                                    <Button bsStyle="warning" onClick={()=> {this.showEditModal(index)}}>Edit</Button>
                                    <Button bsStyle="danger" onClick={()=> {this.deleteDev(index)}}>Delete</Button>
                                </ButtonToolbar>
                            </Panel.Body>
                            <EditDev onShow={this.state.showEdit} onEdit={this.editDev} onEditModal={() =>
                            {this.showEditModal(this.state.currentlyEditing)}}
                          currentlyEditing={this.state.currentlyEditing} developer={developers[this.state.currentlyEditing]}/>
                        </Panel>
                    ))}
                </PanelGroup>
                <Button bsStyle="success" onClick={this.showAddModal}>Add Recipe</Button>
                <AddDev onShow={this.state.showAdd} onAdd={this.addDev} onAddModal={this.showAddModal}/>
            </div>
        );
    }
};



ReactDOM.render(<Describe />, document.getElementById('root'));

