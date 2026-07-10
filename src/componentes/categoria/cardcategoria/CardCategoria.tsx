import { Link } from "react-router-dom";

function CardCategoria({ categoria }: any) {
    return (
        <div className='flex flex-col rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 bg-white'>
            <div className='h-32 bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-2xl'>
                {categoria.descricao.substring(0, 3).toUpperCase()}
            </div>
            
            <header className='py-6 px-6 bg-white text-slate-800 font-bold text-lg text-center'>
                {categoria.descricao}
            </header>

            <div className="flex border-t border-slate-100">
                <Link to={`/editarcategoria/${categoria.id}`} 
                    className='w-full text-emerald-600 hover:bg-emerald-50 py-3 text-center font-medium'>
                    Editar
                </Link>
                <div className="w-[1px] bg-slate-100"></div> 
                <Link to={`/deletarcategoria/${categoria.id}`} 
                    className='text-red-500 hover:bg-red-50 w-full py-3 text-center font-medium'>
                    Excluir
                </Link>
            </div>
        </div>
    )
}
export default CardCategoria;