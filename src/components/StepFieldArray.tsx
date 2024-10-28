import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { FormData } from "../types/types";

interface StepFieldArrayProps {
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
}

const StepFieldArray = ( { control, errors }: StepFieldArrayProps ) => {
    const { fields, append, remove } = useFieldArray<FormData>( {
        control,
        name: "steps",
    } );

    return (
        <Box>
            { fields.map( ( field, index ) => (
                <Box key={ field.id } sx={ { display: "flex", gap: 1, alignItems: "center" } } mt={ 2 }>
                    <TextField
                        label={ `Step ${ index + 1 }` }
                        { ...control.register( `steps.${ index }` as const, { required: "Step is required" } ) }
                        error={ !!errors.steps?.[ index ] }
                        helperText={ errors.steps?.[ index ]?.message }
                    />
                    <Button onClick={ () => remove( index ) } color="error">
                        Remove
                    </Button>
                </Box>
            ) ) }
            <Button onClick={ () => append( "" ) }>Add Step</Button>
        </Box>
    );
};

export default StepFieldArray;
