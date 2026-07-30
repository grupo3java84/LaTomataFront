import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Categoria from '../../../models/Categoria';
import { get, deletar } from '../../../services/Service'; 
import { ClipLoader } from 'react-spinners';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function DeletarCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    descricao: ''
  } as Categoria);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await get(`/categorias/${id}`, setCategoria, {
        headers: {
          Authorization: token
        }
      });
    } catch (error: any) {
      if (error.toString().includes('401') || error.response?.status === 401) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarCategoria() {
    try {
      setIsLoading(true);

      await deletar(`/categorias/${id}`, {
        headers: { 'Authorization': token }
      });

      ToastAlerta('Categoria excluída com sucesso!', 'sucesso');
      retornar();
    } catch (error: any) {
      ToastAlerta('Erro ao deletar a Categoria.', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/categorias");
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto my-12 px-4 font-mono text-[#4a3b32]">
      <div className="w-full max-w-sm rounded-none shadow-[6px_6px_0px_#2b5c40] border-4 border-[#2b5c40] overflow-hidden bg-white">

        <div className="bg-[#b33939] py-4 px-8 text-white font-black text-sm uppercase tracking-widest text-center border-b-4 border-[#2b5c40]">
          Excluir Categoria
        </div>

        <div className="p-8 flex flex-col items-center gap-4 bg-[#fffdf9]">
          <p className="text-[#4a3b32]/80 text-center text-xs font-bold uppercase tracking-wider">
            Você tem certeza que deseja excluir esta categoria?
          </p>

          <h2 className="text-xl font-black text-[#2b5c40] text-center py-2">
            {categoria.descricao || 'Carregando...'}
          </h2>
        </div>

        <div className="flex border-t-4 border-[#2b5c40] bg-[#fffdf9]">
          <button
            className="w-full py-4 text-[#4a3b32] hover:bg-[#f4ebe1] font-black text-xs uppercase tracking-widest transition-all border-r-4 border-[#2b5c40]"
            onClick={retornar}
            disabled={isLoading}
          >
            Não
          </button>
          <button
            className="w-full py-4 text-white bg-[#b33939] hover:bg-[#9c2e2e] font-black text-xs uppercase tracking-widest transition-all flex justify-center items-center"
            onClick={deletarCategoria}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              'Sim, excluir'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;