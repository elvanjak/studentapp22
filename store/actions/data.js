import Attendance from "../../models/attendance";
import moment from "moment";
export const GET_DATA = 'GET_DATA';

///${courseTitle}/${videoTitle}
//dispatch(actionsData.sendData(idS,fullName,iNumber,props.route.params.title,props.route.params.videoTitle,data));


export const fetchData = () => {

    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const allCourses = getState().courses.availableCourses;
        let loadedData = [];

        // console.log(allCourses);

        try {
            for (const c of allCourses) {
                for (const v of c.videos) {

                    //console.log('test', `https://student-attention-monitoring.firebaseio.com/attendance/${userId}/${c.title}/${v.videoTitle}.json?shallow=true`);

                    let getDays = await fetch(`https://student-attention-monitoring.firebaseio.com/attendance/${userId}/${c.title}/${v.videoTitle}.json?shallow=true`);
                    if (!getDays.ok) {
                        console.log('Something went wrong while getting date attendance!');
                    }

                    let data0 = await getDays.json();

                    // console.log(data0);



                    for (const key in data0) {

                        let response1 = await fetch(`https://student-attention-monitoring.firebaseio.com/attendance/${userId}/${c.title}/${v.videoTitle}/${key}.json?orderBy="$key"&limitToFirst=1`);

                        if (!response1.ok) {
                            console.log('Something went wrong while getting attendance data first one!');
                        }
                        let response2 = await fetch(`https://student-attention-monitoring.firebaseio.com/attendance/${userId}/${c.title}/${v.videoTitle}/${key}.json?orderBy="$key"&limitToLast=1`);
                        if (!response2.ok) {
                            console.log('Something went wrong while getting attendance data last one!');
                        }

                        let data1 = await response1.json();
                        let data2 = await response2.json();

                        // console.log(data1, data2);

                        let prviPristup = null;
                        for (const timestamp in data1) {
                            prviPristup = timestamp;

                        }

                        let posljednjiIzlazak = null;
                        for (const timestamp2 in data2) {
                            posljednjiIzlazak = timestamp2;

                        }

                    let time=new Date(parseInt(prviPristup)).getHours()+":"+new Date(parseInt(prviPristup)).getMinutes()+":"+ new Date(parseInt(prviPristup)).getSeconds()+ " - " + new Date(parseInt(posljednjiIzlazak)).getHours()+":"+new Date(parseInt(posljednjiIzlazak)).getMinutes()+":"+new Date(parseInt(posljednjiIzlazak)).getSeconds();
                        loadedData.push(new Attendance(c.title, v.videoTitle, key,time));



                    }


                    console.log(loadedData);
                }
            }

            dispatch({
                type: GET_DATA,
                dataA: loadedData
            });
        }
        catch (error) {
            console.log(error);
        }




    }
}


export const sendData = async (idS, courseTitle, videoTitle, data, token) => {
    // console.log( token);
    const datumD = new Date(data.timestamp).getDate();
    const datumM = new Date(data.timestamp).getMonth() + 1;
    const datumY = new Date(data.timestamp).getFullYear();

    const datum = datumD + "-" + datumM + "-" + datumY;

    try {


        const okvir = await fetch(`https://student-attention-monitoring.firebaseio.com/attendance/${idS}/${courseTitle}/${videoTitle}/${datum}/${data.timestamp}.json?auth=` + token, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {

                    ...data
                })
        });

        //  const res=await okvir.json();

        //console.log(res);
    }
    catch (error) {
        console.log(error);
    }


};

