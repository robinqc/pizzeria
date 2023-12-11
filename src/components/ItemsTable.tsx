/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC, useState } from "react";
import { PizzaSize, PizzaType, pizzaSizes } from "../contexts/NewPizzaContext";
import { useOrderContext } from "../contexts/OrderContext";
import AddItemModal from "./AddItemModal";

interface ItemsTableProps {
    items: {
        [key: string]: any;
        size: PizzaSize;
    }[];
}

const ItemsTable: FC<ItemsTableProps> = ({ items }) => {
    const [openItemModal, setOpenItemModal] = useState(false);
    const { addItemQuantity, removeItemQuantity, removeItem } = useOrderContext();
    if (items?.length === 0) {
        return (
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableHead>
                        <TableRow>
                            <Typography>No hay productos en el pedido todavia</Typography>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4} align="right">
                                <Button variant="contained" color="primary" onClick={() => setOpenItemModal(true)}>
                                    Agregar producto
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <AddItemModal open={openItemModal} onClose={() => setOpenItemModal(false)} />
            </TableContainer>
        );
    }
    return (
        <TableContainer component={Paper} variant="outlined">
            <Table>
                <TableHead
                    sx={{
                        "& *": {
                            fontWeight: "bold",
                            textTransform: "uppercase",
                        },
                    }}
                >
                    <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell align="right">#</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => {
                        if (item.category === "pizza")
                            return (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        {item.type === PizzaType.whole ? item.flavor?.name : item.flavor?.name + " + " + item.secondFlavor?.name + " (mitad y mitad)"} [
                                        {pizzaSizes[item.size]}]
                                    </TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">$ {item.price}</TableCell>
                                    <TableCell align="center">
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <IconButton
                                                    color="success"
                                                    size="large"
                                                    onClick={() => {
                                                        addItemQuantity(item.id);
                                                    }}
                                                >
                                                    <AddCircle />
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <IconButton
                                                    color="error"
                                                    size="large"
                                                    onClick={() => {
                                                        if (item.quantity > 1) removeItemQuantity(item.id);
                                                        else removeItem(item.id);
                                                    }}
                                                >
                                                    <RemoveCircle />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            );
                        if (item.category === "pasta")
                            return (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        Pasta {item.name}
                                    </TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">$ {item.price}</TableCell>
                                    <TableCell align="center">
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <IconButton
                                                    color="success"
                                                    size="large"
                                                    onClick={() => {
                                                        addItemQuantity(item.id);
                                                    }}
                                                >
                                                    <AddCircle />
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <IconButton
                                                    color="error"
                                                    size="large"
                                                    onClick={() => {
                                                        if (item.quantity > 1) removeItemQuantity(item.id);
                                                        else removeItem(item.id);
                                                    }}
                                                >
                                                    <RemoveCircle />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            );
                        return null;
                    })}
                    <TableRow>
                        <TableCell colSpan={2} align="right">
                            <b>Total</b>
                        </TableCell>
                        <TableCell align="right">$ {items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} align="right">
                            <Button variant="contained" color="primary" onClick={() => setOpenItemModal(true)}>
                                Agregar producto
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <AddItemModal open={openItemModal} onClose={() => setOpenItemModal(false)} />
        </TableContainer>
    );
};

export default ItemsTable;
