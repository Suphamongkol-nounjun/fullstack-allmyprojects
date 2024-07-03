import { Alert, AlertTitle, Box, Button, Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close"

const Alertpage = (message) => {
    return ( 
        <div>
        <Box sx={{'& > legend': { mt: 2 }}}>
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
        </Alert>
        </Box>
        </div>

     );
}
 
export default Alertpage;