import React from "react";
import { shallow } from "enzyme";
import  {AddExpensePage}  from '../../components/AddExpensePage'
import expenses from '../fixtures/expenses'


test('test AddExpensePage ' , () => {
    const onsubmit = jest.fn()
    const history = { push : jest.fn()}
    const wrapper = shallow(<AddExpensePage  addExpense={onsubmit} history={history} />)
    expect(wrapper).toMatchSnapshot()
})


test('test AddExpensePage with ' , () => {
    const onsubmit = jest.fn()
    const history = { push : jest.fn()}
    const wrapper = shallow(<AddExpensePage  addExpense = {onsubmit} history={history} />)
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(history.push).toHaveBeenLastCalledWith('/')
})