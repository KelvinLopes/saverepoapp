import React, { Component } from 'react';

import api from '../../services/api';

import { Link } from 'react-router-dom';

import Proptypes from 'prop-types';

import Container from '../../components/container';

import { Loading, Owner, IssueList, IssueFilter, PageActions } from './style';

import { AiFillGithub } from 'react-icons/ai';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';



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
    filtering: [
      {state: 'all', label: 'Todas', active: true},
      {state: 'open', label: 'Abertas', active: false},
      {state: 'closed', label: 'Fechadas', active: false},
    ],
    filterIndex: 0,
    page: 1,
  }

  async componentDidMount() {

    const { match } = this.props;
    const { filtering } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filtering.find(situation => situation.active).state,
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

  loadIssues = async () => {
    const { match } = this.props;
    const { filtering, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filtering[filterIndex].state,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handleFilterClick = async filterIndex => {
    await this.setState({ filterIndex });
    this.loadIssues();
  };

  handlePage = async action => {
    const { page } = this.state;
    await this.setState({
      page: action === 'back' ? page -1 : page +1,
    });
    this.loadIssues();
  }

  render() {
    const { repository, issues, loading, filtering, filterIndex, page } = this.state;

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
          <IssueFilter active={filterIndex}>
              {filtering.map((filtering, filterIndex) =>
                <button
                  type="button"
                  key={filtering.label}
                  onClick={() => this.handleFilterClick(filterIndex)}
                >
                  {filtering.label}
                </button>
              )}
          </IssueFilter>

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
        <PageActions>
          <button
              type="button"
              disabled={ page < 2  }
              onClick={() => this.handlePage('back')}
              >
                <FaArrowLeft color="#fff"/>

            </button>
              <span className="span-page">Página {page}</span>

              <button type="button"
              disabled={ issues.length <= 1  }
              onClick={() => this.handlePage('next')}>

                 <FaArrowRight color="#fff"/>

              </button>
        </PageActions>
      </Container>
    );
  }
}
