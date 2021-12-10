import * as actions from '../actions/courses';

const initialState = {
    availableCourses: [],
    studentCourses: []
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_COURSES: 
        return {
            availableCourses: action.courses,
            studentCourses: action.studentCourses
        };
        case actions.DELETE_COURSE:

            const courseD=state.availableCourses.find(prod=>prod.id===action.id);

            courseD.studentIds=action.studentIds;

            const updatedCoursesD=[...state.availableCourses];
            updatedCoursesD[action.id]=courseD;

            const stCoursList=[...state.studentCourses];

           const indexOfCourse=stCoursList.findIndex(c=>c.id===action.id);

            stCoursList.splice(indexOfCourse,1);


            return {

                ...state,
                availableCourses: updatedCoursesD,
                studentCourses: stCoursList
            };
                case actions.JOIN_COURSE:
                    const course=state.availableCourses.find(prod=>prod.id===action.courseData.id);

                    course.studentIds=action.courseData.studentIds;

                    const updatedCourses=[...state.availableCourses];
                    updatedCourses[action.courseData.id]=course;

                    
                    

                    return {

                        ...state,
                        availableCourses: updatedCourses,
                        studentCourses: state.studentCourses.concat(course),
                    };



        default:
            return state;
    }

};


export default reducer;