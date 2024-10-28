import { useSelector } from "react-redux";
import { Box, Typography, List, ListItem, ListItemText, Chip } from "@mui/material";
import { RootState } from "../store/store";
import { FormData } from "../types/types";

const ConfirmationPage = () => {
    const formData = useSelector( ( state: RootState ) => state.form.data ) as FormData | null;

    if ( !formData ) {
        return <Typography>No data submitted</Typography>;
    }

    const renderListItem = ( label: string, value: string ) => (
        <ListItem>
            <ListItemText
                primary={
                    <Typography variant="body1" sx={ { fontWeight: 'bold', display: 'inline' } }>
                        { label }
                    </Typography>
                }
                secondary={ value }
            />
        </ListItem>
    );

    return (
        <Box sx={ { padding: 4 } }>
            <Typography variant="h4" gutterBottom>Form Submitted</Typography>
            <List>
                { renderListItem( "Full Name:", formData.fullName ) }
                { renderListItem( "Email:", formData.email ) }
                { renderListItem( "Issue Type:", formData.issueType ) }
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant="body1" sx={ { fontWeight: 'bold', display: 'inline' } }>
                                Tags:
                            </Typography>
                        }
                    />
                    <Box sx={ { display: 'flex', gap: 1, mt: 1 } }>
                        { formData.tags.map( ( tag, index ) => (
                            <Chip key={ index } label={ tag } variant="outlined" />
                        ) ) }
                    </Box>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant="body1" sx={ { fontWeight: 'bold' } }>
                                Steps to Reproduce:
                            </Typography>
                        }
                    />
                </ListItem>
                <Box component="ol" sx={ { paddingLeft: 4, mt: 1 } }>
                    { formData.steps.map( ( step, index ) => (
                        <ListItem
                            component="li"
                            key={ index }
                            sx={ { display: 'list-item', paddingLeft: 0 } }
                        >
                            { step }
                        </ListItem>
                    ) ) }
                </Box>
            </List>
        </Box>
    );
};

export default ConfirmationPage;
