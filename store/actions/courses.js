import MVideo  from '../../models/video';
import Course from '../../models/course';

export const DELETE_COURSE = 'DELETE_COURSE';
export const JOIN_COURSE = 'JOIN_COURSE';
export const SET_COURSES = 'SET_COURSES';

const toMyArray=(objectArray)=>{
let pomArray=[];
    for(const vkey in objectArray){
pomArray.push(new MVideo(objectArray[vkey].videoId,objectArray[vkey].videoTitle, objectArray[vkey].videoDuration,objectArray[vkey].videoUrl));
    }
return pomArray;
}
export const fetchCourses = () => {

    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        try {
            const response = await fetch('https://student-attention-monitoring.firebaseio.com/courses.json');

            if (!response.ok) {
                console.log('Something went wrong!');
            }

            const resData = await response.json();

          //  console.log(resData);

            const loadedProducts = [];
            for (const key in resData) {

                loadedProducts.push(new Course(key, resData[key].studentIds, resData[key].professor, resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].schedule, toMyArray(resData[key].videos)));
            }
            const yourCourses = loadedProducts.filter(course => {
                const splittedStudentIds = course.studentIds.split('/');

              //  console.log(splittedStudentIds, userId);
                if (splittedStudentIds.findIndex(element => element === userId) !== -1)
                    return true;
            });


            dispatch({
                type: SET_COURSES,
                courses: loadedProducts,
                studentCourses: yourCourses
            });
        } catch (err) {

            //some analitics
            throw err;
        }

    }
}

export const joinCourse = courseId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const available = getState().courses.availableCourses;

        const selectedCourse = available.find(c => c.id === courseId);
        if(selectedCourse.studentIds.trim().length===0) selectedCourse.studentIds=userId;
       else  selectedCourse.studentIds += "/" + userId;
       

        const studentIds = getState().auth.token;
        const response = await fetch('https://student-attention-monitoring.firebaseio.com/courses/' + courseId + '.json?auth=' + token, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    studentIds: selectedCourse.studentIds
                })
        });
        if (!response.ok) { throw new Error('Something went wrong while joining the Course!'); }
        dispatch({
            type: JOIN_COURSE,
            courseData: {
                id: courseId,
                studentIds: selectedCourse.studentIds
            }
        });


    };

};

export const leaveCourse = (courseId) => {
    return async (dispatch, getState) => {
        
      
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const studentsCourse = getState().courses.studentCourses;

        const selectedCourse=studentsCourse.find(course => course.id === courseId);
        //console.log(selectedCourse);

        let studentsIdsArray = selectedCourse.studentIds.split("/");
        const indexofId=studentsIdsArray.findIndex(studentId => studentId === userId);

        studentsIdsArray.splice(indexofId,1);
        let studenstIdsString=studentsIdsArray.join("/");

        

        const response = await fetch(`https://student-attention-monitoring.firebaseio.com/courses/${courseId}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    studentIds: studenstIdsString
                })
        });
        // console.log(await response.ok);
        if (!response.ok) { throw new Error('Something went wrong during leaving!'); }


        dispatch({
            type: DELETE_COURSE,
            id: courseId,
            studentIds: studenstIdsString
        });
    };

};


