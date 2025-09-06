import React, { useEffect, useRef } from 'react';
import { Text, Animated, StatusBar, StyleSheet, Easing, View } from 'react-native';
import { Heart } from 'lucide-react-native';

// This component animates the letters of a word individually
const StaggeredText = ({ text }) => {
    // Split the input text into an array of letters
    const letters = text.split('');
    // Create an array of animated values, one for each letter
    const animatedValues = useRef(letters.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        // Use Animated.stagger to run animations in sequence with a delay
        Animated.stagger(
            120, // 120ms delay between each letter's animation
            animatedValues.map(anim =>
                Animated.timing(anim, {
                    toValue: 1, // Animate to a value of 1
                    duration: 400,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                })
            )
        ).start();
    }, []);

    return (
        <View style={styles.staggeredContainer}>
            {letters.map((letter, index) => {
                // Apply a transform to each letter based on its animated value
                const letterStyle = {
                    opacity: animatedValues[index],
                    transform: [
                        {
                            translateY: animatedValues[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [20, 0], // Move up by 20 pixels as it fades in
                            }),
                        },
                    ],
                };
                return (
                    <Animated.Text key={index} style={[styles.splashTitle, letterStyle]}>
                        {letter}
                    </Animated.Text>
                );
            })}
        </View>
    );
};

const SplashScreen = ({ onAnimationFinish }) => {
    // Animated value for the bouncing icon
    const bounceAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Create a continuous bouncing animation loop for the heart
        const bounceLoop = Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.bounce,
                    useNativeDriver: true,
                }),
                Animated.delay(200),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
            ])
        );
        bounceLoop.start();

        // Let the splash screen run for a set time
        const timer = setTimeout(() => {
            onAnimationFinish();
        }, 1800); // Reduced splash time for faster loading

        // Clean up the animation and timer
        return () => {
            bounceLoop.stop();
            clearTimeout(timer);
        };
    }, [onAnimationFinish, bounceAnim]);

    // Interpolate the animation value for the up-and-down motion
    const bounceTranslateY = bounceAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20], // How far the icon drops
    });

    return (
        <View style={styles.splashContainer}>
            <StatusBar barStyle="light-content" />

            {/* Bouncing Heart Icon */}
            <Animated.View style={{ transform: [{ translateY: bounceTranslateY }] }}>
                <View style={styles.iconCircle}>
                    <Heart color="#4C1D95" size={40} fill="#fff" />
                </View>
            </Animated.View>

            {/* Staggered Text */}
            <StaggeredText text="SPARRC" />

            {/* Subtitle */}
            <Text style={styles.splashSubtitle}>Sports & Fitness Medicine Clinic</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4C1D95',
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, // Space between heart and text
    },
    staggeredContainer: {
        flexDirection: 'row',
    },
    splashTitle: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
    },
    splashSubtitle: {
        fontSize: 18,
        color: '#D8B4FE',
        textAlign: 'center',
        position: 'absolute',
        bottom: 100,
    },
});

export default SplashScreen;

