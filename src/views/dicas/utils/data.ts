import vidro from '../../../assets/vidro.png'
import metal from '../../../assets/metal.png'
import papel from '../../../assets/papel.png'
import plastico from '../../../assets/plastico.png'
import organico from '../../../assets/organico.png'
import eletronico from '../../../assets/eletronico.png'

export const slideData = [
    {
        id: 1,
        image: vidro,
        bg: '#1A864A',
        title: 'VIDRO',
        recycle: 'Jornais, revistas, caixas, embalagens de papelão, papel de fax, sulfite, folha de caderno e envelopes.',
        doNotRecycle: 'NÃO SE RECICLA: papel carbono/metalizado/sanitário/celofone e plastificado, fita crepe, livros, postas suspensas, etiquete adesiva, bituca de cigarro e fotografias'
    },
    {
        id: 2,
        image: metal,
        bg: '#F0BE2A',
        title: 'METAL',
        recycle: 'Latas de alumínio e de metal ( tipo conserva), tampas de garrafa, materiais de aço em geral, clipes e grampo.',
        doNotRecycle: 'NÃO SE RECICLA: esponja de aço.'
    },
    {
        id: 3,
        image: papel,
        bg: '#1FA8DF',
        title: 'PAPEL',
        recycle: 'Jornais, revistas, caixas, embalagens de papelão, papel de fax, sulfite, folha de caderno e envelopes.',
        doNotRecycle: 'NÃO SE RECICLA: papel carbono/metalizado/sanitário/celofone e plastificado, fita crepe, livros, postas suspensas, etiquete adesiva, bituca de cigarro e fotografias'
    },
    {
        id: 4,
        image: plastico,
        bg: '#AE1D0B',
        title: 'PLÁSTICO',
        recycle: 'Garrafas pet, embalagens de plástico e sacos.',
        doNotRecycle: 'NÃO SE RECICLA: cabos de panela, tomadas, adesivos e acrilico.'
    },
    {
        id: 5,
        image: organico,
        bg: '#AE4E00',
        title: 'ORGÂNICO',
        recycle: 'Todos os resíduos que têm origem animal ou vegetal: restos de alimento, folhas, sementes,  ossos, entre outros, que sofrem um processo de decomposição natural, sumindo da natureza em pouco tempo.',
        doNotRecycle: 'NÃO SE RECICLA: Vidros, plásticos, metais e pedras, por exemplo, não são utilizados na compostagem. Carnes também não devem ser utilizadas, uma vez que estão muito relacionadas com a atração de animais.'
    },
    {
        id: 6,
        image: eletronico,
        bg: '#FF6D03',
        title: 'ELETRÔNICO',
        recycle: 'Torradeiras, batedeiras, aspiradores de pó, ventiladores, mixers, secadores de cabelo, ferramentas elétricas, calculadoras, câmeras digitais, rádios, etc. Equipamentos de informática e telefonia: computadores, tablets, notebooks, celulares, impressoras, monitores e outros.',
        doNotRecycle: 'NÃO SE RECICLA: objetos que náo sao aparelhos eletronicos'
    },
]