import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPeople} from '../actions/index';
import {bindActionCreators} from 'redux';
import PeopleList from '../components/People';
class People extends Component {
  render() {
    return (
      <div className="col app-body">
        <PeopleList people={this.props.people} fetchPeople={this.props.fetchPeople} next={this.props.next} previous={this.props.previous} counter = {this.props.people.length} loading={this.props.loading}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let data = state.data.PeopleData;
  return {people: data.sort(), next: state.data.next, previous: state.data.previous, loading: state.data.loading};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPeople: fetchPeople,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(People);
