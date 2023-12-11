import { Button } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import ItemsTable from "../components/ItemsTable";
import { useOrderContext } from "../contexts/OrderContext";
import MobileLayout from "../layouts/MobileLayout";

const pizzaItems = [
    {
        id: 1,
        name: "Pizza de peperoni",
        quantity: 1,
        price: 100,
    },
    {
        id: 2,
        name: "Pizza de peperoni",
        quantity: 1,
        price: 100,
    },
];

interface TableViewProps {}

const TableView: FC<TableViewProps> = () => {
    const { id: table } = useParams();
    const [activeOrder, setActiveOrder] = useState(false);
    const { items } = useOrderContext();
    return (
        <MobileLayout>
            <h1>Mesa {table}</h1>
            {activeOrder ? (
                <ItemsTable items={items} />
            ) : (
                <Button variant="contained" onClick={() => setActiveOrder(true)}>
                    Nuevo pedido
                </Button>
            )}
        </MobileLayout>
    );
};

export default TableView;
