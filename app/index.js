const React = require('react');
const ReactDOM = require('react-dom');
import { Button, Panel, Accordion } from 'react-bootstrap';

import './index.sass';
import defaultRecipes from './defaultRecipes.json';



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
    constructor() {
        super();

        // TODO: get data from local storage
        // If no data, use a template

        this.state = {
            recipes: defaultRecipes
        };
    }

    render() {
        // TODO: save new data from local storage

        const listRecipes = this.state.recipes.map(function(recipe, index) {
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

    render() {
        return (
            <div className="container">
                <h1>WIP: Recipe box</h1>
                <div className="well panel panel-default">
                    <RecipeList />
                </div>
                <button className="btn btn-primary">Add recipe</button>
            </div>
        );
    }

}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);