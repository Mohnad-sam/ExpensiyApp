import React from "react";
import moment from "moment";
import { shallow } from "enzyme";
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'


test('test ExpenseForm with Default values setup ' , () =>{
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('test ExpenseForm setup ' , () =>{
    const wrapper = shallow(<ExpenseForm expense = {expenses[0]}/>)
    expect(wrapper).toMatchSnapshot()
})

test('test ExpenseForm Form on submit', () => {
    const wrapper = shallow(<ExpenseForm  />)
    wrapper.find('form').simulate('submit' , {
        preventDefault : () => {}
    })
    expect(wrapper.state('error').length).toBeGreaterThan(0)
})

test('test ExpenseForm changeText', () => {
    const value = 'New description'
    const wrapper = shallow(<ExpenseForm  />)
    wrapper.find('input').at(0).simulate('change' , {
        target : { value }
    })
    expect(wrapper.state('description')).toBe(value)
})


test('test ExpenseForm changeNote', () => {
    const value = 'New note'
    const wrapper = shallow(<ExpenseForm  />)
    wrapper.find('textarea').simulate('change' , {
        target : { value }
    })
    expect(wrapper.state('note')).toBe(value)
})

test('test ExpenseForm changeAmount', () => {
    const value = '12.22'
    const wrapper = shallow(<ExpenseForm  />)
    wrapper.find('input').at(1).simulate('change' , {
        target : { value }
    })
    expect(wrapper.state('amount')).toBe(value)
})

test('test ExpenseForm changeAmount', () => {
    const value = '12.222'
    const wrapper = shallow(<ExpenseForm  />)
    wrapper.find('input').at(1).simulate('change' , {
        target : { value }
    })
    expect(wrapper.state('amount')).toBe('')
})

test(' test call onSubmit Prop for valid form submission' , () => {
    const onSubmitSpy = jest.fn()
    const wrapper = shallow ( <ExpenseForm expense = {expenses[0]} onSubmit = {onSubmitSpy} />)
    wrapper.find('form').simulate('submit' , {
        preventDefault : () => {}
    })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenCalledWith({
        description:expenses[0].description,
        note: expenses[0].note,
        amount:expenses[0].amount,
        createdAt: expenses[0].createdAt
    })
})

test('SingleDatePicker onDateChange call' , () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('SingleDatePicker onFocusChange call' , () => {
    const focused = true ; 
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused})
    expect(wrapper.state('calendarFocused')).toBe(focused)
})