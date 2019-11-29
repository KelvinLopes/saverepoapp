import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import { AiFillGithub } from 'react-icons/ai';

import { FaPlus, FaSpinner, FaRegTrashAlt, FaArrowDown, FaArrowUp } from 'react-icons/fa';

import Container from '../../components/container';

import Error from '../../components/error';

import { Form, SubmitButton, List, ShowList, HiddenList } from './style';

export default class Main extends Component {

state = {
  newRepo: '',
  repositories: [],
  loading: false,
  checkError: true,
  sendErrorMensagem: '',
}

// Carrega dados do localStorage
componentDidMount() {
  const repositories = localStorage.getItem('repositories');

  if(repositories) {
    this.setState({ repositories: JSON.parse(repositories) });
  }
}

//Salva os dados no localStorage
componentDidUpdate(_, prevState) {

  const { repositories } = this.state;

  if(prevState.repositories !== repositories) {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }
}

handleInputChange = e => {
  this.setState({newRepo: e.target.value});
}

handleSubmit = async e => {
  e.preventDefault();

  this.setState({ loading: true });

  try {
    const { newRepo, repositories } = this.state;

    const alreadyRepo = repositories.find(repo => repo.name === newRepo);

    if(alreadyRepo) {
      throw ('Ei... você já salvou esse! Não se preocupe não terá um duplicado.');
    }

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      sendErrorMensagem: '',
      checkError: true,
    });
  } catch(error) {
    this.alternativeInputColorRed();
    let textMessange = '';
    if(error !== 'Ei... você já salvou esse! Não se preocupe não terá um duplicado.')
        textMessange = 'Repositóro não existe na base Github';
      else textMessange = error;

      this.setState({
        checkError: false,
        newRepo: '',
        sendErrorMensagem: textMessange,
      });
  } finally {
    this.setState({loading: false, checkError: false});
  }
};


alternativeInputColorRed(){
  const colorBorderInput = document.querySelector('input');

  colorBorderInput.style.borderColor = 'rgba(250,25,0,0.7)';

  setTimeout( () => {
    colorBorderInput.style.borderColor = '#248eff';
  }, 2000);
}

handleDeleteRepo = (repositories) => {
  this.setState({ repositories: this.state.repositories.filter( repo => repo !== repositories) })
}

handleHidenList() {
  const getList = document.querySelector('.list-repo');
  const hidden  = document.querySelector('.hidden-list');
  const show  = document.querySelector('.show-list');

  getList.style.display = 'none';
  hidden.style.display = 'none';
  show.style.display = 'block';
}

handleShowList() {
  const getList = document.querySelector('.list-repo');
  const hidden  = document.querySelector('.hidden-list');
  const show  = document.querySelector('.show-list');

  getList.style.display = 'block';
  hidden.style.display = 'block';
  show.style.display = 'none';
}

  render () {

    const { newRepo, repositories, loading, checkError, sendErrorMensagem } = this.state;

    return (
      <Container>
        <h1>
          <AiFillGithub />
            Minha lista de repositórios do Github
        </h1>
      { checkError ? (<> </>) : (

          <Error>
            <h1>
              {sendErrorMensagem}
            </h1>
          </Error>)}

      <Form onSubmit={this.handleSubmit}>
       <input
          type="text"
            placeholder="Para adicionar a lista, digite um repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
        <SubmitButton loading={loading ? 1 : 0}>

            {
              loading ? (
                <FaSpinner color="fff" size={14}/>
              ) :
              (
                <FaPlus color="#fff" size={14} />
              )
            }
        </SubmitButton>
      </Form>
        <HiddenList className="hidden-list"><FaArrowDown  onClick={ () => this.handleHidenList()} /></HiddenList>
        <ShowList className="show-list" display="none"><FaArrowUp onClick={ () => this.handleShowList()} /></ShowList>


      <List className="list-repo">
        {repositories.map(repository => (
        <li key={repository.name}>
          <span>{repository.name}</span>
          <div>
          <span>
            <span>
            <Link to ={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
            </span>
            <span>
            <FaRegTrashAlt className="trash" title="Remover"
              cursor="pointer"
              onClick={()=>
              this.handleDeleteRepo(repository)
           }>
          </FaRegTrashAlt>
          </span>
          </span>
          </div>

        </li>
        ))}
      </List>

    </Container>
    );
  }
}
