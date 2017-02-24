import React  from "react";
import dockerapi from "./../helpers/dockerapi";
import UpdateTable from "./../helpers/updateTable";
import moment from "moment";
import $ from "jquery"
import prettyBytes from "pretty-bytes";


class DockerContainerPort extends React.Component {
    render() {
        return (
            <ul>
                { this.props.ports.map( (port, index) => {
                    let OutputString = "";
                    if ( port.IP ) { OutputString += `${port.IP}:`; }
                    if ( port.PublicPort ) { OutputString += `${port.PublicPort}-`; }
                    if ( port.PrivatePort ) { OutputString += `${port.PrivatePort}`; }
                    if ( port.Type ) { OutputString += `/${port.Type}`; }
                    return (
                        <li key={ `port${index}` }>
                            { OutputString }
                        </li>
                    );
                }) }
            </ul>
        )
    } // close render
} // close DockerContainerPort


class DockerContainerRow extends React.Component {
    render() {
        const id = this.props.container.Id.slice(0,12);
        const checked = false;
        return (
            <tr>
                <td>
                    <i className={ "toggle fa " + ((checked)?"fa-check-square-o":"fa-square-o") } />
                </td>
                <td>{ id }</td>
                <td>{ this.props.container.Image }</td>
                <td>{ this.props.container.Command }</td>
                <td>{ moment.unix(this.props.container.Created).format("MM-DD-YYYY") }</td>
                <td>{ this.props.container.Status }</td>
                <td><DockerContainerPort ports={ this.props.container.Ports } /></td>
                <td>{ this.props.container.Names.toString() }</td>
            </tr>
        )
    } // close render
} // close DockerContainerRow


class DockerContainers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containers: []
        };

        this.interval = null;
    } // close constructor

    componentDidMount() {
        this._updateContainerData();
        this.interval = setInterval( () => {
            this._updateContainerData();
        }, 1000);
    } // close componentDidMount

    componentWillUnmount() {
        clearInterval(this.interval);
    } // close componentWillUnmount

    componentDidUpdate() {
        UpdateTable();
        $(window).on("resize", UpdateTable);
    } // close componentDidUpdate

    _updateContainerData () {
        dockerapi.get("containers/json?all=true", (error, data) => {
            if (error) {
                console.log(error);
            } else {
                this.setState({
                    containers: data
                });
            }
        })
    } // close _updateContainerData

    render() {
        return (
            <section>
                <table className="formatted docker-containers">
                    <thead>
                        <tr>
                            <th />
                            <th>Container Id</th>
                            <th>Image</th>
                            <th>Command</th>
                            <th>Created</th>
                            <th>Status</th>
                            <th>Ports</th>
                            <th>Names</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td colSpan="6">
                                <button className="btn disabled">Stop Selected</button>
                                <button className="btn disabled">Start Selected</button>
                                <button className="btn disabled">Remove Selected</button>
                            </td>
                        </tr>
                    </tfoot>
                    <tbody>
                        {
                            this.state.containers.map( container => {
                                return (
                                    <DockerContainerRow
                                        key={ `container-${container.Id}` }
                                        container={ container }
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>
        );
    } // close render
} // close DockerContainers


export default DockerContainers;
