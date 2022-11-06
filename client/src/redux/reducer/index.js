import { GET_VIDEOGAMES, GET_GENRES, GET_FILTERS, SET_CURRENT_PAGE } from '../actions/actionTypes';
const initialState = {
    videogames: [],
    genres: [],
    filters: {
        genre: 'all',
        order: 'a-z',
        name: '',
        checked: 'both'
    },
    currentPage: 1
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_VIDEOGAMES: {
            return {
                ...state,
                videogames: action.payload
            }
        }
        case GET_GENRES: {
            return {
                ...state,
                genres: action.payload
            }
        }
        case GET_FILTERS: {
            if (!action.payload) {
                return state
            }
            return {
                ...state,
                filters: action.payload
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload
            }
        }

        default: {
            return state
        }
    }
}