import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Layout from "../../Laybout";
import { collection, getFirestore, addDoc } from 'firebase/firestore';
import AddIcon from '@mui/icons-material/Add';
import { db } from "../../firebase-config";
import { useCollection } from 'react-firebase-hooks/firestore';
import { app } from '../../firebase-config'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";


const Form = () => {

  const navigate = useNavigate()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  // State List Here 
  const [ExpenseList, setExpenseList] = useState([])
  const [open, setOpen] = useState(false)
  const [formLoading, setFormLoading] = useState(false)


  const [ExpenseCategoryList] = useCollection(
    collection(getFirestore(app), "expenseCategory",),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    const tempData = [];
    if (ExpenseCategoryList) {
      let index = 1;
      ExpenseCategoryList?.forEach((doc) => {
        const childData = doc.data();
        tempData.push({ ...childData, id: index++ });
      });
      setExpenseList(tempData);
    }
  }, [ExpenseCategoryList]);




  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    setFormLoading(true)
    try {
      await addDoc(collection(db, "expenseCategory"), {
        expenseCategory: values.expenseCategory,
        budgets: values.budgets,
        description: values.description
      });
      navigate('/expense')
      setOpen(false)
      setFormLoading(false)
    } catch (err) {
      console.log(err);
      setFormLoading(false)
    }
  };

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "expenseCategory",
      headerName: "Expanse Category",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "budgets",
      headerName: "Budgets",
      type: "number",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      align: 'left',
      renderCell: () => {
        return (
          <h4>df</h4>
        );
      },
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      align: 'left',
      renderCell: ({ row: { access } }) => {
        return (
        <h4>dfdf</h4>
        );
      },
    },
  ];

  return (
    <Layout>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="CREATE USER" subtitle="Create a New User Profile" />
          <Box>
            <Button
              onClick={ handleOpen}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <AddIcon sx={{ mr: "10px" }} />
              Add Expense Category
            </Button>
          </Box>
        </Box>
        {/* open Table of all Category List */}
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >

          <DataGrid checkboxSelection rows={ExpenseList} columns={columns} components={{ Toolbar: GridToolbar }} />

        </Box>

        {/* Close Table for all category list  */}

        {/* create Category List  Modal */}
        <Dialog open={open} onClose={handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Expense Category</DialogTitle>
          <DialogContent>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
              sx={{ p: 2 }}
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
                  <DialogActions sx={{ mt: 2 }}>
                    <Button onClick={handleClose} color="secondary" variant="outlined">Close</Button>
                    <LoadingButton loading={formLoading} onClick={handleFormSubmit} type="submit" color="secondary" variant="contained">Create New User</LoadingButton>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
        {/* Create Category List Modal Close */}
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
