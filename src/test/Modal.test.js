import { render, screen } from "@testing-library/react"
import types from "@testing-library/user-event"
import userEvent  from "@testing-library/user-event"
import Modal from "../components/Modal"


const activeModalMock = {
    sprites:{
        front_default: "https://mock.com"
    },
    id: "1",
    name: "pokemon",
    types:[
        {
            type:{
                name: "type"
            }
        }
    ],
    weight: 100,
    height: 20
}

const closeModalMock = jest.fn()

describe("Modal",()=>{
    test("deve renderizar a estrutura",()=>{ 
        render(<Modal activeModal={activeModalMock} closeModal={closeModalMock}/>) 

        screen.logTestingPlaygroundURL()
        const img = screen.getByRole('img', { name: /pokemon/i })
        const id = screen.getByRole('heading', { name: /#1 pokemon/i })
        const type = screen.getByText(/type/i)
        const weight = screen.getByText(/10\.0 kg/i)
        const height = screen.getByText(/2\.0 m/i)
        const botton = screen.getByRole('button', { name: /❌/i })

        expect(img).toBeInTheDocument()
        expect(id).toBeInTheDocument()
        expect(type).toBeInTheDocument()
        expect(weight).toBeInTheDocument()
        expect(height).toBeInTheDocument()
        expect(botton).toBeInTheDocument()
    })

    test("deve fechar modal", async()=>{ 

        const user = userEvent.setup()

        render(<Modal activeModal={activeModalMock} closeModal={closeModalMock}/>) 


        const button = screen.getByRole('button', { name: /❌/i })

        await user.click(button)
        
        expect(closeModalMock).toBeCalledTimes(1)
        expect(closeModalMock).toReturn()
    })


})