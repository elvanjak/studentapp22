import { CREATE_OR_UPDATE_PROFILE, GET_PROFILE } from '../actions/profile';


import Student from '../../models/student';

const initialState = {
    profile: null
}

const placeReducer = (state = initialState, action) => {
    switch (action.type) {

        case CREATE_OR_UPDATE_PROFILE:

            return {
                ...state,
                profile: action.profile

            };
        case GET_PROFILE:
            //console.log(new Student(action.profile.local_id,action.profile.full_name,action.profile.index_number,action.profile.imageUri,action.profile.lat,action.profile.lng,action.profile.address));

            return {
                ...state,
                profile: action.profile ? new Student(action.profile.local_id, action.profile.full_name, action.profile.index_number, action.profile.imageUri, action.profile.lat, action.profile.lng, action.profile.address) : null

            };
        default: return state;
    }

};

export default placeReducer;