import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import '@testing-library/dom';

import ToDoPage from "./ToDoPage";

describe('testing todo function', () => {
   beforeEach(async () => {
      render(<ToDoPage/>)

      const inputElement = screen.getByRole('textbox')
      userEvent.type(inputElement, 'new todo{enter}')
   })

   // check if the item was created successfully
   test('create a new todo',  async () => {
      const todos = await screen.findByTestId('todo')
      expect(todos).toBeInTheDocument()
   })

   // when click checkbox the label will be crossed out
   test('click the checkbox', async () => {
      const checkbox = await screen.findByTestId('todo-checkbox')
      userEvent.click(checkbox)

      expect(checkbox).toBeChecked()
   })
})

