import {render , screen} from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../src/heroes'
import { PublicRoute } from '../../src/router/PublicRoute'

describe('Pruebas en <PublicRoute />', () => { 

    test('Debe de mostrar el children si no esta autenticado ', () => { 
        const contextValue = {
            logged:false
        }
        
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute >
                    <h1>Ruta Publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta Publica') ).toBeTruthy();
     });

     test('debe de navegar el Navigate si  esta autenticado ', () => { 
        const contextValue = {
            logged:true,
            name:{
                name:'strider',
                id:'ABC123'
            }
        }
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' 
                            element={
                                <PublicRoute >
                                    <h1>Ruta Publica</h1>
                                </PublicRoute>
                            }>
                        </Route>
                        <Route path='marvel' element={<h1>Página Marvel</h1>} ></Route>
                    </Routes>
                    
                </MemoryRouter>
            </AuthContext.Provider>
        );


        expect( screen.getByText('Página Marvel') ).toBeTruthy();
      })

 });
