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
                showModal: this.props.showModal
            };
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    // TODO: Create a submit button to get the value of the fields
    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={() => this.open()}>Add recipe</button>

                <Modal show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Enter the name of the recipe</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.recipeName}
                                    placeholder="Recipe name"
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Enter the ingredients separated by commas</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.ingredients}
                                    placeholder="Ingredient 1, Ingredient 2, Ingredient 3"
                                />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


class Recipe extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
        };
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
                            <Button onClick={ ()=> this.setState({ open: !this.state.open })}>{this.props.name}</Button>
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
                <Recipe name={recipe.name} ingredients={recipe.ingredients}/>
            );
        });

        return (
            <div className="panel-group">{listRecipes}</div>
        );
    }
}



class App extends React.Component {
    constructor(){
        super();

        this.state = {
            // Note: no check if the item in localStorage is an array
            recipes: (localStorage.getItem('recipes') !== null) ? JSON.parse(localStorage.getItem('recipes')) : defaultRecipes,
            showModal: true,
        };
    }

    // TODO: Convert to handleSubmitClick, give to the modal as prop
    /*
    handleAddClick() {
        this.setState({
            showModal: true,
            // recipes: this.state.recipes.concat({"name": "pushed", "ingredients": ["hope"]})
        });
        console.log(this.state.showModal);
    }
    */

    handleRemoveClick() {
        this.setState({
            recipes: this.state.recipes.slice(0, this.state.recipes.length-1)
        });
    }

    render() {
        localStorage.setItem('recipes', JSON.stringify(this.state.recipes));

        return (
            <div className="container">
                <h1>WIP: Recipe box</h1>
                <div className="well panel panel-default">
                    <RecipeList recipes={this.state.recipes} />
                </div>
                <AddButtonAddModal showModal={this.state.showModal} />
                <button onClick={(i) => this.handleRemoveClick(i)} className="btn btn-primary">Remove recipe</button>
            </div>
        );
    }

}


ReactDOM.render(
	<App />,
	document.getElementById('app')
);