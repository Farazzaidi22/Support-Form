import { useSelector } from "react-redux";
import { Box, Typography, List, ListItem } from "@mui/material";
import { RootState } from "../store/store";
import { FormData } from "../types/types";

const ConfirmationPage = () => {
    // Specify that formData can be FormData or null
    const formData = useSelector( ( state: RootState ) => state.form.data ) as FormData | null;

    if ( !formData ) {
        return <Typography>No data submitted</Typography>;
    }

    return (
        <Box sx={ { padding: 4 } }>
            <Typography variant="h4" gutterBottom>Form Submitted</Typography>
            <List>
                <ListItem>Full Name: { formData.fullName }</ListItem>
                <ListItem>Email: { formData.email }</ListItem>
                <ListItem>Issue Type: { formData.issueType }</ListItem>
                <ListItem>Tags: { formData.tags.join( ", " ) }</ListItem>
                <ListItem>
                    Steps to Reproduce:
                    <List>
                        { formData.steps.map( ( step, index ) => (
                            <ListItem key={ index }>{ step }</ListItem>
                        ) ) }
                    </List>
                </ListItem>
            </List>
        </Box>
    );
};

export default ConfirmationPage;
