import React from "react";
import { shallow } from "enzyme";
import NotFoundPage from '../../components/NotFoundPage'

test('test ExpenseDashboardPage setup' , () => {
    const wrapper = shallow(<NotFoundPage />)
    expect(wrapper).toMatchSnapshot()
})