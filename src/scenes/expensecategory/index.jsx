import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Layout from "../../Laybout";
import { collection, doc, getFirestore, setDoc, addDoc } from 'firebase/firestore';
import { db } from "../../firebase-config";
import { useCollection } from 'react-firebase-hooks/firestore';
import {app} from '../../firebase-config'
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate()

  // const [expenseCategory] = useCollection(
  //   collection(getFirestore(app), "expenseCategory"),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try{
      await addDoc(collection(db, "expenseCategory"), {
        expenseCategory: values.expenseCategory,
        budgets: values.budgets,
        description: values.description
      });
      navigate('/')
    }catch(err){
      console.log(err);
    }
    
  };

  return (
    <Layout>
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Expense Category Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.expenseCategory}
                name="expenseCategory"
                error={!!touched.expenseCategory && !!errors.expenseCategory}
                helperText={touched.expenseCategory && errors.expenseCategory}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Budgets $"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.budgets}
                name="budgets"
                error={!!touched.budgets && !!errors.budgets}
                helperText={touched.budgets && errors.budgets}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
              multiline
              rows={3}
                fullWidth
                variant="filled"
                type="text"
                label="Description (Optional)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </Layout>
  );
};

const checkoutSchema = yup.object().shape({
  expenseCategory: yup.string().required("required"),
  budgets: yup.number().required("required"),
  description: yup.string(),
  
});
const initialValues = {
  expenseCategory: "",
  budgets: 0,
  description: "",
  
};

export default Form;
