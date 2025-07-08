import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  View,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

export default function Login() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Login</Text>

          <Image source={require('../assets/favicon.png')} style={styles.logo} />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
          />

          <Text style={styles.or}>OR</Text>

          <View style={styles.buttonContainer}>
            <Button title="Continue with Google" onPress={() => {console.log("Button pressed")}} color="#4285F4" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    width: '80%',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  or: {
    marginVertical: 10,
    fontSize: 16,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
