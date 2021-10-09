export const getTypes = () => async (dispatch) => {
    const response = await fetch("http://localhost:3001/types");
    
    const data = await response.json();
    console.log(data);
    dispatch({
      type: "GET_TYPE",
      payload: data,
    });
  };
  
  export const getType = () => async(dispatch) => {
    const response = await fetch(`http://localhost:3001/types`);
    const types = await response.json();
    dispatch({
      type: "GET_TYPES",
      types
    })
  }
  
  export const getPokemons = () => async (dispatch) => {
    const response = await fetch(`http://localhost:3001/pokemons`);
    const data = await response.json();
    dispatch({
      type: "GET_POKEMONS",
      payload: data,
    });
  };
  
  /*export const getByName = (name) => async (dispatch) => {
    
    const response = await fetch(
      `http://localhost:3001/pokemons?name=${name}`
    );
    
    const data = await response.json();
    dispatch({
      type: "GET_NAME",
      payload: data,
    });
  };*/
  export function getByName(name){
    return async function(dispatch){
       
        let response
        try{
          response = await fetch(`http://localhost:3001/pokemons?name=${name}`);
          const data = await response.json();
          dispatch({type: "GET_NAME", payload: data})
        }catch(err){
          alert("Pokemon no encontrado" )
        }
        
    }
}
  
 
  
  export const type = (type) => (dispatch) => {
    dispatch({
      type: "BY_TYPE",
      payload: type,
    });
  };
  export const filters = (num) => async (dispatch) => {
    const response = await fetch(
      `http://localhost:3001/pokemons?by=${num}`
    );
    const data = await response.json();
    dispatch({
      type: "FILTER",
      payload: data,
    });
  };
  export const order = (order) => (dispatch) => {
    dispatch({
      type: "ORDER",
      payload: order,
    });
  };
  
  export const add = (pokemon) => (dispatch) => {
    dispatch({
      type: "ADD",
      payload: pokemon,
    });
  };