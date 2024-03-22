import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TrackPlayer, { TrackPlayerEvents, Capability } from 'react-native-track-player';

const Bai3 = () => {
    const [isTrackPlaying, setIsTrackPlaying] = useState(false);

    useEffect(() => {
        setupTrackPlayer();
    }, []);

    const setupTrackPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.Stop,
                Capability.SeekTo,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
            ],
        });

        TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_STATE, ({ state }) => {
            setIsTrackPlaying(state === TrackPlayer.STATE_PLAYING);
        });
    };

    const playTrack = async () => {
        try {
            await TrackPlayer.add({
                id: 'track1',
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                title: 'Song 1',
                artist: 'Artist 1',
            });
            await TrackPlayer.play();
        } catch (error) {
            console.error('Error playing track:', error);
        }
    };

    const pauseTrack = async () => {
        try {
            await TrackPlayer.pause();
        } catch (error) {
            console.error('Error pausing track:', error);
        }
    };

    const skipToNextTrack = async () => {
        try {
            await TrackPlayer.skipToNext();
        } catch (error) {
            console.error('Error skipping to next track:', error);
        }
    };

    const skipToPreviousTrack = async () => {
        try {
            await TrackPlayer.skipToPrevious();
        } catch (error) {
            console.error('Error skipping to previous track:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={playTrack} style={styles.button}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pauseTrack} style={styles.button}>
                <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToNextTrack} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToPreviousTrack} style={styles.button}>
                <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.statusText}>{isTrackPlaying ? 'Playing' : 'Paused'}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    statusText: {
        marginTop: 20,
        fontSize: 18,
    },
});

export default Bai3;
