import React from 'react';
import { ActivityIndicator, ColorValue, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

type LoaderProps = {
    size?: number | 'large' | 'small',
    color?: ColorValue,
}

const Loader = ({ size, color }: LoaderProps) => {
    return (
        <ActivityIndicator style={styles.container} size={size || 'large'} color={color || colors.black} />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default React.memo(Loader);
