import React, { useState, useEffect } from 'react'
import '../styles/pontuation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faGift } from '@fortawesome/free-solid-svg-icons'
import 'animate.css';
import Swal from 'sweetalert2';
import { Translate } from 'phosphor-react';

const PontuationCupom = () => {

	const [dataCupom, setDataCupom] = useState(0)

	useEffect(() => {
		fetch(`https://zero-waste-logistic.azurewebsites.net/coupon/pontos`, {
			method: 'GET',
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token') }
		}).then(response => response.json()).then(resposta => setDataCupom(resposta.pontos))
	}, [])
	//
	const [cupomInfo, setCupomInfo] = useState([])

	useEffect(() => {
		fetch(`https://zero-waste-logistic.azurewebsites.net/coupon/unreedem`, {
			method: 'GET',
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token') }
		}).then(response => response.json()).then(resposta => setCupomInfo(resposta.map((item) => {
			console.log(resposta);
			return (
				{
					id: item.id,
					nome: item.nome,
					descricao: item.descricao,
					criterios: item.criterios,
					pontos: item.pontos,
					codigo: item.codigo
				}
			)
		})))
	}, [])

	//

	const [alreadyReedem, setAlreadyReedem] = useState([])

	useEffect(() => {
		fetch(`https://zero-waste-logistic.azurewebsites.net/coupon/reedem`, {
			method: 'GET',
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token') }
		}).then(response => response.json()).then(resposta => setAlreadyReedem(resposta.map((item) => {
			console.log(resposta);
			return (
				{
					id: item.id,
					nome: item.nome,
					descricao: item.descricao,
					criterios: item.criterios,
					pontos: item.pontos,
					codigo: item.codigo
				}
			)
		})))
	}, [])

	const [modal, setModal] = useState(false)

	const openModalCupom = () => {
		setModal(!modal);
	};

	if (modal) {
		document.body.classList.add('active-modal')
	} else {
		document.body.classList.remove('active-modal')
	}
	
	//

	const [notEnought, setNotEnought] = useState(false)
	const [enought, setEnought] = useState(false)

	const reedemCupom = async (e) => {
		const reedem = await fetch(`https://zero-waste-logistic.azurewebsites.net/coupon/${e.currentTarget.id}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
			}
		})

		if (reedem.ok) {
			setEnought(true)
			openModalCupom()
		} else {
			setNotEnought(true)
		}

	}

	//

	const [uniqueCupom, setUniqueCupom] = useState(0)

	const uniqueCupomCod = async (e) => {
		await fetch(`https://zero-waste-logistic.azurewebsites.net/coupon/unique/${e.currentTarget.id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
			}
		}).then(res => res.json()).then(resposta => setUniqueCupom(resposta.codigo))
	}

	const [click, setClick] = useState(false)
	const [a, setA]= useState(false)

	//

	useEffect(() => {
		if (notEnought) {
		  const timeout = setTimeout(() => {
			setNotEnought(false)
			setA(true)
		  }, 5000);
	
		  return () => {
			clearTimeout(timeout);
			setA(false)
		  };
		}
	  }, [notEnought]);


	return (
		<div className="containerPontuation">
			<div className="saldo-container">
				<div className="saldo">
					<h1>Saldo: <h1 className='SaldoTitle' style={{ paddingRight: 10 }}>{dataCupom}</h1>pontos</h1>
					<span>Ganhe pontos para trocar com recompensas exclusivas com nossos parceiros, acumule pontos fazendo reciclagem ou coletando reciclagem</span>
				</div>
				<>
					{notEnought && (
							<>
								<div className="notEnought animate__animated animate__fadeInLeft">
									<span>Você não tem pontos suficientes</span>
								</div>
							</>
					)}
				</>
			</div>
			<div className="box-cupom">
				<h2 style={{ paddingLeft: 30, paddingTop: 20, fontSize: 20 }}>Disponiveis:</h2>
				<div className="container-cupom">
					<div className="cumpon-disponivel">
						{cupomInfo.map((elemento) => {
							return (
								<>
									<ul className="couponList">
										<li className="couponItem">
											<div className="couponItem-info">
												<h1 className="couponItem-title">Cupom de 15% OFF em toda a categoria de Smartphones</h1>
												<a className="couponItem-link" href="#" title="Cupons de desconto do Submarino">
													<img src="https://cuponomia-a.akamaihd.net/img/stores/small/submarino.png" alt="Logo do Submarino" />
												</a>
												<span className="couponItem-desc"><strong>Regras: </strong>Cupom válido somente para os produtos selecionados, que sejam vendidos e entregues pelo Submarino. Insira o cupom na finalização do pedido para obter o desconto e ganhe mais descontos pagando no boleto ou em 1x no Cartão Submarino.</span>
											</div>
											<div className="couponItem-action">
												<button id={elemento.id} key={elemento.id} onClick={(e) => {
													reedemCupom(e)
													uniqueCupomCod(e)
												}}>{elemento.pontos} PONTOS</button>
											</div>
										</li>
									</ul>
								</>
							)
						})}

						{modal && (
							<div className="modal-aval ">
								<div className="overlay-aval "></div>
								<div className="containerCupom">									
									<div className="containerCupom2">
										{/*<FontAwesomeIcon icon={faGift} className="giftCupom" style={{color: "#ffffff",}} />*/}
										<div className="titleReedem">
	
											<h1>{click ? 'CUPOM RESGATADO COM SUCESSO' : 'RESGATAR ESTE CUPOM ?'}</h1>
											<FontAwesomeIcon onClick={() => { openModalCupom() }} icon={faXmark} className="Xmarkk" style={{ color: "#000", paddingLeft: 20 }} />
										</div>
										
										<div className="descCupom">
											<span>* 20% OFF em todas as compras do supermercado Giga!</span>
										</div>
										<div className="criterios">
											<span>Disponivel apenas em redes Giga</span>
											<span>Disponivel apenas em redes Giga</span>
										</div>
										<div  onClick={(e) => { 
											setClick(true)
											
										}} style={{ flexDirection: 'column', cursor: 'pointer' }} className="codigo">
											<span>Codigo:</span>
											<h1>{click ? uniqueCupom : 'RESGATAR'}</h1>
										</div>
									</div>

								</div>
							</div>

						)}






					</div>
					<h2 style={{ paddingLeft: 20, paddingTop: 20, fontSize: 20 }}>Resgatados:</h2>
					<div className="cumpon-resgatados">
						{alreadyReedem.map((elemento) => {
							return (
								<>
									<ul className="couponList">
										<li className="couponItem">
											<div className="couponItem-info">
												<h1 className="couponItem-title">{elemento.nome}</h1>
												<a className="couponItem-link" href="#" title="Cupons de desconto do Submarino">
													<img src="https://cuponomia-a.akamaihd.net/img/stores/small/submarino.png" alt="Logo do Submarino" />
												</a>
												<span className="couponItem-desc"><strong>Regras: </strong>{elemento.criterios}</span>
											</div>
											<div className="couponItem-action">
												<button>Resgatado</button>
											</div>
										</li>
									</ul>
								</>
							)
						})}
					</div>
				</div>
			</div>

		</div>
	)
}
export default PontuationCupom