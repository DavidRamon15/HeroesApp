import { useReducer } from "react";
import { authReducer } from "../../../src/heroes/context/authReducer";
import { types } from "../../../src/heroes";


describe('Pruebas de authReducer ', () => { 



    test('Debe de retonar el estado por defecto', () => { 
        const action={
            
        }
        
        const state = authReducer({logged:false },{});
        expect (state).toEqual({logged: false});
        
     });

     test('Debe de llamar el login autenticar y establecer el user', () => { 
      const action={
         type: types.login,
         payload:{
            name:'Juan',
            id:'123'
         }
      }

        const state = authReducer({logged:false },action);
        expect (state).toEqual({logged: true , user:action.payload});       
      })

     test('Debe de borrar el name del usuario y logged en false', () => { 
        
      const state ={
         logged:true,
         user:{ id:'123' , name:'Juan' }
      }
      const action ={
         type:types.logout
      }
      const newState = authReducer(state ,action);

      expect( newState ).toEqual({ logged:false })
        
      })
 })