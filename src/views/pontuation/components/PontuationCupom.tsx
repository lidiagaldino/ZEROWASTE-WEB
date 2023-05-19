import React, { useState, useEffect } from 'react'
import '../styles/pontuation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';

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

	const reedemCupom = async (e) => {
		const reedem = await fetch(`https://zero-waste-logistic.azurewebsites.net/coupon/${e.currentTarget.id}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
			}
		})

		if(reedem.ok){
			openModalCupom()
		} else{
			setNotEnought(true)
		}

	}


	return (
		<div className="containerPontuation">
			<div className="saldo-container">
				<div className="saldo">
					<>
					{notEnought && (	
						 <div className="containerNotEnought">
						 <div className="iconNotEnought">
						   <div className="circleNotEnought">
							 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">--&gt;<path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" /></svg>
						   </div>
						 </div>
						 <div className="infoNotEnought">
						   <h1>Atencao</h1>
						   <span>Voce nao tem pontos suficientes <div className="X"><FontAwesomeIcon icon={faXmark} className="icon-xmark" /></div></span>
						 </div>
					   </div>
					)}
					</>
					<h1>Saldo: <h1 className='SaldoTitle' style={{ paddingRight: 10 }}>{dataCupom}</h1>pontos</h1>
					<span>Ganhe pontos para trocar com recompensas exclusivas com nossos parceiros, acumule pontos fazendo reciclagem ou coletando reciclagem</span>
				</div>
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
									<FontAwesomeIcon icon={faXmark} onClick={openModalCupom} className="" />
										<div className="titleReedem">
											<h1>CUPOM RESGATADO COM SUCESSO</h1>
										</div>
										<div className="descCupom">
											<span>* 20% OFF em todas as compras do supermercado Giga!</span>
										</div>
										<div className="criterios">
											<span>Disponivel apenas em redes Giga</span>
											<span>Disponivel apenas em redes Giga</span>
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