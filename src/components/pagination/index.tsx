import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '..';

type PaginationComponentProps = {
    previousTitle: string,
    handlePreviousPage: () => void,
    isPreviousDisabled: () => boolean,
    nextTitle: string,
    handleNextPage: () => void,
    isNextDisabled: () => boolean,
}

const PaginationComponent = ({
    previousTitle,
    handlePreviousPage,
    isPreviousDisabled,
    nextTitle,
    handleNextPage,
    isNextDisabled,
}: PaginationComponentProps) => {
    return (
        <View style={styles.pagination}>
            <Button title={previousTitle} onPress={handlePreviousPage} disabled={isPreviousDisabled()} />
            <Button title={nextTitle} onPress={handleNextPage} disabled={isNextDisabled()} />
       </View>
    );
};

const styles = StyleSheet.create({
 pagination:{
   flexDirection:'row',
   justifyContent:'space-between',
   paddingVertical: 10,
 },
});

export default React.memo(PaginationComponent);
