import { Link} from 'react-router-dom';

const CharactersByHero =  ({alter_ego , characters}) =>{
/* Esta forma la entiendo mejor pero es mejor la usada
    if(alter_ego === characters) return <></>
    return <p className="">{ characters }</p> 
*/
return( alter_ego === characters)
    ? <></>
    :<p>{ characters }</p>;

}


export const HeroCard = ( {
    id,
    superhero, 
    publisher, 
    alter_ego,
    first_appearance,
    characters
}) => {
    
    const heroImageUrl = `/assets/heroes/${ id }.jpg`;

    const charactersByHero2 = <p className="">{ characters }</p> ;

  return (
    <div className="col  animate__animated animate__fadeIn ">
        <div className="card">
            <div className="row no gutters">
                <div className="col-4">
                    <img src={ heroImageUrl } className="card-img" alt={ superhero }  />
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">{ superhero }</h5>
                        <p className="card-text">{ alter_ego }</p>
                      
                        {
                            /*Primera Forma : Sirve para mostrar el parrafo solo cuando alter_ego es distinto de Character */
                            //alter_ego !==characters && ( charactersByHero2 )
                        
                        }
                        <CharactersByHero  alter_ego={ alter_ego }  characters={ characters }/>

                       <p className="card-text">
                            <span className="text-muted">{ first_appearance }</span>
                       </p>
                       <Link to={`/hero/${ id }`}>
                        Más...
                       </Link>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
