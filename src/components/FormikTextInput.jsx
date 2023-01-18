import { StyleSheet } from 'react-native';

import {TextInput} from 'react-native';
import { useField } from 'formik';
import {Text} from 'react-native';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: '#d73a4a',
    margin: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  inputerror: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#d73a4a'
  },
});

const FormikTextInput = ({name, ...props}) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        autoCapitalize='none'
        style={meta.error ? styles.inputerror : styles.input}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;