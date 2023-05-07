import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
      <Box>
          {icon}
        </Box>
        <Box>
        <Typography variant="h3" sx={{ color: colors.primary[400] }}>
            {subtitle}
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.primary[400] }}
          >
            {title}
          </Typography>
          
        </Box>
        
      </Box>
    </Box>
  );
};

export default StatBox;
