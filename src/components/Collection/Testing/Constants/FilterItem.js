import { filterPanel } from '../Mocks/config.json';

const { clearFilterText, filters } = filterPanel;
const [{
    id,
    group,
    icon,
    items,
}] = filters;

export const DEFAULT_PROPS = {
    id,
    icon,
    items,
    clearFilterText,

    key: id,
    results: 0, // filtered cards count
    name: group,
    isOpened: false,
    numItemsSelected: 0,

    onCheck: jest.fn(),
    onClick: jest.fn(),
    onClearAll: jest.fn(),
};

export const selectedAllItems = {
    numItemsSelected: DEFAULT_PROPS.items.length,
    items: DEFAULT_PROPS.items.map((item) => ({ ...item, selected: true })),
};
