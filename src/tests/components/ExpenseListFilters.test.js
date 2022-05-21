import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import {filters , altfilters } from '../fixtures/filters'

let setStartDate , setEndDate ,setTextFilter , sortByAmount ,sortByDate ,wrapper

beforeEach( () => {
    setStartDate = jest.fn()
    setEndDate = jest.fn()
    setTextFilter = jest.fn()
    sortByAmount = jest.fn()
    sortByDate = jest.fn()
    wrapper = shallow(
         <ExpenseListFilters
            filters={filters} 
            setStartDate ={setStartDate}
            setEndDate ={setEndDate}
            setTextFilter = {setTextFilter}
            sortByDate = {sortByDate}
            sortByAmount ={sortByAmount}
            /> )
} )

test('should Render ExpenseListFilters ' , () => {
    expect(wrapper).toMatchSnapshot()
})

test('should Render ExpenseListFilters with altFilters ' , () => {
    wrapper.setProps({
        filters : altfilters
    })
    expect(wrapper).toMatchSnapshot()
})
test('should handle Text change' ,() => {
    const value = 'Rent'
    wrapper.find('input').simulate('change' , {
        target : {value}
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('should handle select Date' ,() => {
    const value = 'date'
    wrapper.find('select').simulate('change' , {
        target : {value}
    })
    expect(sortByDate).toHaveBeenCalled()
})

test('should handle select Amount' ,() => {
    const value = 'amount'
    wrapper.find('select').simulate('change' , {
        target : {value}
    })
    expect(sortByAmount).toHaveBeenCalled()
})

test('should handle Date Change ' ,() => {
    wrapper.setProps({
        filters : altfilters
    })
    const startDate = filters.startDate
    const endDate = filters.endDate
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate , endDate })
    expect(setStartDate).toHaveBeenLastCalledWith(filters.startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(filters.endDate)
})

test('should handle onFocusChange' ,() => {
    const calendarFocused = null
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused)
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})