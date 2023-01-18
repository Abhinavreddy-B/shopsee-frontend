import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Text } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import axios from 'axios';
import ServerMethods from '../utils/Communicate';
import theme from '../theme';

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
    }
});

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is Required'),
    price: yup
        .number()
        .integer()
        .min(1)
        .required('Price is Required'),
    image: yup
        .string()
        .required('image is Required'),
    stock: yup
        .number()
        .nullable()
});

const AddItemForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput name='name' placeholder='Product Name'></FormikTextInput>
            <FormikTextInput name='price' placeholder='Price'></FormikTextInput>
            <FormikTextInput name='image' placeholder='Url of the product image'></FormikTextInput>
            <FormikTextInput name='stock' placeholder='How Much Stock do you have?'></FormikTextInput>
            <Pressable onPress={onSubmit} style={styles.submitWrapper}>
                <Text style={styles.submitbutton}>Add</Text>
            </Pressable>
        </View>
    );
};

const AddItem = () => {
    const initialValues = { name: '', price: '', image: '', stock: 0 }
    const navigate = useNavigate()

    const OnSubmit = async (value) => {
        const { name, price, image, stock } = value;
        try {
            const response = ServerMethods.addnewItem({ name, price, image, stock })
            navigate('/')
            alert('Refresh to see changes')
        } catch (e) {
            console.log(e);
            alert(e)
        }
    }

    return (
        <View>
            <Formik initialValues={initialValues} onSubmit={OnSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => <AddItemForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
    )
};

export default AddItem;