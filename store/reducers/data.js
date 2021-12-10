import { GET_DATA } from '../actions/data';

const initialState = {
    data: null
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DATA:
            //console.log(new Student(action.profile.local_id,action.profile.full_name,action.profile.index_number,action.profile.imageUri,action.profile.lat,action.profile.lng,action.profile.address));
            let newGroupedData = [];
            let tempK = action.dataA[0].kurs;
            let tempV = action.dataA[0].video;
            let sumData = { kurs: tempK, videos: [{ title: tempV, vrijeme: [{ datum: action.dataA[0].datum, start: action.dataA[0].start }] }] };
           
           // console.log(sumData,'prije');
            if (action.dataA !== null) {
                for (let i = 1; i < action.dataA.length; i++) {


                    if (tempK !== action.dataA[i].kurs) {
                        newGroupedData.push(sumData);
                        tempK = action.dataA[i].kurs;
                        sumData = { kurs: tempK, videos: [] };
                        console.log(sumData,'drugikurs');

                    }

                  
                    if (tempV !== action.dataA[i].video) {
                       // console.log(sumData,'drugivideo');
                        tempV = action.dataA[i].video;
                        
                        sumData.videos.push({ title: tempV, vrijeme: [{ datum: action.dataA[i].datum, start: action.dataA[i].start }] });
                        console.log(sumData,'drugi video');

                    }
                    else {
                        
                        let indexV=sumData.videos.findIndex(el=>el.title===tempV);
                        console.log(indexV);
                        sumData.videos[indexV].vrijeme.push({ datum: action.dataA[i].datum, start: action.dataA[i].start });
                        console.log(sumData,'istosve');

                    }

                }
            }
            newGroupedData.push(sumData);

            console.log('svi podaci', newGroupedData);

            return {
                ...state,
                data: newGroupedData

            };
        default: return state;
    }

};

export default dataReducer;