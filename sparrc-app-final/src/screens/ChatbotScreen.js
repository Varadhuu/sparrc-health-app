import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from 'react-native';
import { Send } from 'lucide-react-native';

const ChatbotScreen = ({ conversations = [] }) => {
    const [messages, setMessages] = useState(conversations);
    const [input, setInput] = useState('');
    const flatListRef = useRef();

    const handleSend = () => {
        if (input.trim() === '') return;

        const newUserMessage = {
            id: Date.now(),
            sender: 'user',
            message: input.trim(),
        };

        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        setInput('');
    };

    const renderMessage = ({ item }) => (
        <View
            style={[
                styles.messageBubble,
                item.sender === 'user'
                    ? styles.userMessageContainer
                    : styles.botMessageContainer
            ]}
        >
            <Text style={item.sender === 'user' ? styles.userMessageText : styles.botMessageText}>
                {item.message}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingContainer}
                keyboardVerticalOffset={90}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.screenTitle}>SPARRC AI</Text>
                    
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.chatArea}
                        contentContainerStyle={styles.chatListContainer}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    />
                    
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Ask your AI coach..."
                            value={input}
                            onChangeText={setInput}
                            placeholderTextColor="#9CA3AF"
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                            <Send color="#fff" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// --- MODIFIED: Chat bubble colors have been updated ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    keyboardAvoidingContainer: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#111827',
    },
    chatArea: {
        flex: 1,
    },
    chatListContainer: {
        paddingBottom: 10,
    },
    messageBubble: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 18,
        marginBottom: 10,
        maxWidth: '80%',
    },
    botMessageContainer: {
        backgroundColor: '#4C1D95', // Dark Purple for the AI
        alignSelf: 'flex-start',
    },
    userMessageContainer: {
        backgroundColor: '#EDE9FE', // Light Purple for the User
        alignSelf: 'flex-end',
    },
    botMessageText: {
        fontSize: 15,
        color: '#FFFFFF', // White text on dark purple
    },
    userMessageText: {
        fontSize: 15,
        color: '#1F2937', // Dark text on light purple
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: '#F9FAFB',
    },
    textInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        fontSize: 15,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#6D28D9',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
});

export default ChatbotScreen;

