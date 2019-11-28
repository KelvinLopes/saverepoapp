import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import { AiFillGithub } from 'react-icons/ai';

import { FaPlus, FaSpinner } from 'react-icons/fa';

import Container from '../../components/container';

import Error from '../../components/error';

import { Form, SubmitButton, List} from './style';

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
    const { newRepo, respositories } = this.state;

    const alreadyRepo = respositories.find(repo => repo.name === newRepo);

    if(alreadyRepo) {
      throw new Error('Repositório duplicado');
    }

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.state({
      respositories: [...respositories, data],
      newRepo: '',
      sendErrorMensagem: '',
      checkError: true,
    });
  } catch(error) {
    let textMessange = '';
    if(error !== 'Repositório duplicado')
      textMessange = 'Repositíro inexistente';
      else textMessange = error;

      this.state({
        checkError: false,
        newRepo: '',
        sendErrorMensagem: textMessange,
      });
  } finally {
    this.setState({loading: false, checkError: false});
  }

};

  render () {

    const { newRepo, repositories, loading, checkError, sendErrorMensagem } = this.state;

    return (
      <Container>
      <h1>
        <AiFillGithub />
          Minha lista de repositórios do Github
      </h1>
      <Error><h1></h1></Error>
      <Form >
        <input
         type="text"
          placeholder="Para adicionar a lista, digite um repositório"
          />
          <SubmitButton>
            <FaPlus color="#fff" size={14} />
          </SubmitButton>
      </Form>
      <List>
        <Link>
          Detalhes
        </Link>
      </List>
      </Container>
    );

  }
}
