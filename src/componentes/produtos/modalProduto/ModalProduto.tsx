import Popup from 'reactjs-popup';

//import 'reactjs-popup/dist/index.css';
import FormProduto from '../formProduto/FormProduto';

function ModalProduto() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className=' '>
                       Adicionar Produto
                    </button>
                }
                modal
                contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom: '2rem'
                }}
            >
                <FormProduto/>
            </Popup>
        </>
    );
}

export default ModalProduto;