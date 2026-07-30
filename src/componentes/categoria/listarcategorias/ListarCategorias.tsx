import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { get } from "../../../services/Service";
import CardCategoria from "../cardcategoria/CardCategoria";
import CarregandoPixel from "../../loader/CarregandoPixel";

function ListaCategorias() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    try {
      setIsLoading(true);
      await get('/categorias', setCategorias, {
        headers: { 'Authorization': token }
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <CarregandoPixel />}

      <div className="flex justify-center w-full my-4 font-mono">
        <div className="container flex flex-col items-center">
          
          {(!isLoading && categorias.length === 0) && (
            <span className="text-sm font-black text-[#4a3b32]/70 uppercase tracking-wider my-12">
              Nenhuma categoria foi encontrada!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
              <CardCategoria 
                key={categoria.id} 
                categoria={categoria} 
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCategorias;