import { Control, FieldErrors, useFieldArray, useWatch } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { FormData } from "../types/types";
import { useEffect } from "react";

interface StepFieldArrayProps {
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
}

const StepFieldArray = ( { control, errors }: StepFieldArrayProps ) => {
    const { fields, append, remove } = useFieldArray( {
        control,
        name: "steps",
    } );

    // Watch all steps fields to trigger re-renders in real-time when they change
    const stepsValues = useWatch( {
        control,
        name: "steps",
        defaultValue: fields.map( () => "" ), // Set initial value as empty string for each field
    } );

    useEffect( () => {
        if ( fields.length === 0 ) {
            append( "" );
        }
    }, [ fields, append ] );

    // Check if the last step field is empty to disable the "Add Step" button
    const isLastStepFilled = stepsValues[ stepsValues.length - 1 ]?.trim() !== "";

    return (
        <Box>
            { fields.map( ( field, index ) => (
                <Box key={ field.id } sx={ { display: "flex", gap: 1, alignItems: "center" } } mt={ 2 }>
                    <TextField
                        label={ `Step ${ index + 1 }` }
                        { ...control.register( `steps.${ index }` as const ) }
                        error={ !!errors.steps?.[ index ] }
                        helperText={
                            errors.steps?.[ index ]
                                ? errors.steps[ index ]?.message
                                : stepsValues[ index ] === ""
                                    ? "Please fill out this step before adding another step"
                                    : "" // Hide helper text if field is filled
                        }
                        sx={ { width: "80%" } }
                    />
                    { fields.length > 1 && (
                        <Button onClick={ () => remove( index ) } color="error" sx={ { width: "20%" } }>
                            Remove
                        </Button>
                    ) }
                </Box>
            ) ) }
            <Box sx={ { textAlign: "right", mt: 2 } }>
                <Button
                    onClick={ () => append( "" ) }
                    variant="outlined"
                    disabled={ !isLastStepFilled } // Disable if the last step is not filled
                >
                    + Add Step
                </Button>
            </Box>
            {/* General error message for the steps array */ }
            { errors.steps && !Array.isArray( errors.steps ) && (
                <Typography color="error" variant="body2" sx={ { mt: 1 } }>
                    { errors.steps.message }
                </Typography>
            ) }
        </Box>
    );
};

export default StepFieldArray;
