import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import { AiFillGithub } from 'react-icons/ai';

import { FaPlus, FaSpinner, FaRegTrashAlt, FaArrowDown, FaArrowUp, FaInfo } from 'react-icons/fa';

import Container from '../../components/container';

import Error from '../../components/error';

import Info from '../../components/info';

import Norepo from '../../components/norepos';

import { Form, SubmitButton, List, ShowList, HiddenList, Footer } from './style';

import noRepoImg from '../../assents/norepo.svg';

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

//Otimiza o carregamento do app antes de seus componentes serem desmontados
componentWillUnmount() {
  document.removeEventListener('click', this.handleSubmit);
  document.removeEventListener('click', this.handleHidenList);
  document.removeEventListener('click', this.handleShowList);
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
    this.timeError();
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
    this.setState({loading: false, checkError: false });
  }
};

timeError(){
  setTimeout(() => {
    this.setState({sendErrorMensagem : ''});
  },5000);
}

alternativeInputColorRed(){
  const colorBorderInput = document.querySelector('input');

  colorBorderInput.style.borderColor = 'rgba(250,25,0,0.7)';

  setTimeout( () => {
    colorBorderInput.style.borderColor = '#009aaa';
  }, 2000);
}

handleDeleteRepo = (repositories) => {
  this.setState({ repositories: this.state.repositories.filter( repo => repo !== repositories) })
}

handleHidenList() {
  const getList = document.querySelector('.list-repo');
  const hidden  = document.querySelector('.hidden-list');
  const show  = document.querySelector('.show-list');
  const footerLogo = document.querySelector('.github-footer');


  getList.style.display = 'none';
  footerLogo.style.display = 'flex';
  hidden.style.display = 'none';
  show.style.display = 'block';

}

handleShowList() {
  const getList = document.querySelector('.list-repo');
  const hidden  = document.querySelector('.hidden-list');
  const show  = document.querySelector('.show-list');
  const footerLogo = document.querySelector('.github-footer');

  getList.style.display = 'block';
  footerLogo.style.display = 'none';
  hidden.style.display = 'block';
  show.style.display = 'none';
}

  render () {

    const { newRepo, repositories, loading, checkError, sendErrorMensagem } = this.state;

    return (
      <Container>
        <h1>
          <AiFillGithub />
            saveRepo
            <Link  to ={`/info/${decodeURIComponent(Info) } `} >
                   <FaInfo className="link-info" title="info" size={14}/>
             </Link>
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

      { repositories.length ? (<>
        <HiddenList className="hidden-list" title="Ocultar">
            <FaArrowDown  size={18}
            onClick={
              () => this.handleHidenList()
              } />
        </HiddenList>

        <ShowList className="show-list" title="Exibir">
            <FaArrowUp  size={18}
            onClick={ () => this.handleShowList()
            } />
        </ShowList>
        </> ): (<Norepo>
               <img src={noRepoImg} alt="Img no repo" />
              </Norepo>)}


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


    <Footer>
      <div className="github-footer">
      <AiFillGithub  size={38} color="#586969"/>
      <h6>Minha lista</h6>
      </div>
    </Footer>

    </Container>
    );
  }
}
