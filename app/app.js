import React  from "react";
import { Router, Route, IndexRedirect, Link, hashHistory } from "react-router";
import ReactDOM from "react-dom";
import DockerImages from "./components/docker-images";
import DockerContainers from "./components/docker-containers";

import shelljs from "shelljs";

class AppLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dockerVersion: "..."
        };
    } // close constructor

    componentDidMount() {
        shelljs.exec("docker -v", (error, stdout, stderr) => {
            if (error) {
                console.log(error);
            } else {
                this.setState({
                    dockerVersion: stdout
                });
            }
        });
    } // close componentDidMount

    render() {
        return (
            <section id="Application">
                <nav id="AppNav">
                    <Link to="/images" activeClassName="active" className="btn">Images</Link>
                    <Link to="/containers" activeClassName="active" className="btn">Containers</Link>
                </nav>
                <section id="AppContent">
                    { this.props.children }
                </section>
                <p className="version"><code>{ this.state.dockerVersion }</code></p>
            </section>
        );
    } // close render
} // close AppLayout


class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value:""
        };
    } // close constructor
    render() {
        return (
            <Router history={ hashHistory }>
                <Route path="/" component={ AppLayout }>
                    <IndexRedirect to="/images" />
                    <Route path="/images" component={ DockerImages } />
                    <Route path="/containers" component={ DockerContainers } />
                </Route>
            </Router>
        );
    } // close render
} // close AppContainer

ReactDOM.render(<AppContainer />, document.getElementById("App"));
