import { fireEvent,render ,screen} from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/heroes";
import { AppRouter } from "../../../src/router/AppRouter";
import {Navbar} from "../../../src/ui/components/NavBar"

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () =>({ 
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}) );

describe('Pruebas en <Navbar /> ', () => { 
    
    const contextValue = {
        logged:true,
        user:{
            id:"123",
            name:"David"
        },
        logout: jest.fn()
    }

    beforeEach( () =>{ jest.clearAllMocks(); });
    
    test('Debe de mostrar el nombre del usuario ', () => { 
        

        render(
            <>
            <MemoryRouter >
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />

                    
                </AuthContext.Provider>
            </MemoryRouter>
            </>
        );
        expect( screen.getByText(contextValue.user.name) ).toBeTruthy();

     });

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => { 
        

        render(
            <>
            <MemoryRouter >
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
            </>
        );

        const btnLogout = screen.getByLabelText('btnLogout');
        fireEvent.click( btnLogout );  
        
        
        expect(contextValue.logout).toHaveBeenCalled();
        expect( mockedUseNavigate).toHaveBeenCalledWith('/login' , {"replace":true});

     })


 })