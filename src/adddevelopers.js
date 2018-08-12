import React, {Component} from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';

export class AddDev extends Component{
    constructor(props){
        super(props);
        this.state = {name: "", skills: ""};
    }
    handleDevNameChange = e => {
        this.setState({name: e.target.value});
    }
    handleSkillsChange = e =>{
        this.setState({skills: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const onAdd = this.props.onAdd;
        const regExp = /\s*,\s*/;
        let newName = this.state.name;
        let newSkills = this.state.skills.split(regExp);
        let newDev = {name: newName, skills: newSkills};
        onAdd(newDev);
        this.setState({name: "", skills: ""});
    }
    handleCancel = () => {
        const onAddModal = this.props.onAddModal;
        this.setState({name: "", skills: ""});
        onAddModal();
    }
    render() {
        const onShow = this.props.onShow;
        let regex1 = /^\S/;
        let regex2 = /^[^,\s]/;
        let regex3 = /[^,\s]$/;
        const validRecipe = regex1.test(this.state.name) && regex2.test(this.state.skills) && regex3.test(this.state.skills);
        return(
            <Modal show={onShow} onHide={this.handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="formControlsName">
                        <ControlLabel>Recipe Name</ControlLabel>
                        <FormControl type="text" required onChange={this.handleDevNameChange} value={this.state.name} placeholder="Enter Name" />
                    </FormGroup>
                    <FormGroup controlId="formControlsIngredients">
                        <ControlLabel>Recipe Ingredients</ControlLabel>
                        <FormControl componentClass="textarea" type="text" required onChange={this.handleSkillsChange} value={this.state.skills} placeholder="Enter Ingredients(separate by commas)" />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!validRecipe} bsStyle="success" onClick={this.handleSubmit}>Save Recipe</Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

