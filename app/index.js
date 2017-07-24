const React = require('react');
const ReactDOM = require('react-dom');

import './index.sass';


function App() {
    return (
		<div className="container">
			<h1>WIP: Recipe box</h1>
			<div className="well panel panel-default">
				<div className="panel-group">
					<div className="panel panel-success">
						<div className="panel-heading">
							<h4 className="panel-title">
								<button data-toggle="collapse" data-target="#demo">Friend</button>
							</h4>
						</div>
						<div id="demo" className="panel-collapse">
							<div className="panel-body">
                                <ul className="list-group">
                                    <li className="list-group-item">Trust</li>
                                    <li className="list-group-item">Time</li>
                                    <li className="list-group-item">Listening</li>
                                    <li className="list-group-item">Helping</li>
                                </ul>
                                <button className="btn btn-danger">Delete</button>
                                <button className="btn btn-default">Edit</button>
							</div>
						</div>
					</div>
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <button data-toggle="collapse" data-target="#demo">Job</button>
                            </h4>
                        </div>
                        <div id="demo" className="panel-collapse">
                            <div className="panel-body">
                                <ul className="list-group">
                                    <li className="list-group-item">Long work</li>
                                    <li className="list-group-item">Luck</li>
                                    <li className="list-group-item">Family</li>
                                    <li className="list-group-item">Skill</li>
                                </ul>
                                <button className="btn btn-danger">Delete</button>
                                <button className="btn btn-default">Edit</button>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
			<button className="btn btn-primary">Add recipe</button>
		</div>
    );
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);