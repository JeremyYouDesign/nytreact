import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, FormText, FormButton } from '../components/Form';

class Main extends Component {
  state = {
    articles: [],
    queryTerm: '',
    beginDate: '',
    endDate: ''
  };

  getArticles = () => {
    let query = `${this.state.queryTerm}`;
    if (this.state.beginDate) {
      query = `${query}&begin_date=${this.state.beginDate}`;
    }
    if (this.state.endDate) {
      query = `${query}&end_date=${this.state.endDate}`;
    }

    API.nytSearch(query)
      .then(res => {
        console.log(res);
        this.setState({
          articles: res.data.response.docs,
          queryTerm: '',
          beginDate: '',
          endDate: ''
        });
      })
      .catch(err => console.log(err));
  };

 
  saveArticle = articleInfo => {
    API.saveArticle(articleInfo)
      .then(res => {
      })
      .catch(err => {
        console.log(err);
      })
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.queryTerm) {
      this.getArticles();
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Search for a subject!</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <form>
              <Input
                value={this.state.queryTerm}
                onChange={this.handleInputChange}
                name="queryTerm"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.beginDate}
                onChange={this.handleInputChange}
                name="beginDate"
                placeholder="Begin (YYYYMMDD - optional)"
              />
              <Input
                value={this.state.endDate}
                onChange={this.handleInputChange}
                name="endDate"
                placeholder="End (YYYYMMDD - optional)"
              />
              <FormButton disabled={!this.state.queryTerm} onClick={this.handleFormSubmit}>
                Submit Search
              </FormButton>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.web_url} target="_blank">
                      <strong>{article.headline.main}</strong>
                    </a>
                    <br/>
                    <span>Published on {article.pub_date}</span>
                    <button className="btn btn-info" style={{float: "right"}} onClick={() => this.saveArticle({
                      title: article.headline.main,
                      url: article.web_url, 
                      date: article.pub_date
                    })}> Save Article </button> 
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>Nothing to Display</h3>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Main;