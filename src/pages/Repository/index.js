import React, { Component } from 'react';

import api from '../../services/api';

import { Link } from 'react-router-dom';

import Proptypes from 'prop-types';

import Container from '../../components/container';

import { Loading, Owner, IssueList } from './style';

import { AiFillGithub } from 'react-icons/ai';


export default class Repository extends Component {

  static propTypes = {
    match: Proptypes.shape({
      params: Proptypes.shape({
        repository: Proptypes.string,
      }),
    }).isRequired
  };

  state = {
    repositories: {},
    issues: [],
    loading: true,
  }

  async componentDidMount() {

    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    if(loading) {
      return <Loading>
        <AiFillGithub />
              <h1>Carregando</h1>
       </Loading>;
    }

    return(
      <Container>
        <Owner>
          <Link to="/">Voltar para a minha lista</Link>
          <img src={repository.owner.avatar_url} alt="{repository.owner.login}"/>
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={ issue.user.avatar_url} alt="{issue.user.login}"/>
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                    <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
        </IssueList>
      </Container>
    );
  }
}
