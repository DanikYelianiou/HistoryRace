import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Driver } from '../../../redux/slices';
import { Error, Loader, Button } from '../../../components';

interface DriverDetailsViewProps {
  loading: boolean;
  error: string | null;
  handleGoBack: () => void;
  driver: Driver | null;
}

const DriverDetailsView = ({
  loading,
  error,
  handleGoBack,
  driver,
}: DriverDetailsViewProps) => {
  if (loading) {return <Loader />;}

  if (error || !driver) {return (
    <Error error={error || 'unknown error'} btnTitle="Go back" onPress={handleGoBack} />
  );}

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
});

export default React.memo(DriverDetailsView);
