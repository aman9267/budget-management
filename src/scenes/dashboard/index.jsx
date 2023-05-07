import * as yup from 'yup'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { expenselist } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StatBox from "../../components/StatBox";
import Layout from "../../Laybout";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../firebase-config";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate()

  // State List Here 
  const [open, setOpen] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [record, setRecord] = useState('Expense')


  // const [ExpenseCategoryList] = useCollection(
  //   collection(getFirestore(app), "expenseCategory",),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

  // useEffect(() => {
  //   const tempData = [];
  //   if (ExpenseCategoryList) {
  //     let index = 1;
  //     ExpenseCategoryList?.forEach((doc) => {
  //       const childData = doc.data();
  //       tempData.push({ ...childData, id: index++ });
  //     });
  //     setExpenseList(tempData);
  //   }
  // }, [ExpenseCategoryList]);

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
  return (
    <>
      <Layout>
        <Box m="20px">
          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

            <Box>
              <Button
              onClick={ handleOpen}
                sx={{
                  backgroundColor: 'red',
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}

              >
                <AddIcon sx={{ mr: "10px" }} />
                Add Record
              </Button>
            </Box>
          </Box>

          {/* GRID & CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
            <Box
              gridColumn="span 3"
              backgroundColor={'#016ADA'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius={2}
            >
              <StatBox
                title="$ 100"
                subtitle="Cash"
                progress="0.75"
                increase="+14%"
                icon={
                  <AccountBalanceWalletIcon
                    sx={{ color: colors.primary[400], fontSize: "3rem" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={'#FE1E02'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius={2}
            >
              <StatBox
                title="$ 995"
                subtitle="Credit Card"

                icon={
                  <CreditCardIcon
                    sx={{ color: colors.primary[400], fontSize: "3rem" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={'#48e900'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius={2}
            >
              <StatBox
                title=" $ 3,244"
                subtitle="Bank Account"

                icon={
                  <AccountBalanceIcon
                    sx={{ color: colors.primary[400], fontSize: "3rem" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={'#f97c20'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius={2}
            >
              <StatBox
                title="1,325,134"
                subtitle="Debit Card"
                icon={
                  <CreditScoreIcon
                    sx={{ color: colors.primary[400], fontSize: "3rem" }}
                  />
                }
              />
            </Box>

            {/* ROW 2 */}
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Revenue And Expense On Chart View
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    $5,932.32
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Recent Expense List
                </Typography>
              </Box>
              {expenselist.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.title}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.category}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* ROW 3 */}
            {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
          </Box>

          {/* Open Add Expense Item Modal */}
          <Dialog open={open} onClose={handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Add Record</DialogTitle>
          <Box display='flex' justifyContent='center' gap={1} >
            <Button variant='contained'
            sx={{backgroundColor: '#DB0C05', 
            ':hover': {
              bgcolor: '#7A011B', 
              color: 'white',
            },
            borderRadius: 0,
            boxShadow: 'none'
          }}
          onClick={()=>{setRecord('Expense')}}
            >
              Expense
            </Button>
            <Button variant='contained'
            sx={{backgroundColor: '#1DA700', 
            ':hover': {
              bgcolor: '#046F00', 
              color: 'white',
            },
            borderRadius: 0,
            boxShadow: 'none'
          }}
          onClick={()=>{setRecord('Debits')}}
            >
              Income
            </Button>
          </Box>
          {record === 'Expense' ? 
          <DialogContent 
          // sx={{backgroundColor: 'green'}}
          >
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
                    label="Bank List"
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
                    label="Amount $"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.budgets}
                    name="budgets"
                    error={!!touched.budgets && !!errors.budgets}
                    helperText={touched.budgets && errors.budgets}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="List Of Category"
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
                    type="text"
                    label="Date Time Picker"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.expenseCategory}
                    name="expenseCategory"
                    error={!!touched.expenseCategory && !!errors.expenseCategory}
                    helperText={touched.expenseCategory && errors.expenseCategory}
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
                  <LoadingButton loading={formLoading} 
                  onClick={handleFormSubmit} type="submit" color="secondary" variant="contained">Add Record</LoadingButton>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
          : 
          <>
          </>
          }
          
        </Dialog>


          {/* Close Add Expense Item Modal  */}
        </Box>
      </Layout>
    </>
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

export default Dashboard;








