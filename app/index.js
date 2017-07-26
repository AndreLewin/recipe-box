const React = require('react');
const ReactDOM = require('react-dom');

import { Button, Panel } from 'react-bootstrap';

import './index.sass';


class RecipeList extends React.Component {
    constructor() {
        super();
        // set state based on navigator data
        // any change of navigator data should trigger this -> no data lost
    }

    render() {

        // Array map, return how many Recipe than they are navigator data
        return (0

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

class App extends React.Component {

    render() {
        return (
            <div className="container">
                <h1>WIP: Recipe box</h1>
                <div className="well panel panel-default">
                    <div className="panel-group">
                        <Recipe name={"recipeA"} ingredients={['a','b','c']} />
                        <Recipe name={"recipeB"} ingredients={['d','e','f']} />
                    </div>
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