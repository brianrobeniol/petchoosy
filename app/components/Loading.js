var React = require('react');
var PropTypes = require('prop-types');

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
  }
  componentDidMount() {
    var stopper = this.props.text + '...'; // know when we should stop / reset the loading text ?
    this.interval = window.setInterval(function () {
      if (this.state.text === stopper) {
        this.setState(function () {
          return {
            text: this.props.text
          }
        })
      } else {
        // to set the new state based on the previous state the first argument passed to the setState function is the previous state
        this.setState(function (prevState) {
          return {
            text: prevState.text + '.'
          }
        });
      }
    }.bind(this), this.props.speed)
  }// when the component unmounts (removed from the view) you want to remove the set interval listener
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
};

module.exports = Loading;
