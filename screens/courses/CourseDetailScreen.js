import React, {useState} from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as courseActions from '../../store/actions/courses'; 


const ProductDetailScreen = (props) => {

    const [isJoining, setIsJoining] = useState(false);
    const userId = useSelector(state => state.auth.userId);
    const productId = props.route.params.productId;
    const disabled = props.route.params.disabled;
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
   
    const joinTheCourse = async (id) => {
        console.log('join course');
        setIsJoining(true);
        try {
            await dispatch(courseActions.joinCourse(id));
        }
        catch (err) {
            setError(err.message);
        }
        setIsJoining(false);
    };

    
    const selectedCourse = useSelector(state =>
        state.courses.availableCourses.find(prod => prod.id === productId));

        const allreadyJoined =course=>{

            const disable= course.studentIds.split('/').findIndex(element=>element===userId)!==-1;
          
          return disable;
        }
    

    return <View style={styles.container}>
        <ScrollView>
            <View style={styles.slikaOkvir}>
                <Image style={styles.imageS} source={{ uri: selectedCourse.imageUrl }} />
            </View>
            <View style={styles.dugme}>
            {isJoining ? <ActivityIndicator size='small' color={Colors.accent} /> : <Button title="JOIN" color={Colors.primary} disabled={allreadyJoined(selectedCourse)} onPress={() => joinTheCourse(selectedCourse.id)}/>}
            </View>
            {error ? <Text style={styles.cijena}>Error: {error}</Text> : null}
            <Text style={styles.cijena}>Professor: {selectedCourse.professor}</Text>
            <Text style={styles.cijena}>Schedule: {selectedCourse.schedule}h</Text>
            <Text style={styles.tekst}>
                <Text>{selectedCourse.description}</Text>
            </Text>
        </ScrollView>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    slikaOkvir: {
        width: "100%",
        height: 300,
        padding: 5,
    },
    imageS: {
        width: "100%",
        height: "100%"
    },
    dugme: {
        alignItems: 'center',
        marginVertical: 10

    },
    tekst: {

        justifyContent: 'flex-start',
        fontSize: 14,
        textAlign: 'justify',
        marginVertical: 5,
        paddingHorizontal: 20,
        fontFamily: 'lato-regular'
    },
    cijena: {
        justifyContent: 'flex-start',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
        color: Colors.primary,
        fontFamily: 'lato-regular'
    }
});

//ProductDetailScreen.navigationOptions 
export const screenOptions = navData => {
    const title = navData.route.params.title;
    return {
        headerTitle: title
    };

}
export default ProductDetailScreen;
