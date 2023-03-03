import { render ,screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/heroes";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('Prueba en <PrivateRoute ></PrivateRoute>', () => { 

    test('Debe de mostrar el children si  esta autenticado ', () => { 

        Storage.prototype.setItem = jest.fn(); 
        const contextValue = {
            logged:true,
            user:{
                id:'abc',
                name:'Juan'
            }
        }
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute >
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta Privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath','/marvel');
     });
 })