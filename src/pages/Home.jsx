import { useState } from "preact/hooks"

const Home = () => {

    const productos = [
        'IN112008044', // medialuna
        'PTOT09050', // Americano M
        'PTOT09056', // Capuchino L
        'PTOT09058', // Chocolate L
        'IN112008006', // Muffin vainilla
        'IN112008067', // Muffin redvelvet
        'IN112008063'
        ]
    const promociones = {
        desayunoMedialuna : {name:"Desayuno Medialuna",price:2990,items:[['IN112008044'],['PTOT09050']]},
        desayunoMuffin : {name:"Desayuno Muffin",price:2590,items:[['IN112008006','IN112008067'],['PTOT09058','PTOT09056']]}
    }
    const [carrito,setCarrito] = useState([])

    // const carro = [IN112008044,PTOT09050
    const validaPromociones = (carro) => { //recibe una lista
        const posible_pack = []
        const carritofinal = {}
        // entramos en cada promocion
        Object.keys(promociones).forEach((key) => {
            // recorremos cada lista
            promociones[key].items.map( lista =>
                // recorremos sku de la lista y preguntamos si lo tiene incluido
                {for (const sku of lista) {
                    if(carro.includes(sku)) {
                        posible_pack.push(sku) // si lo tiene incluido lo dejamos en el posible pack
                        const index = carro.indexOf(sku) // lo eliminamos del  carrito
                        carro.splice(index, 1)
                    }}
                }
            )
        })
        console.log('posible pack')
        console.log(posible_pack)
        console.log('carro')
        console.log(carro)
        return carro
    }


    const agregarCarrito = (sku) => {
        const newCarrito = [...carrito]
        // validaPromociones()
        newCarrito.push(sku)
        // const menuPrueba = {name:"Desayuno Medialuna",items:['IN112008044','PTOT09050']}
        // if (carrito.length == 3) {newCarrito.push(menuPrueba)} else {newCarrito.push(sku)}
        // newCarrito.push(sku)
        // newCarrito
        validaPromociones(newCarrito)
        setCarrito(newCarrito)
    }


    return (
        <div>
            <div className="carrito">
                {carrito.map(item => {if(typeof item === 'object' && item !== null){
                                        return(
                                        <div>
                                            <h4>{item.name}</h4>
                                            {item.items.map(sku => <p>sku</p>)}
                                        </div>
                                        )
                                    } else {
                                        return(<p>{item}</p>)}}
                )}
            </div>
            <div className="contenedorBotones">
                {productos.map(item => <button className="button" onClick={()=>agregarCarrito(item)}>{item}</button>)}
            </div>
        </div>
    )
}

export default Home