const React = require('react');
const ReactDOM = require('react-dom');
import { Button, Panel, Modal, OverlayTrigger, FieldGroup, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import './index.sass';
import defaultRecipes from './defaultRecipes.json';


class AddButtonAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                showModal: this.props.showModal,
                recipeNameString: undefined,
                ingredientsString: undefined
            };

        // JS does not bind methods by default, so we have to define this.close
        // Binding to "this" is necessary so we can refer to the methods in onClick={this.method}
        // Note: This is the recommended way in the react tutorial. It is possible to do onClick={() => this.open()}
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleFormControlChange = this.handleFormControlChange.bind(this);
        this.handleAddRecipeSubmitClick = this.handleAddRecipeSubmitClick.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    handleFormControlChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleAddRecipeSubmitClick() {
        // Change the string of ingredients into an array for the root component
        const ingredientsArray = this.state.ingredientsString.split(",");
        this.props.handleAddRecipeSubmitClick(this.state.recipeNameString, ingredientsArray);
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.open}>Add recipe</button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Enter the name of the recipe</ControlLabel>
                                <FormControl
                                    name="recipeNameString"
                                    type="text"
                                    placeholder="Recipe name"
                                    onChange={this.handleFormControlChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Enter the ingredients separated by commas</ControlLabel>
                                <FormControl
                                    name="ingredientsString"
                                    type="text"
                                    placeholder="Ingredient 1, Ingredient 2, Ingredient 3"
                                    onChange={this.handleFormControlChange}
                                />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAddRecipeSubmitClick}>Submit the recipe</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.handleClickOpenClose = this.handleClickOpenClose.bind(this);
    }

    handleClickOpenClose(event) {
        this.setState(
            (prevState, props) => ({
                open: !prevState.open
            })
        );
    }

    render() {
        const listIngredients = this.props.ingredients.map(function(ingredient, index) {
            return (
                <li key={ingredient} className="list-group-item">{ingredient}</li>
            );
        });

        return (
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <Button onClick={this.handleClickOpenClose}>{this.props.name}</Button>
                        </h4>
                    </div>
                    <Panel collapsible expanded={this.state.open}>
                        <div className="panel-body">
                            <ul className="list-group">
                                {listIngredients}
                            </ul>
                            <button className="btn btn-danger">Delete</button>
                            <button className="btn btn-default">Edit</button>
                        </div>
                    </Panel>
                </div>
        );
    }
}


class RecipeList extends React.Component {
    render() {
        const listRecipes = this.props.recipes.map(function(recipe, index) {
            return (
                <Recipe key={index} name={recipe.name} ingredients={recipe.ingredients}/>
            );
        });

        return (
            <div className="panel-group">{listRecipes}</div>
        );
    }
}


class App extends React.Component {
    constructor(props) { // React official documentation recommends to always pass props to the constructor (why?)
        super(props);
        this.state = {
            // TODO: Idea: Add a state for new recipe, that is updated by a function passed to check the field
            // TODO, that way, the recipe can be added to the list
            // TODO, the submit handler should also be passed
            // Note: no check if the item in localStorage is an array
            recipes: (localStorage.getItem('recipes') !== null) ? JSON.parse(localStorage.getItem('recipes')) : defaultRecipes,
            showModal: true,
        };

        this.handleAddRecipeSubmitClick = this.handleAddRecipeSubmitClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
    }

    handleAddRecipeSubmitClick(nameString, ingredientsArray) {
        console.log(nameString);
        this.setState((prevState, props) => ({
            recipes: prevState.recipes.concat({"name": nameString, "ingredients": ingredientsArray})
        }));

    }

    // TODO: handleRemoveRecipeClick(recipeIndex)
    // Called with the id of the children component
    // this.setState((prevState, props) = ({
    //     recipes: prevState.recipes.slice().splice(recipeIndex,1)

    // TODO: handleEdit
    // Change the modal to "Edit Modal"
    // An id should be passed to the modal. Add recipe -> recipes.length+1 ; Edit -> the id of the recipe
    // Change handleAddRecipeSubmitClick to handleRecipeSubmitClick
    // It should add or edit depending on the id compared to the recipes.length

    handleRemoveClick() {
        this.setState((prevState, props) => ({
            recipes: prevState.recipes.slice(0, this.state.recipes.length-1)
        }));
    }

    render() {
        localStorage.setItem('recipes', JSON.stringify(this.state.recipes));

        return (
            <div className="container">
                <h1>WIP: Recipe box</h1>
                <div className="well panel panel-default">
                    <RecipeList recipes={this.state.recipes} />
                </div>
                <AddButtonAddModal showModal={this.state.showModal} handleAddRecipeSubmitClick={this.handleAddRecipeSubmitClick}/>
                <button onClick={this.handleRemoveClick} className="btn btn-primary">Remove recipe</button>
            </div>
        );
    }

}


ReactDOM.render(
	<App />,
	document.getElementById('app')
);