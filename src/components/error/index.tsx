import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';
import { Button } from '..';

type ErrorComponentProps = {
    error: string,
    btnTitle?: string,
    onPress?: () => void,
}

const ErrorComponent = ({ error, btnTitle, onPress }: ErrorComponentProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.error}>{error}</Text>
            {btnTitle && onPress && <Button title={btnTitle} onPress={onPress} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,
    },
    error: {
        color: colors.error,
        textAlign: 'center',
    },
});

export default React.memo(ErrorComponent);
