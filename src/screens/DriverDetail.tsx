import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearDriver, clearError, fetchDriver } from '../redux/slices';
import { RootState } from '../redux/store';

const DriverDetail = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { driverId } = route.params;

  const { driver, loading, error } = useSelector((state: RootState) => state.drivers);

  const handleGoBack = () => {
    if (error) {
      dispatch(clearError());
    } else {
      dispatch(clearDriver());
    }
  
    navigation.goBack();
  }

  useEffect(() => {
    dispatch(fetchDriver(driverId));
  }, [dispatch, driverId]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  
  if (error) return (
    <View style={styles.container}>
      <Text style={styles.error}>{error}</Text>
      <Button title="Go back" onPress={handleGoBack} />
    </View>
  );

  if (!driver) return <Button title="Go back" onPress={handleGoBack} />;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{`${driver.givenName} ${driver.familyName}`}</Text>
      <Text>{`Date of Birth: ${driver.dateOfBirth}`}</Text>
      <Text>{`Nationality: ${driver.nationality}`}</Text>
      <Text>{`URL: ${driver.url}`}</Text>
      <Button title="Go back" onPress={handleGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '50%',
  },
});

export default DriverDetail;