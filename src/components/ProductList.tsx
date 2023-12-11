import { Grid, List, ListItemButton, TextField } from "@mui/material";
import { FC, useState } from "react";
import { usePizzaContext } from "../contexts/NewPizzaContext";

interface ProductListProps {
    items: any[];
    multiple?: boolean;
}

interface ProductListPropsGeneric {
    items: any[];
    multiple?: boolean;
    type: "pizza" | "pasta";
}

const ProductListPizza: FC<ProductListProps> = ({ items, multiple = false }) => {
    const { products, addProduct, setProducts, removeProduct } = usePizzaContext();
    const [search, setSearch] = useState("");

    const filteredItems = search !== "" ? items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : items;

    return (
        <List
            sx={{
                borderRadius: 2,
                border: "1px solid #ccc",
            }}
        >
            <TextField
                label="Buscar"
                sx={{
                    width: "96%",
                    margin: "2%",
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {filteredItems.map((item) => (
                <ListItemButton
                    key={item.id}
                    onClick={() => {
                        if (multiple) {
                            if (products.find((product) => product.id === item.id)) {
                                removeProduct(item);
                            } else if (products.length < 2) {
                                addProduct(item);
                            }
                        } else {
                            setProducts([item]);
                        }
                    }}
                    sx={{
                        borderBottom: "1px solid #ccc",
                    }}
                    selected={products.find((product) => product.id === item.id)}
                >
                    <Grid container>
                        <Grid item xs={8}>
                            <h3>{item.name}</h3>
                        </Grid>
                        <Grid item xs={4}>
                            <h3>${item.price}</h3>
                        </Grid>
                    </Grid>
                </ListItemButton>
            ))}
        </List>
    );
};

const ProductListPasta: FC<ProductListProps> = ({ items }) => {
    const { setPastaItem, pastaItem } = usePizzaContext();
    return (
        <List
            sx={{
                borderRadius: 2,
                border: "1px solid #ccc",
            }}
        >
            {items.map((item) => (
                <ListItemButton
                    key={item.id}
                    onClick={() => {
                        setPastaItem(item);
                    }}
                    sx={{
                        borderBottom: "1px solid #ccc",
                    }}
                    selected={pastaItem?.id === item.id}
                >
                    <Grid container>
                        <Grid item xs={8}>
                            <h3>{item.name}</h3>
                        </Grid>
                        <Grid item xs={4}>
                            <h3>${item.price}</h3>
                        </Grid>
                    </Grid>
                </ListItemButton>
            ))}
        </List>
    );
};

const ProductList: FC<ProductListPropsGeneric> = ({ items, multiple = false, type }) => {
    if (type === "pizza") return <ProductListPizza items={items} multiple={multiple} />;
    return <ProductListPasta items={items} />;
};

export default ProductList;
