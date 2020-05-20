/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';


// page
import Feedback from '../../../Components/HomeSection/Feedback';

const mockStore = configureStore();

describe('Testing the Steps component', () => {
    const store = mockStore({/* any required initial state */ });
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}><Feedback /></Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('try to render Feedback component', () => {
        expect(wrapper).toBeTruthy();
    });

    it('render the heading in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const heading = wrapper.find('div h2');
        expect(heading.text()).toBe('Give us feedback');
    });

    it('render the sub-heading in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const heading = wrapper.find('div p');
        expect(heading.text()).toBe('Lorem ipsum dolor sit amet consectetur.');
    });

    it('render the caption in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const heading = wrapper.find('div caption');
        expect(heading.text()).toBe('We are happy to get your feedback.');
    });

    it('render the TableContainer in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const TableContainerComponent = findByAttr(wrapper,
            'testid',
            'tableContainerId').hostNodes();
        expect(TableContainerComponent.length).toBe(1);
    });

    it('render the Table in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const TableComponent = findByAttr(wrapper,
            'testid',
            'tableId').hostNodes();
        expect(TableComponent.length).toBe(1);
    });

    it('render the TableHead in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const TableHeadComponent = findByAttr(wrapper,
            'testid',
            'tableHeadId').hostNodes();
        expect(TableHeadComponent.length).toBe(1);
    });

    it('render the TableRow in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const TableComponent = findByAttr(wrapper,
            'testid',
            'tableRowId').hostNodes();
        expect(TableComponent.length).toBe(1);
    });

    it('render the TableCell-1 in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const TableCellComponent = findByAttr(wrapper,
            'testid',
            'tableCellId1').hostNodes();
        expect(TableCellComponent.length).toBe(1);
    });

    it('render the TableCell-2 in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const TableCellComponent = findByAttr(wrapper,
            'testid',
            'tableCellId1').hostNodes();
        expect(TableCellComponent.length).toBe(1);
    });

    it('render the TableBody in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const TableComponent = findByAttr(wrapper,
            'testid',
            'tableBodyId').hostNodes();
        expect(TableComponent.length).toBe(1);
    });

    it('render the TableRow2 in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const TableRowComponent = findByAttr(wrapper,
            'testid',
            'tableRowId2').hostNodes();
        expect(TableRowComponent.length).toBe(4);
    });

    it('render the tableCell(facilities) in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const TableCellComponent = findByAttr(wrapper,
            'testid',
            'tableCellId3').hostNodes();
        expect(TableCellComponent.length).toBe(4);
    });

    it('render the tableCell(facilities-data) in Feadback component', () => {
        expect(wrapper).toBeTruthy();

        const TableCellComponent = findByAttr(wrapper,
            'testid',
            'tableCellId3').hostNodes();
        expect(TableCellComponent.length).toBe(4);
    });
});
