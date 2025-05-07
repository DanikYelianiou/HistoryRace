import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrivers, setOffset } from '../redux/slices';
import { RootState } from '../redux/store';

const DriversList = ({ navigation }) => {
  const dispatch = useDispatch();
    
  const { drivers, loading, error, total, limit, offset } = useSelector((state: RootState) => state.drivers);

  const handleNextPage = () => {
    if (offset + limit < total) {
      dispatch(setOffset(offset + limit));
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      dispatch(setOffset(offset - limit));
    }
  };

  useEffect(() => {
    dispatch(fetchDrivers({ limit, offset }));
  }, [dispatch, limit, offset]);

   if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  
   if (error) return <Text style={styles.error}>{error}</Text>;

   return (
     <SafeAreaView style={styles.container}>
       <FlatList
         data={drivers}
         keyExtractor={(item) => item.driverId}
         renderItem={({ item }) => (
           <TouchableOpacity 
           onPress={() => navigation.navigate('DriverDetail', { driverId: item.driverId })}
           >
             <View style={styles.item}>
               <Text style={styles.name}>{`${item.givenName} ${item.familyName}`}</Text>
               <Text>{`Date of Birth: ${item.dateOfBirth}`}</Text>
               <Text>{`Nationality: ${item.nationality}`}</Text>
               <Text style={styles.link}>{item.url}</Text>
             </View>
           </TouchableOpacity>
         )}
       />
       <View style={styles.pagination}>
         <Button title="Previous" onPress={handlePreviousPage} disabled={offset === 0} />
         <Button title="Next" onPress={handleNextPage} disabled={offset + limit >= total} />
       </View>
     </SafeAreaView>
   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
 item:{
   padding :20,
   borderBottomWidth :1,
   borderBottomColor :'#ccc',
   backgroundColor :'#fff',
   marginVertical :5,
   borderRadius :5,
   elevation :2,
 },
 name:{
   fontSize :18,
   fontWeight :'bold',
   marginBottom :5,
 },
 link:{
   color :'blue',
   textDecorationLine :'underline',
   marginTop :5,
 },
 error:{
   color :'red',
   textAlign :'center',
   marginTop :'50%',
 },
 pagination:{
   flexDirection:'row',
   justifyContent:'space-between',
   paddingHorizontal :10,
   paddingTop: 10,
 }
});

export default DriversList;