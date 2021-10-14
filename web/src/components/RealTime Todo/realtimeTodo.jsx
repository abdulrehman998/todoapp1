import './realtimeTodo.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@mui/material/Grid';
import { useFormik } from "formik";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { useEffect, useState } from "react"
import { collection, addDoc, onSnapshot, query, serverTimestamp, orderBy, deleteDoc, doc } from "firebase/firestore"
import { db } from '../../firestore'


const todoCol = collection(db, "todo")

const validationSchema = yup.object({
    title: yup
        .string('Enter your Title')
        .required('Empty fields can not be Add'),
});

async function del(id) {
    await deleteDoc(doc(todoCol, id));
}

function RealtimeTodo() {
    const [todo, settodo] = useState([])

    useEffect(() => {

        const q = query(todoCol, orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (snapshot) => {

            let temp = [];
            snapshot.forEach((doc) => {

                let id = doc.id;
                let data = doc.data();

                temp.unshift({
                    id: id,
                    title: data.title,
                    description: data.description
                });
            })
            settodo(temp)
        });

        return () => {
            unsubscribe()
            // console.log("unsub")
        };
    }, []);

    const formik = useFormik({

        initialValues: {
            title: "",
            description: ""
        },
        onSubmit: async (values) => {
            try {
                const docRef = await addDoc(todoCol, {
                    title: values.title,
                    description: values.description,
                    timestamp: serverTimestamp()
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        validationSchema: validationSchema,

    });


    return (

        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        FIRESTORE TODO
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ flexGrow: 1, m: 2, s: 2 }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Todo Application
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            id="standard-password-input"
                            label="Title"
                            variant="standard"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}

                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />

                        <Button fullWidth variant="contained" color="primary" type="submit">Add Todo</Button>
                    </Stack>

                </form>
            </Box>

                <div>
                    {todo.map((eachTodo, i) => {

                        return (<div key={i}>
                            <br />
                            <Grid container spacing={3}>
                                <Grid item xs={1} sm={2} md={2} lg={2}>

                                </Grid>
                                <Grid item xs={2} sm={8} md={8} lg={8}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {eachTodo.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                {eachTodo.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <IconButton aria-label="delete" size="large">
                                                <DeleteIcon fontSize="inherit" onClick={() => { del(eachTodo.id) }} />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>

                                </Grid>
                            </Grid>

                            <br />
                        </div>)
                    })}

                </div>
        </>
    );
}

export default RealtimeTodo;