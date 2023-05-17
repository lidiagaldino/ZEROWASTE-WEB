import React, { useState, useEffect, Fragment, ChangeEvent, FormEvent } from 'react'
import '../styles/pontuation.css'

const PontuationCupom = () => {
   
    return (
       <div className="containerPontuation">
        <div className="saldo-container">
            <div className="saldo">
                <h1>Saldo: <h1 className='SaldoTitle' style={{paddingRight: 10}}>200</h1>pontos</h1>
                <span>Ganhe pontos para trocar com recompensas exclusivas com nossos parceiros, acumule pontos fazendo  reciclagem ou coletandpo reciclagem</span>
            </div>
        </div>
        <div className="box-cupom">
            <h2 style={{paddingLeft: 30, paddingTop: 20, fontSize: 20}}>Disponiveis:</h2>
            <div className="container-cupom">
                <div className="cumpon-disponivel">
                <ul className="couponList">
 	<li className="couponItem">
    	<div className="couponItem-info">
      		<h1 className="couponItem-title">Cupom de 15% OFF em toda a categoria de Smartphones</h1>
      		<a className="couponItem-link" href="#" title="Cupons de desconto do Submarino">
        		<img src="https://cuponomia-a.akamaihd.net/img/stores/small/submarino.png" alt="Logo do Submarino"/>
        	</a>
			<span className="couponItem-desc"><strong>Regras: </strong>Cupom válido somente para os produtos selecionados, que sejam vendidos e entregues pelo Submarino. Insira o cupom na finalização do pedido para obter o desconto e ganhe mais descontos pagando no boleto ou em 1x no Cartão Submarino.</span>
    	</div>
    	<div className="couponItem-action">
      		<a href="#">Pegar cupom</a>
    	</div>
	</li>
</ul>
                <ul className="couponList">
 	<li className="couponItem">
    	<div className="couponItem-info">
      		<h1 className="couponItem-title">Cupom de 15% OFF em toda a categoria de Smartphones</h1>
      		<a className="couponItem-link" href="#" title="Cupons de desconto do Submarino">
        		<img src="https://cuponomia-a.akamaihd.net/img/stores/small/submarino.png" alt="Logo do Submarino"/>
        	</a>
			<span className="couponItem-desc"><strong>Regras: </strong>Cupom válido somente para os produtos selecionados, que sejam vendidos e entregues pelo Submarino. Insira o cupom na finalização do pedido para obter o desconto e ganhe mais descontos pagando no boleto ou em 1x no Cartão Submarino.</span>
    	</div>
    	<div className="couponItem-action">
      		<a href="#">50 PONTOS</a>
    	</div>
	</li>
</ul>
                </div>
                <h2 style={{paddingLeft: 20, paddingTop: 20, fontSize: 20}}>Resgatados:</h2>
                <div className="cumpon-resgatados">
                <ul className="couponList">
 	<li className="couponItem">
    	<div className="couponItem-info">
      		<h1 className="couponItem-title">Cupom de 15% OFF em toda a categoria de Smartphones</h1>
      		<a className="couponItem-link" href="#" title="Cupons de desconto do Submarino">
        		<img src="https://cuponomia-a.akamaihd.net/img/stores/small/submarino.png" alt="Logo do Submarino"/>
        	</a>
			<span className="couponItem-desc"><strong>Regras: </strong>Cupom válido somente para os produtos selecionados, que sejam vendidos e entregues pelo Submarino. Insira o cupom na finalização do pedido para obter o desconto e ganhe mais descontos pagando no boleto ou em 1x no Cartão Submarino.</span>
    	</div>
    	<div className="couponItem-action">
      		<a href="#">Pegar cupom</a>
    	</div>
	</li>
</ul>
                </div>
            </div>
        </div>
        
       </div>
    )
}
export default PontuationCupom