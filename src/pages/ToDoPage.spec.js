import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import '@testing-library/dom';

import ToDoPage from "./ToDoPage";

describe('testing todo function',  () => {
   beforeEach(() => {
      render(<ToDoPage/>)

      const inputElement = screen.getByRole('textbox')
      userEvent.type(inputElement, 'new todo{enter}')
   })

   // check if the item was created successfully
   test('create a new todo', async () => {
      const todos = await screen.findByTestId('todo')
      expect(todos).toBeInTheDocument()
   })

   // check checkbox
   test('click the checkbox', async () => {
      const checkbox = await screen.findByTestId('todo-checkbox')
      userEvent.click(checkbox)

      expect(checkbox).toBeChecked()
   })

   // check update item
   test('update todo item', async () => {
      const label = await screen.findByTestId('todo-label')
      userEvent.dblClick(label)

      const input = await screen.findByTestId('todo-input')
      userEvent.type(input, 'updated todo{enter}')

      await waitFor(() => expect(screen.getByText('updated todo').toBeInTheDocument()))
   })
})

