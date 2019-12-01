import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Info from '../../components/info';

import { Content } from './style';

import { FaArrowLeft, FaArrowDown, FaArrowUp, FaTrashAlt } from 'react-icons/fa';


export default class PageInfo extends Component {


render(){
  return(
<Info>
  <Content>
      <h1>Como usar</h1>

          <p>
            <em>Para adicionar repositórios</em> a sua lista, use na caixa de entrada de texto
            dessa forma: <strong>proprietário do repositório/nome do repositório</strong>,
            exemplo: <em>facebook/react</em> e clique no botão
            <span className="button-text"> + </span> para adicionar.
          </p>

          <p>
            Clique na <em><FaTrashAlt /></em> para excluir de sua lista os repositórios que não queira
            mais.
          </p>

          <p>
            Clique em <em>detalhes</em> para ver mais informações, issues abertas e fechadas.
          </p>

          <p>
            Use <FaArrowDown /> <em>para ocultar a lista</em> e <FaArrowUp/> <em>para exibi lá.</em>
          </p>

        <Link to="/"> <FaArrowLeft size={25}/> </Link>
     </Content>

  </ Info>
  );
  }
}
