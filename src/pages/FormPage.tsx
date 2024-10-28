import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { saveFormData } from "../store/formSlice";
import { useNavigate } from "react-router-dom";
import StepFieldArray from "../components/StepFieldArray";
import { TextField, Button, MenuItem, Box } from "@mui/material";
import { FormData } from "../types/types";

const schema = z.object( {
    fullName: z.string().nonempty( "Full name is required" ),
    email: z.string().email( "Invalid email address" ),
    issueType: z.string().nonempty( "Please select an issue type" ),
    tags: z.array( z.string() ),
    steps: z.array( z.string().nonempty( "Step is required" ) ),
} );

const FormPage = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>( {
        resolver: zodResolver( schema ),
        defaultValues: { steps: [ "" ] },
    } );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = ( data: FormData ) => {
        console.log( "here here" );
        dispatch( saveFormData( data ) );
        navigate( "/confirmation" );
    };

    return (
        <Box
            component="form"
            onSubmit={ handleSubmit( onSubmit ) }
            sx={ { display: "flex", flexDirection: "column", gap: 2, width: 300, margin: "auto", marginTop: 8 } }
        >
            <TextField label="Full Name" { ...register( "fullName" ) } error={ !!errors.fullName } helperText={ errors.fullName?.message } />
            <TextField label="Email" { ...register( "email" ) } error={ !!errors.email } helperText={ errors.email?.message } />

            <TextField select label="Issue Type" { ...register( "issueType" ) } error={ !!errors.issueType } helperText={ errors.issueType?.message }>
                <MenuItem value="Bug Report">Bug Report</MenuItem>
                <MenuItem value="Feature Request">Feature Request</MenuItem>
                <MenuItem value="General Inquiry">General Inquiry</MenuItem>
            </TextField>

            <StepFieldArray control={ control } errors={ errors } />

            <Button type="submit" variant="contained">Submit</Button>
        </Box>
    );
};

export default FormPage;
