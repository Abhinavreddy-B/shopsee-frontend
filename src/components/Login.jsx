import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Text } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import theme from '../theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  submitWrapper: {
    display: 'flex',
    textAlign: 'center'
  },
  submitbutton: {
    margin: 12,
    color: 'white',
    backgroundColor: theme.colors.quarternary,
    padding: 8,
    borderRadius: 5,
    textAlign: 'center'
  },
  toggleWrapper: {
    borderRadius: 10,
    borderColor: theme.colors.quarternary,
    borderWidth: 2,
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  togglePressable: {
    flex: 1 / 2,
    width: '50%',
    textAlign: 'center',
    paddingVertical: 10
  },
  togglePressableActive: {
    flex: 1 / 2,
    width: '50%',
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: theme.colors.quarternary
  },
  toggleText: {
    textAlign: 'center'
  }
});

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .required('Username is Required'),
  password: yup
    .string()
    .required('password is required')
});

const SignInForm = ({ onSubmit, type, setType }) => {

  return (
    <View>
      <View style={styles.toggleWrapper}>
        <Pressable style={type === 'user' ? styles.togglePressableActive : styles.togglePressable} onPress={() => { setType('user') }}>
          <Text style={styles.toggleText}>User</Text>
        </Pressable>
        <Pressable style={type === 'seller' ? styles.togglePressableActive : styles.togglePressable} onPress={() => { setType('seller') }}>
          <Text style={styles.toggleText}>Seller</Text>
        </Pressable>
      </View>
      <FormikTextInput name='userName' placeholder='username...'></FormikTextInput>
      <FormikTextInput name='password' placeholder='password...'></FormikTextInput>
      <Pressable onPress={onSubmit} style={styles.submitWrapper}>
        <Text style={styles.submitbutton}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const Login = ({ navigation }) => {
  const initialValues = { username: '', password: '' }
  const [signIn] = useSignIn()
  // const navigate = useNavigate()
  const [type, setType] = useState('user')

  const OnSubmit = async (value) => {
    const { userName, password } = value;
    try {
      await signIn({ userName, password }, type);
      navigation.navigate('home')
    } catch (e) {
      console.log(e);
      if (e.status === 401) {
        console.log("Hello")
      } else {
        alert(e)
      }
    }
  }

  const MainPage = ({ navigation }) => {
    return (
      <View>
        <Formik initialValues={initialValues} onSubmit={OnSubmit} validationSchema={validationSchema}>
          {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} type={type} setType={setType} />}
        </Formik>
        <Pressable onPress={() => navigation.navigate('signup')} style={styles.submitWrapper}>
          <Text style={styles.submitbutton}>New user? Sign Up for Free</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='loginMain' component={MainPage}></Stack.Screen>
      <Stack.Screen name='signup' component={SignUp}></Stack.Screen>
    </Stack.Navigator>
  )
};

export default Login;