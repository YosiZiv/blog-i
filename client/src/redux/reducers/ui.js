import { TEST_REDUX } from '../actions/ui';

const initState = {
    message: null,

}

export function uiReducer(state = initState, action) {
    switch (action.type) {
        case TEST_REDUX:
            return { ...state, message: 'look like redux working awsome' }
        default:
            return state;
    }
}