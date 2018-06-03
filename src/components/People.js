import React, { Component } from 'react';
import {Pagination, PaginationLink, PaginationItem} from 'reactstrap'
class PeopleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nav: 'https://swapi.co/api/people/',
      page: 1,
      previousDisabled: "disabled",
      nextDisabled: ""
    }
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    this.props.fetchPeople(this.state.nav)
  }

  handlePrevious = (e) => {
    this.props.fetchPeople(this.props.previous)
    if (this.state.page <= 2) {
      this.setState({
        page: 1,
        previousDisabled: "disabled"
      })
    } else {
      this.props.fetchPeople(this.props.previous)
      let decrement = this.state.page -1;
      this.setState({
        page:  decrement,
      })
    }
  }

  handleNext = (e) => {
    if (this.props.next == null && this.props.previous != null) {
      this.setState({page: this.state.page, previousDisabled: "", nextDisabled: "disabled"})
    } else if (this.props.next == null) {
      this.setState({nextDisabled: ""})
    } else {
      this.props.fetchPeople(this.props.next)
      let increment = this.state.page + 1;
      this.setState({
        page: increment,
        nextDisabled: "",
        previousDisabled: ""
      })
    }
  }

  render() {
    let data = this.props.people;
    let Data = data.map((people) => {
      let peopleUrl = people.url;
      let collapseTarget = peopleUrl.slice(-2, -1);

      return (
        <div key={people.name} className="col-sm-12 col-xs-12">
          <div className="profile-container col">
            <div className="profile-header">
              <div className="row">
                <div className="col card-header">
                  <a href="" data-toggle="collapse" data-target={"#" + collapseTarget} aria-expanded="false" aria-hidden="false" aria-controls="collapseExample">
                    {people.name}
                  </a>
                </div>
              </div>

              <div className="collapse" id={collapseTarget}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Height</th>
                      <th>Mass</th>
                      <th>Hair Color</th>
                      <th>Skin Color</th>
                      <th>Eye Color</th>
                      <th>Birth Year</th>
                      <th>Gender</th>
                      <th>Homeworld</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{people.height}</td>
                      <td>{people.mass}</td>
                      <td>{people.hair_color}</td>
                      <td>{people.skin_color}</td>
                      <td>{people.eye_color}</td>
                      <td>{people.birth_year}</td>
                      <td>{people.gender}</td>
                      <td>{people.homeworld}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )
    })
    return (
      <div>
        <div className="row justify-content-center no-gutters">
          <div style={{padding: "20px 0"}}><h3>Star Wars People</h3></div>
          {Data}
        </div>
        {this.props.loading === true ? 
          <div style = {{marginTop: "20px", textAlign: "center"}}>
            <i className="fa fa-refresh fa-spin fa-fw" style={{fontSize:"48px", color: "#007BFF"}}></i>
          </div> : 
          <Pagination className="pagination justify-content-end">
            <PaginationItem className={this.state.previousDisabled}>
              <PaginationLink previous onClick={() => this.handlePrevious()}/>
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink>
                Page {this.state.page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink>
                {this.props.counter} / 10
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={this.state.nextDisabled}>
              <PaginationLink next onClick={() => this.handleNext()}/>
            </PaginationItem>
          </Pagination>
        }
      </div>
    )
  }
}

export default PeopleList;
