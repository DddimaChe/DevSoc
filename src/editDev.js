import React, {Component} from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';

export class EditDev extends Component {
    constructor(props){
        super(props);
        this.state = {name: "", skills: ""};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSkillsChange = this.handleSkillsChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    static getDerivedStateFromProps(props,state){
        const prevName = state.prevName;
        const prevSkills = state.prevSkills;
        const name  = prevName !==props.developer.name ? props.developer.name : state.name;
        const skills = prevSkills !== props.developer.skills.join(",") ?
            props.developer.skills.join(",") : state.skills;
        return {
            prevName: props.developer.name, name,
            prevSkills: props.developer.skills.join(","), skills,
        }
    }
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleSkillsChange(e){
        this.setState({skills: e.target.value});
    }
    handleEdit(e){
        e.preventDefault();
        const  onEdit = this.props.onEdit;
        const currentlyEditing =this.props.currentlyEditing;
        const regExp = /\s*,\s*/;
        let name = this.state.name;
        let skills = this.state.skills.split(regExp);
        onEdit(name, skills, currentlyEditing);
    }
    handleCancel(){
        const onEditModal = this.props.onEditModal;
        this.setState({name: this.props.developer.name, skills:this.props.developer.skills.join(",")});
        onEditModal();
    }
    render() {
        const onShow = this.props.onShow;
        var regex1 = /^\S/;
        var regex2 = /^[^,\s]/;
        var regex3 = /[^,\s]$/;
        const validRecipe = regex1.test(this.state.name) && regex2.test(this.state.skills) && regex3.test(this.state.skills);
        return(
            <Modal show={onShow} onHide={this.handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="formControlsName">
                        <ControlLabel>Recipe Name</ControlLabel>
                        <FormControl type="text" required onChange={this.handleNameChange} value={this.state.name} placeholder="Enter Name" />
                    </FormGroup>
                    <FormGroup controlId="formControlsIngredients">
                        <ControlLabel>Recipe Ingredients</ControlLabel>
                        <FormControl componentClass="textarea" type="text" required onChange={this.handleSkillsChange} value={this.state.skills} placeholder="Enter Ingredients(separate by commas)" />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!validRecipe} bsStyle="success" onClick={this.handleEdit}>Save Recipe</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}