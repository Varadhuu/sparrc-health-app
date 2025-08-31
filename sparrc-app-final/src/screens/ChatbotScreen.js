import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Send } from 'lucide-react-native';

const ChatbotScreen = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  return (
    // KeyboardAvoidingView ensures the input moves up with the keyboard
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}
      keyboardVerticalOffset={100} // Adjust this offset as needed
    >
      <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>AI Coach</Text>
        
        {/* Chat history is now in a ScrollView */}
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {messages.map((msg, index) => (
            <View key={index} style={styles.botMessageContainer}>
              <Text style={styles.botMessage}>{msg.message}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input container is now fixed at the bottom */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask about training or recovery..."
            value={input}
            onChangeText={setInput}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.sendButton}>
            <Send color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  chatContainer: {
    flexGrow: 1, // Allows the scroll view to grow
  },
  botMessageContainer: {
    backgroundColor: '#E5E7EB',
    padding: 12,
    borderRadius: 12,
    alignSelf: 'flex-start', // Aligns bot messages to the left
    marginBottom: 10,
    maxWidth: '80%', // Prevents messages from taking the full width
  },
  botMessage: {
    fontSize: 15,
    color: '#1F2937',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#F9FAFB', // Match the screen background
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
