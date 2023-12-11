import { Box, Card, Grid } from "@mui/material";
import { FC } from "react";
import { PizzaType, pizzaTypes, usePizzaContext } from "../contexts/NewPizzaContext";
import ProductList from "./ProductList";
import SelectSize from "./SelectSize";

const pizzaItems = [
    //margarita, salami, vegetariana, prosciutto, napolitana, hawai, funghi, calzone, pepperoni, cosimo de papa, nunzio's,  tocineta/ciruela, putanesca, americana, 4 formaggi, bernalda, fabiola, metaponto, pollo e funghi, tonno e cipolla, dino, caprichosa, matera bianca, mare e terra, bruno, antonio
    {
        id: 1,
        name: "Margarita",
        price: 100,
    },
    {
        id: 2,
        name: "Salami",
        price: 100,
    },
    {
        id: 3,
        name: "Vegetariana",
        price: 100,
    },
    {
        id: 4,
        name: "Prosciutto",
        price: 100,
    },
    {
        id: 5,
        name: "Napolitana",
        price: 100,
    },
    {
        id: 6,
        name: "Hawai",
        price: 100,
    },
    {
        id: 7,
        name: "Funghi",
        price: 100,
    },
    {
        id: 8,
        name: "Calzone",
        price: 100,
    },
    {
        id: 9,
        name: "Pepperoni",
        price: 100,
    },
    {
        id: 10,
        name: "Cosimo de Papa",
        price: 100,
    },
    {
        id: 11,
        name: "Nunzio's",
        price: 100,
    },
    {
        id: 12,
        name: "Tocineta/Ciruela",
        price: 100,
    },
    {
        id: 13,
        name: "Putanesca",
        price: 100,
    },
    {
        id: 14,
        name: "Americana",
        price: 100,
    },
    {
        id: 15,
        name: "4 Formaggi",
        price: 100,
    },
    {
        id: 16,
        name: "Bernalda",
        price: 100,
    },
    {
        id: 17,
        name: "Fabiola",
        price: 100,
    },
    {
        id: 18,
        name: "Metaponto",
        price: 100,
    },
    {
        id: 19,
        name: "Pollo e Funghi",
        price: 100,
    },
    {
        id: 20,
        name: "Tonno e Cipolla",
        price: 100,
    },
    {
        id: 21,
        name: "Dino",
        price: 100,
    },
    {
        id: 22,
        name: "Caprichosa",
        price: 100,
    },
    {
        id: 23,
        name: "Matera Bianca",
        price: 100,
    },
    {
        id: 24,
        name: "Mare e Terra",
        price: 100,
    },
    {
        id: 25,
        name: "Bruno",
        price: 100,
    },
    {
        id: 26,
        name: "Antonio",
        price: 100,
    },
];

interface AddPizzaProps {}

const SelectType: FC = () => {
    const { type: pizzaType, setType } = usePizzaContext();
    return (
        <Box sx={{ paddingBottom: 2 }}>
            <h3>Tipo:</h3>
            <Grid container spacing={2}>
                {pizzaTypes.map((type) => (
                    <Grid item xs={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                backgroundColor: type.value === pizzaType ? "rgba(25, 118, 210, 0.08)" : "#fff",
                            }}
                            onClick={() => {
                                setType(type.value);
                            }}
                        >
                            <h2>{type.label}</h2>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const AddPizza: FC<AddPizzaProps> = () => {
    const { type } = usePizzaContext();
    return (
        <>
            <SelectSize />
            <SelectType />
            <ProductList items={pizzaItems} multiple={type == PizzaType.half} type="pizza" />
        </>
    );
};

export default AddPizza;
