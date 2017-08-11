const React = require('react');
const ReactDOM = require('react-dom');
import { Button, Panel, Modal, OverlayTrigger, FieldGroup, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import './index.sass';
import defaultRecipes from './defaultRecipes.json';


class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.handleClickOpenClose = this.handleClickOpenClose.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    }

    handleClickOpenClose(event) {
        this.setState(
            (prevState, props) => ({
                open: !prevState.open
            })
        );
    }

    handleDeleteRecipe() {
        this.props.onDeleteRecipe(this.props.index);
    }

    render() {
        const listIngredients = this.props.ingredients.map((ingredient, index) => {
            return (
                <li key={index} className="list-group-item">{ingredient}</li>
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
                        <button className="btn btn-danger" onClick={this.handleDeleteRecipe}>Delete</button>
                        <button className="btn btn-default">Edit</button>
                    </div>
                </Panel>
            </div>
        );
    }
}


class RecipeList extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    }

    handleDeleteRecipe(recipeIndex) {
        this.props.onDeleteRecipe(recipeIndex);
    }

    render() {
        const listRecipes = this.props.recipes.map((recipe, index) => {
            return (
                <Recipe
                    key={index}
                    index={index}
                    name={recipe.name}
                    ingredients={recipe.ingredients}
                    onDeleteRecipe={this.handleDeleteRecipe}
                />
            );
        });

        return (
            <div className="panel-group">{listRecipes}</div>
        );
    }
}


class RecipeModal extends React.Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    close() {
        this.props.onClosing();
    }

    handleChange(event) {
        this.props.onFieldChange(event.target.name, event.target.value);
    }

    handleSubmitClick() {
        this.props.onSubmitClick();
    }

    render() {

        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup>
                            <ControlLabel>Enter the name of the recipe</ControlLabel>
                            <FormControl
                                name="recipeString"
                                type="text"
                                placeholder="Recipe name"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Enter the ingredients separated by commas</ControlLabel>
                            <FormControl
                                name="ingredientsString"
                                type="text"
                                placeholder="Ingredient 1,Ingredient 2,Ingredient 3"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleSubmitClick}>Submit the recipe</Button>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: Idea: Add a state for new recipe, that is updated by a function passed to check the field
            // TODO, that way, the recipe can be added to the list
            // TODO, the submit handler should also be passed
            // Note: no check if the item in localStorage is an array
            recipes: (localStorage.getItem('recipes') !== null) ? JSON.parse(localStorage.getItem('recipes')) : defaultRecipes,

            showModal: false,
            recipeString: undefined,
            ingredientsString: undefined
        };

        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleClosingModal = this.handleClosingModal.bind(this);
        this.handleFormControlChange = this.handleFormControlChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    }

    // TODO: handleEdit

    handleAddClick() {
        this.setState({ showModal: true });
    }

    handleRemoveClick() {
        this.setState((prevState, props) => ({
            recipes: prevState.recipes.slice(0, this.state.recipes.length-1)
        }));
    }

    handleClosingModal() {
        this.setState({ showModal: false });
    }

    handleFormControlChange(attribute, value) {
        this.setState({ [attribute] : value });
    }

    handleFormSubmit() {
        // Change the string of ingredients into an array for the root component
        const ingredientsArray = this.state.ingredientsString.split(",");
        this.setState((prevState, props) => ({
            recipes: prevState.recipes.concat({"name": this.state.recipeString, "ingredients": ingredientsArray}),
            showModal: false
        }));
    }

    handleDeleteRecipe(recipeIndex) {
        let newArray = this.state.recipes.slice();
        newArray.splice(recipeIndex,1);

        this.setState((prevState, props) => {
            let newArray = prevState.recipes.slice();
            newArray.splice(recipeIndex,1);
            return {recipes: newArray}
        });

    }

    render() {
        localStorage.setItem('recipes', JSON.stringify(this.state.recipes));

        return (
            <div className="container">
                <h1>WIP: Recipe box</h1>
                <div className="well panel panel-default">
                    <RecipeList
                        recipes={this.state.recipes}
                        onDeleteRecipe={this.handleDeleteRecipe}
                    />
                </div>
                <button onClick={this.handleAddClick} className="btn btn-primary">Add recipe</button>
                <button onClick={this.handleRemoveClick} className="btn btn-primary">Remove recipe</button>
                <RecipeModal
                    showModal={this.state.showModal}
                    onClosing={this.handleClosingModal}
                    onFieldChange={this.handleFormControlChange}
                    onSubmitClick={this.handleFormSubmit}
                />
            </div>
        );
    }

}


ReactDOM.render(
	<App />,
	document.getElementById('app')
);