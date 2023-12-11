import { createContext, useContext, useEffect, useState } from "react";

interface OrderContextData {
    table: number;
    items: any[];
    addItem: (value: any) => void;
    removeItem: (value: any) => void;
    setItems: (value: any[]) => void;
    reset: () => void;
    total: number;
    setTotal: (value: number) => void;
    addItemQuantity: (value: any) => void;
    removeItemQuantity: (value: any) => void;
}

export const OrderContext = createContext<OrderContextData>({
    table: 0,
    items: [],
    addItem: () => {},
    removeItem: () => {},
    setItems: () => {},
    reset: () => {},
    total: 0,
    setTotal: () => {},
    addItemQuantity: () => {},
    removeItemQuantity: () => {},
});

export const OrderContextProvider = ({ children }: { children: any }) => {
    const [table, setTable] = useState<number>(0);
    const [items, setItems] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        console.log("Items", items);
    }, [items]);

    const addItem = (value: any) => {
        setItems([...items, value]);
    };

    const removeItem = (value: any) => {
        setItems(items.filter((item) => item.id !== value));
    };

    const addItemQuantity = (value: any) => {
        const newItems = [...items];
        const index = newItems.findIndex((item) => item.id === value);
        newItems[index].quantity++;
        setItems(newItems);
    };

    const removeItemQuantity = (value: any) => {
        const newItems = [...items];
        const index = newItems.findIndex((item) => item.id === value);
        newItems[index].quantity--;
        setItems(newItems);
    };

    const reset = () => {
        setItems([]);
        setTable(0);
        setTotal(0);
    };

    return (
        <OrderContext.Provider value={{ table, items, addItem, removeItem, setItems, reset, total, setTotal, addItemQuantity, removeItemQuantity }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => {
    return useContext(OrderContext);
};
