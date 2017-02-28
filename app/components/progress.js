import React  from "react";

class Progress extends React.Component {
    constructor(props) {
        super(props);
    } // close constructor

    componentDidMount() {
    } // close componentDidMount

    componentWillUnmount() {
    } // close componentWillUnmount

    componentDidUpdate() {
    } // close componentDidUpdate

    render() {
        return (
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ width: this.props.value + "%" }}>
                    <span className="sr-only">{ this.props.value }% Complete</span>
                </div>
            </div>
        );
    } // close render
} // close Progress

Progress.defaultProps = {
    value: 60
};

export default Progress;
