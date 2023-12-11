import { AppBar, Box, Button, Card, CardActionArea, Dialog, DialogActions, DialogContent, Divider, Toolbar } from "@mui/material";
import { FC, useState } from "react";
import { v4 } from "uuid";
import { PizzaType, usePizzaContext } from "../contexts/NewPizzaContext";
import { useOrderContext } from "../contexts/OrderContext";
import AddPizza from "./AddPizza";
import ProductList from "./ProductList";

interface AddItemModalProps {
    open: boolean;
    onClose: () => void;
}

enum ItemCategory {
    Pasta,
    Pizza,
}

const pastaItems = [
    {
        id: 1,
        name: "Carbonara",
        price: 100,
    },
    {
        id: 2,
        name: "Boscaiola",
        price: 100,
    },
    {
        id: 3,
        name: "Putanesca",
        price: 100,
    },
    {
        id: 4,
        name: "Napoli",
        price: 100,
    },
    {
        id: 5,
        name: "Bolognesa",
        price: 100,
    },
    {
        id: 6,
        name: "Papa Cosimo",
        price: 100,
    },
    {
        id: 7,
        name: "Della Casa",
        price: 100,
    },
];

const AddItemModal: FC<AddItemModalProps> = ({ open, onClose }) => {
    const [category, setCategory] = useState<ItemCategory | null>(null);
    const { products, type, size, reset: resetPizza, pastaItem, setPastaItem } = usePizzaContext();
    const { addItem } = useOrderContext();

    const handleAddPizza = () => {
        console.log("Adding pizza");
        const pizza: any = {
            id: v4(),
            size,
            type,
            category: "pizza",
            quantity: 1,
            price: type === PizzaType.whole ? products[0].price : (products[0].price + products[1].price) / 2,
        };
        if (type === PizzaType.whole) {
            pizza["flavor"] = products[0];
        } else {
            pizza["flavor"] = products[0];
            pizza["secondFlavor"] = products[1];
        }
        addItem(pizza);
        onClose();
        setCategory(null);
        resetPizza();
    };

    const handleAddPasta = () => {
        if (pastaItem === null) {
            return;
        }
        addItem({
            ...pastaItem,
            id: v4(),
            category: "pasta",
            quantity: 1,
        });
        onClose();
        setCategory(null);
        setPastaItem(null);
    };

    return (
        <Dialog open={open} fullScreen>
            <AppBar
                position="static"
                sx={{
                    zIndex: 1,
                }}
            >
                <Toolbar>
                    <Button color="inherit" variant="outlined" onClick={onClose}>
                        Cerrar
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                {category === null ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "stretch",
                            justifyItems: "stretch",
                            flexDirection: "column",
                        }}
                    >
                        <Card variant="outlined" sx={{ marginTop: 2, marginBottom: 2 }}>
                            <CardActionArea
                                onClick={() => {
                                    setCategory(ItemCategory.Pasta);
                                }}
                            >
                                <Box sx={{ padding: 2 }}>
                                    <h1>Pastas</h1>
                                </Box>
                            </CardActionArea>
                        </Card>
                        <Card variant="outlined">
                            <CardActionArea
                                onClick={() => {
                                    setCategory(ItemCategory.Pizza);
                                }}
                            >
                                <Box sx={{ padding: 2 }}>
                                    <h1>Pizzas</h1>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                ) : (
                    <Box>
                        <Button variant="contained" onClick={() => setCategory(null)}>
                            Volver
                        </Button>
                        <h1>Agregar {category == ItemCategory.Pasta ? "Pasta" : "Pizza"} </h1>
                        {category == ItemCategory.Pasta && <ProductList items={pastaItems} type="pasta" />}
                        {category == ItemCategory.Pizza && <AddPizza />}
                    </Box>
                )}
            </DialogContent>
            <Divider />
            <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                }}
            >
                {category === ItemCategory.Pizza && (
                    <h3>Total: ${products.reduce((total, product) => (type === PizzaType.whole ? total + product.price : total + product.price / 2), 0)}</h3>
                )}
                {category === ItemCategory.Pasta && <h3>Total: ${pastaItem?.price}</h3>}
                <Button onClick={category === ItemCategory.Pizza ? handleAddPizza : handleAddPasta} variant="contained">
                    Agregar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddItemModal;
