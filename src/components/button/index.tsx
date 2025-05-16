import React from 'react';
import { Button } from 'react-native';
import colors from '../../theme/colors';

type ButtonComponentProps = {
    title: string,
    onPress: () => void,
    disabled?: boolean,
}

const ButtonComponent = ({ disabled, title, onPress }: ButtonComponentProps) => {
    return (
        <Button
            title={title}
            onPress={onPress}
            disabled={disabled || false}
            color={colors.gray}
        />
    );
};

export default React.memo(ButtonComponent);
