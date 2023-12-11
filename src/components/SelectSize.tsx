import { Box, Card, Grid } from "@mui/material";
import { FC } from "react";
import { PizzaSize, usePizzaContext } from "../contexts/NewPizzaContext";

interface SelectSizeProps {}

const SizeCard: FC<{ size: PizzaSize }> = ({ size }) => {
    const { size: selectedSize, setSize } = usePizzaContext();
    return (
        <Grid item xs={4}>
            <Card
                variant="outlined"
                onClick={() => {
                    setSize(size);
                }}
                sx={{
                    backgroundColor: size === selectedSize ? "rgba(25, 118, 210, 0.08)" : "#fff",
                }}
            >
                <h2>{size}</h2>
                <p>
                    {size === "P" && "Personal"}
                    {size === "M" && "Mediana"}
                    {size === "F" && "Familiar"}
                </p>
            </Card>
        </Grid>
    );
};

const SelectSize: FC<SelectSizeProps> = () => {
    return (
        <Box
            sx={{
                padding: 2,
                marginBottom: 2,
                borderRadius: 5,
            }}
        >
            <h3>Escoger tamaño:</h3>
            <Grid container spacing={2}>
                <SizeCard size={PizzaSize.personal} />
                <SizeCard size={PizzaSize.medium} />
                <SizeCard size={PizzaSize.familiar} />
            </Grid>
        </Box>
    );
};

export default SelectSize;
