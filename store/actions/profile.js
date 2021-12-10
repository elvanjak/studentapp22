import * as FileSystem from 'expo-file-system';
import Student from '../../models/student';
import { createOrUpdateProfile, getProfile } from '../../sqlite/db';
import { student_app } from './auth';
export const CREATE_OR_UPDATE_PROFILE = 'CREATE_OR_UPDATE_PROFILE';
export const GET_PROFILE = 'GET_PROFILE';

export const cUProfile = (fullName, index_number, imageUri, lat, lng, token) => {
    return async (dispatch, getState) => {

        const loacl_id = getState().auth.userId;

        const fileName = imageUri.split('/').pop();
        const Newpath = FileSystem.documentDirectory + fileName;

        console.log(loacl_id);

        try {

            if (imageUri.indexOf(FileSystem.documentDirectory) !== 0) {
                await FileSystem.moveAsync({
                    from: imageUri,
                    to: Newpath

                }).catch(err => console.log(err));
            }



            let dummylat = 15.6;
            let dummylng = 12.3;

            dummylat = lat;
            dummylng = lng;

            const results = await fetch("https://maps.googleapis.com/maps/api/geocode/json?" +
                `latlng=${dummylat},${dummylng}&key=${student_app}`);

            if (!results.ok) {
                throw new Error('Cant get address');
            }

            const address = await results.json();

            if (!address.results) {
                throw new Error('Didnt get address');
            }
            const full_address = address.results[0].formatted_address;
            //console.log(address.results[0].formatted_address);
           // console.log(loacl_id, fullName, index_number, Newpath, full_address, dummylat, dummylng

               // console.log('reyultat sa servera',okvir);
           
            const dbResult = await createOrUpdateProfile(loacl_id, fullName, index_number, Newpath, full_address, dummylat, dummylng, token);
            const okvir = await fetch(`https://student-attention-monitoring.firebaseio.com/attendance/${loacl_id}.json?auth=` + token, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(
                    {  
                            fullName: fullName,
                            index_number: index_number,
                    })
            });
            dispatch({
                type: CREATE_OR_UPDATE_PROFILE,
                profile: new Student(loacl_id, fullName, index_number, Newpath, full_address, dummylat, dummylng)
            });
        }
        catch (err) {
            //  console.log(err);
            throw err;
        }


    }

};

export const gProfile = () => {
    return async (dispatch, getState) => {

        const loacl_id = getState().auth.userId;
        console.log(loacl_id, 'sta je sa local id?');

        try {
            const result = await getProfile(loacl_id);
            // console.log(result.rows.item(0));
            dispatch({
                type: GET_PROFILE,
                profile: result.rows.item(0)
            });

        }
        catch (err) {

            console.log(err);
        }

    }




};




