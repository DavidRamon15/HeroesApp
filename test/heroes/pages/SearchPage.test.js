import {fireEvent, render,screen} from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom';
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () =>({ 
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}) );


describe('Prueba en <SearchPage />', () => { 

    beforeEach( () =>{ jest.clearAllMocks(); });
    
    test('debe de mostrarse correctamente con valores por defecto', () => { 

    const {container} =  render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )
        expect( container ).toMatchSnapshot();
     });

     test('Debe de mostrar a Batman y el input con el valor del queryString', () => { 
        const {container} =  render(
            <MemoryRouter initialEntries={['/search?q=batman']}> 
                <SearchPage />
            </MemoryRouter>
        )
        const input = screen.getByRole("textbox");
        expect ( input.value ).toBe('batman');

        const img = screen.getByRole("img");
        expect( img.src ).toContain('assets/heroes/dc-batman.jpg');

        const alertPrimary = screen.getByLabelText('alert-primary');
        expect( alertPrimary.style.display ).toBe('none');

      });

      test('Debe de mostrar un error si no si encuentra el Heroe (batman123)', () => { 
        const {container} =  render(
            <MemoryRouter initialEntries={['/search?q=batman123']}> 
                <SearchPage />
            </MemoryRouter>
        )
        
        const alertDanger = screen.getByLabelText('alertDanger');
        expect( alertDanger.style.display ).not.toBe('none');


       })


        test('Debe de llamar al Navigate a la pantalla nueva', () => { 
            const {container} =  render(
                <MemoryRouter initialEntries={['/search?q=']}> 
                    <SearchPage />
                </MemoryRouter>
            )
            const input = screen.getByRole("textbox");
           
            fireEvent.change( input, {target: {name:'searchText', value:'superman' }} );

            const form = screen.getByRole("form");
            fireEvent.submit(form);

            expect(mockedUseNavigate).toHaveBeenCalledWith("?q=superman")
        })
 })