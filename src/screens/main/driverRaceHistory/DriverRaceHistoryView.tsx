import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { DriverRaceHistory } from '../../../redux/slices';
import { Error, Loader, Button, Pagination } from '../../../components';

type DriversListViewProps = {
  driverRaceHistory: DriverRaceHistory[] | null,
  loading: boolean,
  error: string | null,
  handleNextPage: () => void,
  handlePreviousPage: () => void,
  isPreviousDisabled: () => boolean,
  isNextDisabled: () => boolean
  handleGoBack: () => void,
};

const DriverRaceHistoryView = ({
  driverRaceHistory,
  loading,
  error,
  handleNextPage,
  handlePreviousPage,
  isPreviousDisabled,
  isNextDisabled,
  handleGoBack,
}: DriversListViewProps) => {

   if (loading) {return <Loader />;}

   if (error) {return <Error error={error} />;}

   return (
     <SafeAreaView style={styles.container}>
       <FlatList
         data={driverRaceHistory}
         keyExtractor={(item) => item.circuitId}
         ListHeaderComponent={
            <Button title="Go back" onPress={handleGoBack} />
         }
         renderItem={({ item }) => (
            <View style={styles.item}>
               <Text style={styles.name}>{`${item.circuitName}`}</Text>
               <Text>{`Location: ${item.Location.locality}`}</Text>
               <Text>{`country: ${item.Location.country}`}</Text>
               <Text style={styles.link}>{item.url}</Text>
            </View>
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

export default React.memo(DriverRaceHistoryView);
