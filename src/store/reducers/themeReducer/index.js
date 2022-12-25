export default function reducer (state = {}, action) {
    switch (action.type) {
        case 'SET_THEME': return { ...state, theme: action.data }
        case 'REMOVE_THEME': return { ...state, theme: null }
        default: return state
    }
}