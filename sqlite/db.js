import * as SQLite from 'expo-sqlite';
import * as Notifications from 'expo-notifications';

const db = SQLite.openDatabase('profile.db');



export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS student (local_id TEXT PRIMARY KEY NOT NULL, full_name TEXT NOT NULL, index_number TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                [],
                () => { resolve(); },
                (_, err) => { reject(err); });
        });
    });
    return promise;
}

export const createOrUpdateProfile = async (local_id, fullName, index_number, imageUri, address, lat, lng,token) => {
    let promise=null;
    const dbResult = await getProfile(local_id);

    console.log(dbResult);
    if(dbResult.rows._array.length===0) { 

    //   await sendToServerExpoToken(token);

     promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO student (local_id,full_Name,index_number,imageUri,address,lat,lng) VALUES (?,?,?,?,?,?,?);',
                [local_id, fullName, index_number, imageUri, address, lat, lng],
                (_, result) => { resolve(result); },
                (_, err) => { reject(err); });
        });
    });

    
}
else {
    promise = new Promise((resolve, reject) => {
       
        
        db.transaction((tx) => {

            tx.executeSql('UPDATE student SET local_id=?, full_Name=?, index_number=?, imageUri=?, address=?, lat=?, lng=? WHERE local_id=?;',
                [local_id, fullName, index_number, imageUri, address, lat, lng,local_id],
                (_, result) => { resolve(result); },
                (_, err) => { reject(err); });
        });
    });

}
    return promise;
}


export const getProfile = (local) => {
    const promise = new Promise((resolve, reject) => {

        db.transaction((tx) => {
            
            tx.executeSql('SELECT * FROM student WHERE local_id = ?;',
                [local],
                (_, result) => { resolve(result); },
                (_, err) => { reject(err); });
        });
    });
    return promise;
}

export const sendToServerExpoToken = async (token) => {


    const response= await Notifications.getExpoPushTokenAsync();

    //async code thunk!
    const sent = await fetch('https://student-attention-monitoring.firebaseio.com/students.json?auth=' + token, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
            {
                ExpoPushToken:response.data

            })
    });
    if (!sent.ok) { throw new Error('Something went wrong while sendind ExpoPushToken!'); }
   // console.log(resData);

};

export const deleteStudent = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
        tx.executeSql('DELETE FROM student WHERE local_id = ?;', 
                 [id], 
                (_, result) => { resolve(result); },
                (_, err) => { reject(err); });
});
    });
    return promise;
}

