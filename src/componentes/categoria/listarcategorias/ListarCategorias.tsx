import CardCategoria from "../cardcategoria/CardCategoria";

function ListaCategorias() {
    const categorias = [
        { id: 1, descricao: 'Saladas Orgânicas' },
        { id: 2, descricao: 'Sucos Detox' },
        { id: 3, descricao: 'Pratos Veganos' }
    ];

    return (
        <div className="max-w-7xl mx-auto my-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categorias.map((cat) => <CardCategoria key={cat.id} categoria={cat} />)}
            </div>
        </div>
    );
}
export default ListaCategorias;