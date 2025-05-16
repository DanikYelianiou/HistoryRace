import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Driver } from '../../../redux/slices';
import { handleNavigateToDriverDetailParams } from '.';
import { MAIN_ROUTE } from '../../../routes/routes';
import { Error, Loader, Pagination } from '../../../components';

type DriversListViewProps = {
  drivers: Driver[],
  loading: boolean,
  error: string | null,
  handleNextPage: () => void,
  handlePreviousPage: () => void,
  isPreviousDisabled: () => boolean,
  isNextDisabled: () => boolean
  handleNavigateToDriverDetail: ({name, params}: handleNavigateToDriverDetailParams) => void,
};

const DriversListView = ({
  drivers,
  loading,
  error,
  handleNextPage,
  handlePreviousPage,
  isPreviousDisabled,
  isNextDisabled,
  handleNavigateToDriverDetail,
}: DriversListViewProps) => {

   if (loading) {return <Loader />;}

   if (error) {return <Error error={error} />;}

   return (
     <SafeAreaView style={styles.container}>
       <FlatList
         data={drivers}
         keyExtractor={(item) => item.driverId}
         renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() => handleNavigateToDriverDetail({
                name: MAIN_ROUTE.DRIVER_DETAILS,
                params: { driverId: item.driverId },
              })}
            >
              <View style={styles.item}>
                <Text style={styles.name}>{`${item.givenName} ${item.familyName}`}</Text>
                <Text>{`Date of Birth: ${item.dateOfBirth}`}</Text>
                <Text>{`Nationality: ${item.nationality}`}</Text>
                <Text style={styles.link}>{item.url}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigateToDriverDetail({
                name: MAIN_ROUTE.DRIVER_RACE_HISTORY,
                params: { driverId: item.driverId },
              })}
            >
              <View style={styles.item}>
                <Text style={styles.name}>Check history</Text>
              </View>
            </TouchableOpacity>
           </>
         )}
       />
       <Pagination
        previousTitle={'Previous'}
        handlePreviousPage={handlePreviousPage}
        isPreviousDisabled={isPreviousDisabled}
        nextTitle={'Next'}
        handleNextPage={handleNextPage}
        isNextDisabled={isNextDisabled}
       />
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
});

export default React.memo(DriversListView);
