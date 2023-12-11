import { Button } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import ItemsTable from "../components/ItemsTable";
import { useOrderContext } from "../contexts/OrderContext";
import MobileLayout from "../layouts/MobileLayout";

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
