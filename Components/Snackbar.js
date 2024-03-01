import React from 'react';
import { Snackbar } from 'react-native-paper';
import { SafeAreaView, StyleSheet } from 'react-native';

const CustomSnackBar = ({ visible, message, onDismiss }) => {
    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            duration={Snackbar.DURATION_SHORT}
            style={styles.snackbar} // Apply custom styles
            action={{
                label: 'Dismiss',
                onPress: onDismiss, // Dismiss action when the user clicks the dismiss button
            }}
        >
            {message}
        </Snackbar>
    );
};

const styles = StyleSheet.create({
    snackbar: {
        position: 'absolute',
        bottom: 100, // Adjust this value to change the distance from the bottom
        backgroundColor: 'purple', // Custom background color
        borderRadius: 8, // Custom border radius
    },
});

export default CustomSnackBar;