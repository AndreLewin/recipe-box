const React = require('react');
const ReactDOM = require('react-dom');
import { Button, Panel, Modal, FieldGroup, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

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
        this.handleEditClick = this.handleEditClick.bind(this);
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

    handleEditClick() {
        this.props.onEditClick(this.props.index);
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
                        <button className="btn btn-default" onClick={this.handleEditClick}>Edit</button>
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
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleDeleteRecipe(recipeIndex) {
        this.props.onDeleteRecipe(recipeIndex);
    }

    handleEditClick(recipeIndex) {
        this.props.onEditClick(recipeIndex);
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
                    onEditClick={this.handleEditClick}
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
                    <Modal.Title>{this.props.modalTitle}</Modal.Title>
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
                                value={this.props.recipeString}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Enter the ingredients separated by commas</ControlLabel>
                            <FormControl
                                name="ingredientsString"
                                type="text"
                                placeholder="Ingredient 1,Ingredient 2,Ingredient 3"
                                onChange={this.handleChange}
                                value={this.props.ingredientsString}
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
            // Note: no check if the item in localStorage is an array
            recipes: (localStorage.getItem('recipes') !== null) ? JSON.parse(localStorage.getItem('recipes')) : defaultRecipes,

            showModal: false,
            modalTitle: "",
            recipeIndex: undefined, // Defines which recipe the modal will edit. If the index is -1, it is a new recipe.
            recipeString: "",
            ingredientsString: ""
        };

        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleClosingModal = this.handleClosingModal.bind(this);
        this.handleFormControlChange = this.handleFormControlChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    }

    handleAddClick() {
        this.setState({
            showModal: true,
            modalTitle: "Add a recipe",
            recipeIndex: -1,
            recipeString: "",
            ingredientsString: ""
        });
    }

    handleEditClick(recipeIndex) {
        const recipeString = this.state.recipes[recipeIndex].name;
        const ingredientsString = this.state.recipes[recipeIndex].ingredients.join();

        this.setState({
            showModal: true,
            modalTitle: "Edit the recipe",
            recipeIndex: recipeIndex,
            recipeString: recipeString,
            ingredientsString: ingredientsString
        });
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

        // If a new recipe (recipeIndex == -1) or an old recipe (recipeIndex > -1)
        if (this.state.recipeIndex === -1) {
            this.setState((prevState, props) => ({
                recipes: prevState.recipes.concat({"name": this.state.recipeString, "ingredients": ingredientsArray})
            }));
        } else if (this.state.recipeIndex > -1) {
            this.setState((prevState, props) => {
                let newRecipes = prevState.recipes.slice();
                newRecipes[this.state.recipeIndex] = {"name": this.state.recipeString, "ingredients": ingredientsArray};
                return {recipes: newRecipes};
            });
        }

        this.setState({ showModal: false});
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
                <h1>Recipe box</h1>
                <div className="well panel panel-default">
                    <RecipeList
                        recipes={this.state.recipes}
                        onDeleteRecipe={this.handleDeleteRecipe}
                        onEditClick={this.handleEditClick}
                    />
                </div>
                <button onClick={this.handleAddClick} className="btn btn-primary">Add a recipe</button>
                <RecipeModal
                    showModal={this.state.showModal}
                    modalTitle={this.state.modalTitle}
                    onClosing={this.handleClosingModal}
                    onFieldChange={this.handleFormControlChange}
                    onSubmitClick={this.handleFormSubmit}
                    recipeString={this.state.recipeString}
                    ingredientsString={this.state.ingredientsString}
                />
            </div>
        );
    }

}


ReactDOM.render(
	<App />,
	document.getElementById('app')
);