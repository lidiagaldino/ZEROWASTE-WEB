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
	
	//

	const [notEnought, setNotEnought] = useState(false)
	const [enought, setEnought] = useState(false)
	const [semSaldo, setSemSaldo] = useState(0)

	const reedemCupom = async () => {
		const reedem = await fetch(`https://zero-waste-logistic.azurewebsites.net/coupon/${localStorage.getItem("cupom")}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json', 'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
			}
		})

		if (reedem.ok) {
			openModalCupom()
			setEnought(true)
			
		} else {
			setEnought(false)
			setSemSaldo(1)
			setNotEnought(true)
		}


	}

	//

	const [modal, setModal] = useState(false)
	const [abriu, setAbriu] = useState(false)

	const openModalCupom = () => {
		setModal(!modal);
	};

	if (modal) {
		document.body.classList.add('active-modal')
	} else {
		document.body.classList.remove('active-modal')
	}

	const [uniqueCupom, setUniqueCupom] = useState(0)

	const uniqueCupomCod = async (e) => {
		await fetch(`https://zero-waste-logistic.azurewebsites.net/coupon/uniqu	e/${localStorage.getItem("cupom")}`, {
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
					<span>{localStorage.getItem('tipo') == 'Gerador' ? 'Ganhe pontos para trocar com recompensas exclusivas com nossos parceiros, acumule pontos fazendo reciclagem.' : 
					'Ganhe pontos para trocar com recompensas exclusivas com nossos parceiros, acumule pontos coletando lixos recicláveis.'}</span>
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
									<div className="containerCupomFirst">
									<div className="brand">
											<img src="https://cuponomia-a.akamaihd.net/img/stores/small/submarino.png" alt="Logo do Submarino"/>
										
									</div>
									<div className="infoC">
										<h2>{elemento.nome}</h2>
										<span>{elemento.descricao}</span>
										
									</div>
									<div className="buttonC">
									<button id={elemento.id} key={elemento.id} onClick={(e) => {
													localStorage.setItem('cupom', e.currentTarget.id)
											        



													const swalWithBootstrapButtons = Swal.mixin({
														customClass: {
														  confirmButton: 'btn btn-success',
														  cancelButton: 'btn btn-danger'
														},
														buttonsStyling: false
													  })

													 swalWithBootstrapButtons.fire({
														title: 'Você deseja resgatar o cupom?',
														text: "",
														icon: 'warning',
														showCancelButton: true,
														confirmButtonText: 'Sim!',
														cancelButtonText: 'Não!',
														reverseButtons: true
													  }).then((result) => {
														if (result.isConfirmed) {
															reedemCupom()
															console.log(enought);
															if(enought == false)  {
															 
															}else if(enought)
															{
															
														  swalWithBootstrapButtons.fire(
															'Resgatado!',
															'Aproveite seu cupom',
															'success'
														  )
														  setTimeout(() => {
															 console.log('cu');
															 
														  }, 3000);
														 
														  
														  	
															}
														} else if (
														  /* Read more about handling dismissals below */
														  result.dismiss === Swal.DismissReason.cancel
														) {
														  swalWithBootstrapButtons.fire(
															'Cancelado',
															'O cupom não foi resgatado :)',
															'error'
														  )
														}
													  })
													
													  
													 
													uniqueCupomCod(e)
												}}>{elemento.pontos} PONTOS</button>
  </div>
</div>
											<div className="couponItem-action">
												
											</div>
								</>
							)
						})}

						{modal && (
							<div className="modal-aval ">
								<div className="overlay-aval "></div>
								<div className="containerCupom">									
									<div className="containerCupom2" >
										{/*<FontAwesomeIcon icon={faGift} className="giftCupom" style={{color: "#ffffff",}} />*/}
										<div className="titleReedem">
	
											<h1>RESGATADO COM SUCESSO</h1>
											<FontAwesomeIcon onClick={() => { openModalCupom(); window.location.reload() }} icon={faXmark} className="Xmarkk" style={{ color: "#000", paddingLeft: 20 }} />
										</div>
										
										<div className="descCupom">
											<span>* 20% OFF em todas as compras do supermercado Giga!</span>
										</div>
										<div className="criterios">
											<span>Disponivel apenas em redes Giga</span>
											<span>Apresente o código cupom na compra</span>
										</div>
										<div  onClick={(e) => { 
											setClick(true)
											
										}} style={{ flexDirection: 'column', cursor: 'pointer' }} className="codigo">
											<span>Codigo:</span>
											<h1>{uniqueCupom}</h1>
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
									<div className="containerCupomFirst">
										<div className="brand">
												<img src="https://cuponomia-a.akamaihd.net/img/stores/small/submarino.png" alt="Logo do Submarino"/>
											
										</div>
										<div className="infoC">
											<h2>{elemento.nome}</h2>
											<span>{elemento.descricao}</span>
											
										</div>
										<div className="buttonC">
											<button>{elemento.codigo}</button>
										</div>
										</div>
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